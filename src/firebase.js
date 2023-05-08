import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOLJ1aJCSM6hdXMAJ6TOlkA_V160D-FxQ",
  authDomain: "admin-panel-9783e.firebaseapp.com",
  projectId: "admin-panel-9783e",
  storageBucket: "admin-panel-9783e.appspot.com",
  messagingSenderId: "51049093183",
  appId: "1:51049093183:web:afff3c7d286b6e0bf2c08a",
  measurementId: "G-9ZJN36J313",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
