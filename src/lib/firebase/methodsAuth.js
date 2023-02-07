import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signOut } from '../../init.js'

const user = auth.currentUser;


// construyendo un observador de Auth
// export const observador = async (auth) => {
//     let uid = null; 
//      await onAuthStateChanged(auth, async(user) => {
//        //console.log(user);
//        console.log('user', user.uid)
//        uid=user.uid;
//        //return user.uid;
//     });
//     return uid;
// };



export const verificarSendingMail = (auth) => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            // Email verification sent!
            alert('por favor verifique su correo');
            // ...
        });
}

// export const register = (auth, signupEmail, signupPassword) => {
//     return new Promise((resolve, reject) => {    //resolve para retornar el valor deseado cuando una función se ejecute y reject para cuando una función retorna un valor no deseado./
//         return createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
//             .then((userCredential) => {
//                 console.log(userCredential);
//                 resolve(userCredential)})  //está implícita una promesa/
//             .catch(error => reject(error))
 
           
//             });
//     }

    export const register = async (auth, signupEmail, signupPassword) => {
        try {
            const credencialUsuario = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            return credencialUsuario;
        }catch(error){
            return error
        }
    }

// export const login = (auth, email, password) => {
//         return new Promise((resolve, reject) => {    //resolve para retornar el valor deseado cuando una función se ejecute y reject para cuando una función retorna un valor no deseado./
//             return signInWithEmailAndPassword(auth, email, password)
//                 .then(({ user }) => {
//                     console.log(user);
//                     resolve(user)})   //desestructuración del objeto user/
//                 .catch(error => reject(error))
//         })
//     }

export const login = async(auth, email, password) => {
    try{
       const user = await signInWithEmailAndPassword(auth, email, password)
       return user.user;
    }catch(error){
       return error
    }
}
    

//    export const logOut = (auth) => {
//         auth.signOut().then(() => {
//             console.log('sign out');})
//             .catch((error) => {
//              // An error happened.
//              });
//     };


export const logOut =async  (auth) => {
   try {
    await signOut(auth)
    return Promise.resolve(true)
    // Sign-out successful.
  } catch(error)  {
    return Promise.reject(error) 
    // An error happened.
  };
};


    export const loginWithGoogle = (auth) => {
        return new Promise((resolve, reject) => {    //resolve para retornar el valor deseado cuando una función se ejecute y reject para cuando una función retorna un valor no deseado./

        const provider = new GoogleAuthProvider();

       return signInWithPopup(auth, provider)
        .then(({ user }) => resolve(user))
        .catch(error => reject(error))
              
        });
    };



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