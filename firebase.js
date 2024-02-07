import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {loginstate} from "./common.js";
const firebaseConfig = {
    apiKey: "AIzaSyDh_BxjN6RSG7BcxV2cP6jUclmtz1eBdOM",
    authDomain: "tz24-ae060.firebaseapp.com",
    projectId: "tz24-ae060",
    storageBucket: "tz24-ae060.appspot.com",
    messagingSenderId: "798031507321",
    appId: "1:798031507321:web:f109ea1fe92af5393909a8",
    measurementId: "G-2XPXYHETML"
};

const app = initializeApp(firebaseConfig);


export function create(email, password) {
    
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            const db = getFirestore(app);
            window.location.href = "/files/login.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
}


export function login(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            loginstate();
            
            window.location.href = "/index.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
}