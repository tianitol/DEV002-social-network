//import { onNavigate } from '../js/routes.js'
//import { postsRef } from "./lib/firebase/methodsFirestore.js";
//import { posts } from "../main.js";
import { postsRef } from "../lib/firebase/methodsFirestore.js";
export const feed = () => {

    const feedSection = document.createElement('section');
    feedSection.className = 'section-feed';

    const containerHeader = document.createElement('div');
    containerHeader.className = 'feed-container-header';

    feedSection.appendChild(containerHeader);


    const titulo = document.createElement('h2');
    titulo.textContent = "Dad's Power";
    titulo.className = 'tituloh2-feed';

    containerHeader.appendChild(titulo);

    const perfil = document.createElement('div')
    perfil.className = 'avatarUser';
    // const username = document.getElementById('idUsername');
    // username.id = 'idUsername';
    // perfil.appendChild(username);
    // perfil.type = 'file'
    const avatarImg = document.createElement('img');
    avatarImg.className = 'avatarImg';
    avatarImg.src = '/components/imagen/avatar.png';
    perfil.appendChild(avatarImg);

    containerHeader.appendChild(perfil);


    const createContainerButtons = document.createElement('div');
    createContainerButtons.className = 'container-buttons';
    feedSection.appendChild(createContainerButtons);

    const createPostButton = document.createElement('button');
    createPostButton.id = 'idCreatePostButton'
    createPostButton.innerHTML = '<i class="fa-solid fa-circle-plus fa-2xl"></i>';

    createPostButton.addEventListener('click', () => openModalAddPost(feedSection));

    const perfilButton = document.createElement('button');
    perfilButton.id = 'idPerfilButton'
    perfilButton.innerHTML = '<i class="fa-regular fa-circle-user fa-2xl"></i>';

    const comentarioButton = document.createElement('button');
    comentarioButton.id = 'idcomentarioButton'
    comentarioButton.innerHTML = '<i class="fa-regular fa-message fa-2xl"></i>';


    createContainerButtons.appendChild(perfilButton);
    createContainerButtons.appendChild(createPostButton);
    createContainerButtons.appendChild(comentarioButton);


    const contenedorPosts = document.createElement('div');
    contenedorPosts.className = 'contenedor-posts';
    feedSection.appendChild(contenedorPosts);

    //console.log('postsRef', postsRef);

    postsRef()
    .then(postsCollection => {
     postsCollection.forEach((item) => { /*para traer los posts de mi colección */
      
        const posts = item.data();
        console.log(posts);

         const postCreado = document.createElement('div');
         postCreado.className = 'post-div';
 
 
         postCreado.innerHTML = `
         <div class = "container-post" id = "ContainerPost">
             <div class = "parte-superior-post">
                 <button class ="boton-editar" id="botonEditar" ><i class="fa-solid fa-pencil fa-lg"></i> </button>
                 <button class ="boton-eliminar" id="botonEliminar"><i class="fa-solid fa-trash-can fa-lg"></i></button>
             </div>
             <button type="button" class ="boton-like" id="botonLike"><i class="fa-solid fa-heart fa-lg"></i></button>
             <h2 class = "titulo-post">${posts["titulo"]}</h2> 
             <h3 class = "descripcion-post"> ${posts["descripcion"]}</h3> 
             <h4 class = "fecha-post">${posts["fecha"]}</h4> 
         </div>  
         `;
         contenedorPosts.append(postCreado);

     });
    })
    .catch(error => console.log("fallo la promesa de firestore", error))

    return feedSection;

}

