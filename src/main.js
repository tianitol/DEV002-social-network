// Import the functions of Firestore for posting
import { auth } from './init.js';
import { onNavigate } from "./js/routes.js";
import { logini, register, loginWithGoogle, verificarSendingMail, logOut } from "./lib/firebase/methodsAuth.js";
import { saveUsers } from "./lib/firebase/methodsFirestore.js";
 



function validarCorreo(correo) {
  const expReg = /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const valido = expReg.test(correo);
  console.log(valido);
  if (valido === true) {
    console.log('valido');
    return true;
  } if (valido === false) {
    console.log('invalido');
    return false;
  }
}

// SIGN UP
const signupForm = document.getElementById('formularioSU');
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // para cancelar el evento de reinicio del formulario
    console.log(signupForm.value);
    let signupEmail = '';

    const valorCorreo = document.getElementById('idCorreoSU').value;
    const posibleCorreo = validarCorreo(valorCorreo);
    if (posibleCorreo === true) {
      signupEmail = valorCorreo;
    } else {
      signupEmail = '';
    }
    const signupPassword = document.getElementById('idContraseñaSU').value;

    //----obteniendo los datos del usuario ya registrado-----dentro del SIGN UP---

    const usuarioRegistrado = document.getElementById('idUsername').value;
    //saveUsers(usuarioRegistrado).then().catch(error => console.log('fallo la promesa para agregar usuario', error));

    // función de Firebase para registrar un usuario
    try {
      const resultado = await register(auth, valorCorreo, signupPassword);
      verificarSendingMail(auth)

      saveUsers(usuarioRegistrado, auth.currentUser.uid, auth.currentUser.email).then().catch(error => console.log('fallo la promesa para agregar usuario', error));
      // alert('su correo ya ha sido verificado, inicie sesión');
      signupForm.reset();
      signupForm.querySelector('.message-error-email').innerHTML = '';
      signupForm.querySelector('.message-error-password').innerHTML = '';

    }
    catch ({ code, message }) {
      console.log(message);
      // personalizando los mensajes de los 2 errores mas comunes
      if (code === 'auth/email-already-in-use') {
        signupForm.querySelector('.message-error-email').innerHTML = 'El Email ya se encuentra registrado'
      } else if (code === 'auth/weak-password') {
        signupForm.querySelector('.message-error-password').innerHTML = 'La Contraseña debe tener al menos 6 carácteres'
      } else {
        signupForm.querySelector('.message-error').innerHTML = message; // mensajes por defecto de los otros posibles errores
      }
    }
    console.log('signUp');

  });
};


// SIGN IN

// const signinForm = document.getElementById('formularioSI');
// if (signinForm) {
//   //console.log('prueba', signinForm);
//   signinForm.addEventListener('submit', async (e) => {
//     console.log('click');
//     e.preventDefault();
//     const emailInput = document.getElementById('idCorreoSI').value;
//     const passwordInput = document.getElementById('idContraseñaSI').value;
//     try {
//       const { emailVerified, email } = await login(auth, emailInput, passwordInput)
//       console.log(emailVerified,email);
//       /* permitir acceder a la página a solo los usuarios que hayan verificado su cuenta a través del correo electrónico enviado */
//       if (emailVerified) {
//         onNavigate('/feed');
//         console.log('Bienvenid@', email);
//       } else {

//         /*  auth.signOut();*/
//         console.log('Por favor realiza la verificación de tu cuenta');
//       }
//       // console.log(emailVerified) /* verificando el observador */


//       signinForm.reset();
//       signinForm.querySelector('.message-error-email-login').innerHTML = '';
//       signinForm.querySelector('.message-error-password-login').innerHTML = '';


//     } catch ({ code, message }) {
//       // console.log('error', error.message, error.code, error.response)

//       if (code === 'auth/user-not-found') {
//         signinForm.querySelector('.message-error-email-login').innerHTML = 'El Usuario no se encuentra registrado';
//       } else if (code === 'auth/wrong-password') {
//         signinForm.querySelector('.message-error-password-login').innerHTML = 'La Contraseña no corresponde al usuario';
//         // } else {
//         //  signinForm.querySelector('.message-error').innerHTML = message; //mensajes por defecto de los otros posibles errores
//         // }
//       }

//       console.log('signIn');
//     };
//   });
// };




// GOOGLE LOGIN
// const googleButton = document.getElementById('entrarGoogle')
// if (googleButton) {
//   googleButton.addEventListener('click', async (e) => {
//     e.preventDefault();
//     try {
//       const { emailVerified, email } = await loginWithGoogle(auth);
//       signinForm.reset();
//       if (emailVerified) {
//         onNavigate('/feed');
//         console.log('Bienvenid@', email);
//       } else {

//         /*  auth.signOut();*/
//         console.log('Por favor realiza la verificación de tu cuenta');
//       }
//     }

//     catch (error) {

//     };
//   });

// };