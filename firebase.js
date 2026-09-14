import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAr2fJEJnYAoIXULPW5QxiBvN4TCrmCgzs",
    authDomain: "zweizweiwishlist.firebaseapp.com",
    projectId: "zweizweiwishlist",
    storageBucket: "zweizweiwishlist.firebasestorage.app",
    messagingSenderId: "1055780897992",
    appId: "1:1055780897992:web:5f3a87d4ab3533dfa851fd",
    measurementId: "G-2B31PLZ5JZ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
