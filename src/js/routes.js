import { home } from '../components/home.js';
import { register } from '../components/registro.js';
import { login } from '../components/login.js';
import { feed } from '../components/feed.js';
import { auth, getAuth, initializeApp } from '../init.js';
//import { observador } from '../lib/firebase/methodsAuth.js';
// import config from '../lib/firebase/config.js';



const rootDiv = document.getElementById('root');
const routes = {
    '/': home,
    '/registro': register,
    '/login': login,
    '/feed': feed,
};

export const onNavigate = (pathname) => { //se cambia la ruta
    window.history.pushState(
        { state: pathname },
        pathname,
        window.location.origin + pathname, // requiere 3 parámetros - 1 estado vacio - asignar título - asignar la ruta//
    );
    while (rootDiv.firstChild) {
        rootDiv.removeChild(rootDiv.firstChild);
    }

    rootDiv.appendChild(routes[pathname]());
};
let componentes = null;
componentes = routes[window.location.pathname]
// const user =await observador(auth);
// console.log('user', user);


// const app = initializeApp(config);

// const auth = await getAuth();
// console.log('auth', auth)
// if (auth.currentUser) {
//     console.log('auth si')
//     componentes = routes[window.location.pathname]
// }
// else {
//     componentes = routes['/'];
//     console.log('auth no')

// }


// console.log('auth', auth.currentUser, window.location.pathname);

window.onpopstate = () => {
    rootDiv.appendChild(componentes());
};
rootDiv.appendChild(componentes());


