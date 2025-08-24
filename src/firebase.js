import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase configuration
  apiKey: "AIzaSyAm-mAFWjSnvz559_zIwUTvricmV9jppKU",
  authDomain: "altime-38dbd.firebaseapp.com",
  projectId: "altime-38dbd",
  storageBucket: "altime-38dbd.firebasestorage.app",
  messagingSenderId: "475500459457",
  appId: "1:475500459457:web:5cdb95db0bfa5eca08eb40"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
