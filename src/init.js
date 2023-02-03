import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, getDocs, Timestamp, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

import config from "./lib/firebase/config.js";


 const app = initializeApp(config);
 const auth = getAuth();

 export {initializeApp, app, auth,
     getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, 
     getFirestore, collection, getDocs, Timestamp, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, getDoc, updateDoc};
