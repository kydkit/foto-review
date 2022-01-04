import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHLQWvpRjgj78Apl2YFc8W1FlxeUDZvC0",
  authDomain: "foto-review-13e79.firebaseapp.com",
  projectId: "foto-review-13e79",
  storageBucket: "foto-review-13e79.appspot.com",
  messagingSenderId: "132068279147",
  appId: "1:132068279147:web:89202fcd6061966aa8822e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get firebase auth instance
const auth = getAuth();

//get firebase firestore instance
const db = getFirestore(app);

//get storage
const storage = getStorage(app);

export { app as default, auth, db, storage };
