const express = require('express');
const exp = express();
const cors = require('cors');

const { initializeApp } = require('firebase/app');
const { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { collection, setDoc, getDoc, doc, getFirestore } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDh_BxjN6RSG7BcxV2cP6jUclmtz1eBdOM",
    authDomain: "tz24-ae060.firebaseapp.com",
    projectId: "tz24-ae060",
    storageBucket: "tz24-ae060.appspot.com",
    messagingSenderId: "798031507321",
    appId: "1:798031507321:web:f109ea1fe92af5393909a8",
    measurementId: "G-2XPXYHETML"


    
};


exp.use(express.json());
exp.use(cors());

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
exp.get('/', (req, res) => {
    res.send('Hello World');
});
exp.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userId = user.uid.replace(/\//g, "_");
        const docRef = doc(db, "user", userId);
        const docSnap = await getDoc(docRef);
        let state, name, phone_number, event_1, event_2, event_3, event_4;
        if (docSnap.exists()) {
            
            state=true
            name=docSnap.data().name;
            phone_number=docSnap.data().phone_number;
            event_1=docSnap.data().event_1;
            event_2=docSnap.data().event_2;
            event_3=docSnap.data().event_3;
            event_4=docSnap.data().event_4;
        } else {
            console.log("No such document!");
        }
        // Authentication successful, send response with user data or token
        res.status(200).json({ user ,state,name,phone_number,event_1,event_2,event_3,event_4});
    } catch (error) {
        // Authentication failed, send error message
        console.error('Authentication failed:', error.message);
        res.status(401).send(error.message);
    }
});

exp.post('/api/signup', async (req, res) => {
    const { email, password, name, ph_no } = req.body;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password, name, ph_no);
        const user = userCredential.user;
        const db = getFirestore(app);
        try {
            const userId = user.uid.replace(/\//g, "_");
            console.log(userId)
            await setDoc(doc(collection(db, "user"), userId), {
                name: name,
                phone_number: ph_no,
                event_1: false,
                event_2: false,
                event_3: false,
                event_4: false,
            });
            console.log("Document written");
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        // Authentication successful, send response with user data or token
        res.status(200).json({ user });
    } catch (error) {
        // Authentication failed, send error message
        console.error('signup failed:', error.message);
        res.status(401).send(error.message);
    }
});

exp.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});