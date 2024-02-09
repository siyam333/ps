import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc ,getDoc,doc,getFirestore} from "firebase/firestore";


export let globalVariables = {
    gname: null,
    gphone_number: null,
    gevent_1: false,
    gevent_2: false,
    gevent_3: false,
    gevent_4: false,
}



const firebaseConfig = {
    // apiKey: "AIzaSyDh_BxjN6RSG7BcxV2cP6jUclmtz1eBdOM",
    // authDomain: "tz24-ae060.firebaseapp.com",
    // projectId: "tz24-ae060",
    // storageBucket: "tz24-ae060.appspot.com",
    // messagingSenderId: "798031507321",
    // appId: "1:798031507321:web:f109ea1fe92af5393909a8",
    // measurementId: "G-2XPXYHETML"

    apiKey: "AIzaSyDjx5V4OSuM-BFwAO-5Jm4OTDJMbd3H77w",
    authDomain: "sampledatahtml.firebaseapp.com",
    databaseURL: "https://sampledatahtml-default-rtdb.firebaseio.com",
    projectId: "sampledatahtml",
    storageBucket: "sampledatahtml.appspot.com",
    messagingSenderId: "519586347262",
    appId: "1:519586347262:web:f11ad907be184108dbcdaf",
    measurementId: "G-V7GY69RVMZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export function create(email, password, name, phone_number) {
    createUserWithEmailAndPassword(auth, email, password, name, phone_number)
        .then(async (userCredential) => {
            // Signed up 
            const user = userCredential.user;
            try {
                const userId = user.uid.replace(/\//g, "_");
                console.log(userId)
                const docRef = await setDoc(doc(collection(db, "user"), userId), {
                    name: name,
                    phone_number: phone_number,
                    event_1: false,
                    event_2: false,
                    event_3: false,
                    event_4: false,
                });
                console.log("Document written");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            window.location.href = "/files/login.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)

        });
}


export function login(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const userId = user.uid.replace(/\//g, "_");

            const docRef = doc(db, "user", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                // console.log(docSnap.data().name);
                // console.log(docSnap.data().phone_number);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

            //window.location.href = "/index.html";

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
}