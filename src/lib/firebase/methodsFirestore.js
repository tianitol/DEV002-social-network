// Import the functions you need from the SDKs you need
import {
  app,
  getFirestore, collection, Timestamp, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove
} from "../../init.js";

// con db obtenenemos la data base en firestore desde nuestra appa
const db = getFirestore(app);

//export const postsRef = async (id) => await getDocs(collection(db, 'posts', id)) 

//Obtener data de un determinado post(para obtener el id del post y usarlo en la eliminación y actualización)
export const obtenerPost = async (id) => await getDoc(doc(db, 'posts', id));
export const obtenerUsuario = async (id) => await getDoc(doc(db, 'users', id));

export const getUsuarios = (callback) => {
  const qs = query(collection(db, 'users'));
  onSnapshot(qs, (callback))
}
//---------------Generando nuevos post de forma dinámica----------------

//utilizando método addDoc de firestore con onSnapshot(actualización en tiempo real)

export const savePosts = async (descripcion, idUsuarioLogueado, nombreUsuario) => await addDoc(collection(db, 'posts'), { descripcion, date: Timestamp.fromDate(new Date()), idUsuarioLogueado, nombreUsuario, likes: [] }); /*se guarda la info con la hora de firebase */
export const saveUsers = async (usuario, idUsuario, emailUsuario) => await addDoc(collection(db, 'users'), { usuario, idUsuario, emailUsuario });

export const getPost = (callback) => {
  const qs = query(collection(db, 'posts'), orderBy('date', 'desc'));
  onSnapshot(qs, (callback))
}

// mostrar tiempo  del post 
// const date = new Date().toLocaleDateString('es-es', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})

//-----------------------------Eliminando post---------------------------



// mostrar tiempo  del post 
// const date = new Date().toLocaleDateString('es-es', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})

//-----------------------------Eliminando post---------------------------
export const deletePost = async (id) => await deleteDoc(doc(db, 'posts', id));



//------------------------------Editando post-----------------------------
//export const udpDatePost = async (id) => await updateDoc(doc(db, 'post', id))
export const updatePost = async (id, newFile) => await updateDoc(doc(db, 'posts', id), newFile)

/* newFile debe ser el objeto que tengo que actualizar:
{ descripcion, date: Timestamp.fromDate(new Date())}
*/



//------------------Agregando interacciones, me gusta <3 --------------------
// La idea es generar un array con los UserID para que sólo pueda haber uno por usuario
// (click en boton <3 sea un push con if(UserID no se encuentre en el array) else(si UserID está presente) se borre del array)



// export const Likear = (id, like, uid) => updateDoc(doc(db, 'posts', id), {
//   likes: like,
//   likesUser: arrayUnion(uid)
// })

// export const DisLikear = (id, like, uid) => updateDoc(doc(db, 'posts', id), {
//   likes: like,
//   likesUser: arrayRemove(uid)
// })

export const toggleLike = async ({ post_id, uid, newFile }) => {
 // console.log('toggle', newFile.likes, uid, newFile.likes.includes(uid));
  let likes = [];
  if (newFile.likes.includes(uid)) {
    likes = newFile.likes.filter(like => like != uid)
   // console.log('encontró');
  }
  else {
    likes = [...newFile.likes, uid] //(desestructuración de array) Uno el array de likes con el nuevo like que está entrando
    //console.log('no encontró');

  }

  await updateDoc(doc(db, 'posts', post_id), {
    likes
  })
  //console.log('like', post_id, uid, likes)
}










//Add a new document in collection "posts"
// export const crearPost = await setDoc(doc(db, "posts", "LA"), {
//   autor: "Jhoa",
//   descripcion: "Insertando 1º post",
//   fecha: "22/01/2023",
//   titulo: "3º post"
// });









