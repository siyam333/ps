// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh_BxjN6RSG7BcxV2cP6jUclmtz1eBdOM",
  authDomain: "tz24-ae060.firebaseapp.com",
  projectId: "tz24-ae060",
  storageBucket: "tz24-ae060.appspot.com",
  messagingSenderId: "798031507321",
  appId: "1:798031507321:web:f109ea1fe92af5393909a8",
  measurementId: "G-2XPXYHETML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=firebase.auth()
const database=firebase.database()
