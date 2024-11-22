import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// paste your firebase config here

// intialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const FIREBASE_DB = getFirestore(app);

export default FIREBASE_DB;
