// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

const firebaseConfig = {
    apiKey: 'AIzaSyAQKOcN9jLUCxn2zXz-mkJKV-BaeFjcKvo',
    authDomain: 'redsocialnvj-47db7.firebaseapp.com',
    projectId: 'redsocialnvj-47db7',
    storageBucket: 'redsocialnvj-47db7.appspot.com',
    messagingSenderId: '161909447570',
    appId: '1:161909447570:web:b126b68b577520ab947f4b',
  };

export const app = initializeApp(firebaseConfig);


<<<<<<< HEAD
import { getFirestore, collection, getDocs, addDoc, query, orderBy, onSnapshot   } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
=======
import { getFirestore, collection, getDocs, addDoc , query ,orderBy, onSnapshot, deleteDoc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// import { async } from "regenerator-runtime";
>>>>>>> 7f46d6d6f55df20cc774d66e818c15db9e815bd5

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// Obtener la data desde el firestore
export const postsRef = async (id) => await getDocs(collection(db, 'posts', id)) 

//console.log('postsRef',postsRef()); 


//---------------Generando nuevos post de forma dinámica----------------

//utilizando método addDoc de firestore con onSnapshot(actualización en tiempo real)

export const savePosts = async (descripcion) => await addDoc(collection(db, 'posts'), {descripcion}) 
  

 export const getPost = (callback) => { 
  const qs = query(collection(db, 'posts'), orderBy( 'descripcion', 'asc'));
  onSnapshot (qs,(callback))
}

 // mostrar tiempo  del post 
// const date = new Date().toLocaleDateString('es-es', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})

//-----------------------------Eliminando post---------------------------

 export const getPost = (callback) => { 
  const qs = query(collection(db, 'posts'), orderBy( 'descripcion', 'asc'));
  onSnapshot (qs,(callback))
}

 // mostrar tiempo  del post 
// const date = new Date().toLocaleDateString('es-es', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})

//-----------------------------Eliminando post---------------------------
 export const detelePost = async (id) => await deleteDoc(doc (db , 'post', id))



//------------------------------Editando post-----------------------------
// export const udpDatePost = async (id) => await updateDoc(doc(db, 'post', id))


//------------------Agregando interacciones, me gusta <3 --------------------
// La idea es generar un array con los UserID para que sólo pueda haber uno por usuario 
// (click en boton <3 sea un push con if(UserID no se encuentre en el array) else(si UserID está presente) se borre del array)
















//Add a new document in collection "posts"
// export const crearPost = await setDoc(doc(db, "posts", "LA"), {
//   autor: "Jhoa",
//   descripcion: "Insertando 1º post",
//   fecha: "22/01/2023",
//   titulo: "3º post"
// });


