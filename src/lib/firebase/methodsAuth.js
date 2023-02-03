import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification } from '../../init.js'

const user = auth.currentUser;


// construyendo un observador de Auth
export const observador = (auth) => {
    onAuthStateChanged(auth, (user) => {
       console.log(user);
        if (user !==null) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const email = user.email;
            const displayName = user.displayName;
            const uid = user.uid; // código único del usuario asignado por Firebase

            
            // El usuario se encuentra logueado
            console.log('auth:sign in');

            var emailVerified = user.emailVerified;
            if (emailVerified === false) {
                console.log('Email no verificado');
            } else {
                console.log('Email verificado');
            }
            // ...
        } else {
            // el suusario no se encuentra logueado
            console.log('auth: log out');
        }
    });
}



export const verificarSendingMail = (auth) => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            // Email verification sent!
            alert('por favor verifique su correo');
            // ...
        });
}

export const register = (auth, signupEmail, signupPassword) => {
    return new Promise((resolve, reject) => {    //resolve para retornar el valor deseado cuando una función se ejecute y reject para cuando una función retorna un valor no deseado./
        return createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then((userCredential) => resolve(userCredential))  //está implícita una promesa/
            .catch(error => reject(error))
 
           
            });
    }

export const login = (auth, email, password) => {
        return new Promise((resolve, reject) => {    //resolve para retornar el valor deseado cuando una función se ejecute y reject para cuando una función retorna un valor no deseado./
            return signInWithEmailAndPassword(auth, email, password)
                .then(({ user }) => resolve(user))   //desestructuración del objeto user/
                .catch(error => reject(error))
        })
    }

    

   export const logOut = (auth) => {
        auth.signOut().then(() => {
            console.log('sign out');
        });
    }


    export const loginWithGoogle = (auth) => {
        return new Promise((resolve, reject) => {    //resolve para retornar el valor deseado cuando una función se ejecute y reject para cuando una función retorna un valor no deseado./

        const provider = new GoogleAuthProvider();

       return signInWithPopup(auth, provider)
        .then(({ user }) => resolve(user))
        .catch(error => reject(error))
              
        })
    }



    // export const loginWithGoogle = (auth) => {
    //     const provider = new GoogleAuthProvider();

    //     signInWithPopup(auth, provider)
    //         .then(result => {
    //             const user = result.user;
    //             //   closeModalSI();
    //             console.log('sign in Google');
    //             //   signinForm.querySelector('.message-error').innerHTML = '';
    //         })
    //         .catch((error) => {
              
    //          });
    // }