import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDS_PyAfh-e-n98mtyZDVnOmWVaAJxXmuQ",
    authDomain: "to-do-list-a1331.firebaseapp.com",
    projectId: "to-do-list-a1331",
    storageBucket: "to-do-list-a1331.firebasestorage.app", 
    messagingSenderId: "867038842763",
    appId: "1:867038842763:web:b9434fad6da4e2311ee98e",
    measurementId: "G-54CQ52RVM3"
};

// intialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(app);

export default FIREBASE_DB;