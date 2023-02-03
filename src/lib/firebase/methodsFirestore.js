// Import the functions you need from the SDKs you need
import { app, 
  getFirestore, collection, getDocs, Timestamp, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, getDoc, updateDoc,
 } from "../../init.js";

// con db obtenenemos la data base en firestore desde nuestra appa
const db = getFirestore(app);

//export const postsRef = async (id) => await getDocs(collection(db, 'posts', id)) 

//Obtener data de un determinado post(para obtener el id del post y usarlo en la eliminación y actualización)
export const obtenerPost = async (id) => await getDoc(doc(db, 'posts', id));

//---------------Generando nuevos post de forma dinámica----------------

//utilizando método addDoc de firestore con onSnapshot(actualización en tiempo real)

export const savePosts = async (descripcion) => await addDoc(collection(db, 'posts'), { descripcion, date: Timestamp.fromDate(new Date())}); /*se guarda la info con la hora de firebase */ 
export const saveUsers = async (usuario) => await addDoc(collection(db, 'users'), { usuario, uid, displayName });

export const getPost = (callback) => {
  const qs = query(collection(db, 'posts'), orderBy('date', 'desc'));
  onSnapshot(qs, (callback))
}


//para actualizar el perfil del usuario
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Profile updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});


// mostrar tiempo  del post 
// const date = new Date().toLocaleDateString('es-es', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})

//-----------------------------Eliminando post---------------------------



// mostrar tiempo  del post 
// const date = new Date().toLocaleDateString('es-es', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})

//-----------------------------Eliminando post---------------------------
export const deletePost = async (id) => await deleteDoc(doc(db, 'posts', id)); 



//------------------------------Editando post-----------------------------
 //export const udpDatePost = async (id) => await updateDoc(doc(db, 'post', id))
 export const updatePost = async (id, newFile ) => await updateDoc(doc(db, 'posts', id), newFile)

/* newFile debe ser el objeto que tengo que actualizar:
{ descripcion, date: Timestamp.fromDate(new Date())}
*/



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


