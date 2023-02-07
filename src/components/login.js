import { onNavigate } from '../js/routes.js'
import { auth } from "../init.js";

import { logini, loginWithGoogle } from "../lib/firebase/methodsAuth.js";

export const login = () => {

    const signinSection = document.createElement('section');
    signinSection.className = 'sectionSignup-in'
    const titulo = document.createElement('h2');
    titulo.textContent = "Dad's Power";
    titulo.className = 'tituloh2register-login';
    signinSection.appendChild(titulo);

    const formSI = document.createElement('form');
    formSI.className = 'form';
    formSI.method = 'post';
    formSI.id = 'formularioSI';

    const divUser = document.createElement('div');
    divUser.className = 'contenedorForm'
    signinSection.appendChild(divUser);
    divUser.appendChild(formSI);


    const inputEmail = document.createElement('input');
    const labelEmail = document.createElement('label');
    labelEmail.textContent = 'E-mail';
    labelEmail.className = 'labelEmailLogin';

    formSI.appendChild(labelEmail);
    inputEmail.type = 'e-mail';
    inputEmail.className = 'email';
    inputEmail.id = 'idCorreoSI';
    inputEmail.placeholder = 'example@gmail.com'
    inputEmail.required = 'true';
    formSI.appendChild(inputEmail);

    //considerar agregar una diferencia en el parrafo que se imprima el mensaje de error segun sea para mail o pass
    const errorSigninEmail = document.createElement('p');
    errorSigninEmail.className = 'message-error-email-login'; //aquí debe estar la diferencia en la className, distinto para email y pass
    // errorSigninEmail.textContent = 'Aquí va error para email';
    formSI.appendChild(errorSigninEmail);

    const inputPasword = document.createElement('input');
    const labelPassword = document.createElement('label');
    labelPassword.textContent = 'Password';
    labelPassword.className = 'labelPasswordLogin';
    formSI.appendChild(labelPassword);
    inputPasword.type = 'password';
    inputPasword.textContent = 'password';
    inputPasword.className = 'password';
    inputPasword.id = 'idContraseñaSI';
    inputPasword.placeholder = '******'
    inputPasword.required = 'true';
    formSI.appendChild(inputPasword);

    //considerar agregar una diferencia en el parrafo que se imprima el mensaje de error segun sea para mail o pass
    const errorSigninPassword = document.createElement('p');
    errorSigninPassword.className = 'message-error-password-login'; //aquí debe estar la diferencia en la className, distinto para email y pass
    // errorSigninPassword.textContent = 'Aquí va error para password';
    formSI.appendChild(errorSigninPassword);

    const buttonSI = document.createElement('button');
    buttonSI.type = 'submit';
    buttonSI.textContent = 'submit'
    buttonSI.className = 'btnSubmit';
    buttonSI.id = 'btnEnviarSI';
    formSI.appendChild(buttonSI);
    buttonSI.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    
    if (formSI) {
      //console.log('prueba', signinForm);
      formSI.addEventListener('submit', async (e) => {
        console.log('click');
        e.preventDefault();
        const emailInput = document.getElementById('idCorreoSI').value;
        const passwordInput = document.getElementById('idContraseñaSI').value;
        try {
          const { emailVerified, email } = await logini(auth, emailInput, passwordInput)
          console.log(emailVerified,email);
          /* permitir acceder a la página a solo los usuarios que hayan verificado su cuenta a través del correo electrónico enviado */
          if (emailVerified) {
            onNavigate('/feed');
            console.log('Bienvenid@', email);
          } else {
    
            /*  auth.signOut();*/
            console.log('Por favor realiza la verificación de tu cuenta');
          }
          // console.log(emailVerified) /* verificando el observador */
    
    
          signinForm.reset();
          signinForm.querySelector('.message-error-email-login').innerHTML = '';
          signinForm.querySelector('.message-error-password-login').innerHTML = '';
    
    
        } catch ({ code, message }) {
          // console.log('error', error.message, error.code, error.response)
    
          if (code === 'auth/user-not-found') {
            signinForm.querySelector('.message-error-email-login').innerHTML = 'El Usuario no se encuentra registrado';
          } else if (code === 'auth/wrong-password') {
            signinForm.querySelector('.message-error-password-login').innerHTML = 'La Contraseña no corresponde al usuario';
            // } else {
            //  signinForm.querySelector('.message-error').innerHTML = message; //mensajes por defecto de los otros posibles errores
            // }
          }
    
          console.log('signIn');
        };
      });
    };





    const buttonGoogle = document.createElement('button');
    buttonGoogle.textContent = 'Sign in with Google'
    buttonGoogle.type = 'button';
    buttonGoogle.className = 'btnGoogle';
    buttonGoogle.id = 'entrarGoogle';


    if (buttonGoogle) {
        buttonGoogle.addEventListener('click', async (e) => {
            console.log('click');
        e.preventDefault();
        try {
          const { emailVerified, email } = await loginWithGoogle(auth);
          formSI.reset();
          if (emailVerified) {
            onNavigate('/feed');
            console.log('Bienvenid@', email);
          } else {
    
            /*  auth.signOut();*/
            console.log('Por favor realiza la verificación de tu cuenta');
          }
        }
    
        catch (error) {
    
        };
      });
    
    };











    const imagenGoogle = document.createElement('img');
    imagenGoogle.src = '/components/imagen/google.png';
    imagenGoogle.className = 'imgGoogle';

    buttonGoogle.appendChild(imagenGoogle);
    formSI.appendChild(buttonGoogle);
    buttonGoogle.addEventListener('click',  () => {
        
  
    });
    return signinSection;
}