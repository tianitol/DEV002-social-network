import {onAuthStateChanged,firebaseAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const actualUsuario = {};
const obtenerUsuarioActual = () => {
  onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
          actualUsuario.email = user.email;
          actualUsuario.uid = user.uid;
          actualUsuario.displayName = user.displayName;
          
          actualUsuario.username = user.username;
      }
  })
}
export {obtenerUsuarioActual}