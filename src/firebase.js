import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase configuration
  apiKey: "AIzaSyAAZOkhagszyOyTjeg847A3l1WFfF5NZHI",
  authDomain: "altime-38dbd.firebaseapp.com",
  projectId: "altime-38dbd",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "475500459457",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
