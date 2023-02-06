import { home } from '../components/Home.js';
import { register } from '../components/registro.js';
import { login } from '../components/login.js';
import { feed } from '../components/feed.js';


const rootDiv = document.getElementById('root');
const routes = {
    '/': home,
    '/registro': register,
    '/login': login,
    '/feed': feed,
};

export const onNavigate = (pathname) => { //se cambia la ruta
    window.history.pushState(
        {state:pathname},
        pathname,
        window.location.origin + pathname, // requiere 3 parámetros - 1 estado vacio - asignar título - asignar la ruta//
    );
    while (rootDiv.firstChild) {
        rootDiv.removeChild(rootDiv.firstChild);
    }

    rootDiv.appendChild(routes[pathname]());
};


 const components = routes[window.location.pathname];

 window.onpopstate = () => {
   rootDiv.appendChild(components());
 };
rootDiv.appendChild(components());


