import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification,signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, getDocs, Timestamp, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

import config from "./lib/firebase/config.js";


 const app = initializeApp(config);
 const auth = getAuth();
 //console.log('auth', auth);

 export {initializeApp, app, auth,
     getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signOut,
     getFirestore, collection, getDocs, Timestamp, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove};