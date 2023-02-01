import { savePosts, getPost, deletePost } from "../lib/firebase/methodsFirestore.js";
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


    const avatarImg = document.createElement('img');
    avatarImg.className = 'avatarImg';
    avatarImg.src = '/components/imagen/avatar3.png';
    
    perfil.appendChild(avatarImg);

    containerHeader.appendChild(perfil);


    const createContainerButtons = document.createElement('div');
    createContainerButtons.className = 'container-buttons';
    feedSection.appendChild(createContainerButtons);

    const perfilButton = document.createElement('button');
    perfilButton.type = 'button';
    perfilButton.id = 'idPerfilButton';
    perfilButton.className = 'perfil-button';
    perfilButton.innerHTML = '<i class="fa-regular fa-circle-user fa-2xl"></i>';

    const comentarioButton = document.createElement('button');
    comentarioButton.type = 'button';
    comentarioButton.id = 'idcomentarioButton';
    comentarioButton.className = 'comentario-button';
    comentarioButton.innerHTML = '<i class="fa-regular fa-message fa-2xl"></i>';

    const logoutButton = document.createElement('button');
    logoutButton.type = 'button';
    logoutButton.id = 'idlogoutButton';
    logoutButton.className = 'logout-button';
    logoutButton.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket fa-2xl"></i>';

    createContainerButtons.appendChild(perfilButton);
    createContainerButtons.appendChild(comentarioButton);
    createContainerButtons.appendChild(logoutButton);




    //----------------------------------FORMULARIO PARA POSTEAR--------------------------------------------------------------------------

    const formulario = document.createElement('form');
    formulario.method = 'post';
    formulario.id = 'idForm';
    formulario.className = 'formulario-post';
    //console.log(formulario);
    feedSection.appendChild(formulario);


    const publicarPostButton = document.createElement('button');
    publicarPostButton.className = 'post-btn';
    publicarPostButton.type = 'submit';
    publicarPostButton.id = 'idPostButton';
    publicarPostButton.textContent = 'Post';
    formulario.appendChild(publicarPostButton);

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log('click');
        let textPost = document.getElementById('idUserPost').value;
        if (textPost === null || textPost === '' || textPost.length == 0) {
            alert('escriba un mensaje');
        }
        else {
            savePosts(textPost).then().catch(error => console.log("fallo la promesa para postear", error));
            textPost = '';
            alert('tu post ha sido publicado');
            // unsub(textPost).then(result => console.log(result)).catch(error => console.log("fallo la promesa mostrar en tiempo real los posts existentes", error));
        }

        formulario.reset();
    });


    const textoUser = document.createElement('textarea');

    textoUser.className = 'textoUser';
    textoUser.name = 'addpost';
    textoUser.id = 'idUserPost';
    textoUser.placeholder = 'what do you need?';
    formulario.appendChild(textoUser);



    //----------------------MOSTRANDO POSTS EXISTENTES-----------------------------

    const contenedorPosts = document.createElement('div');
    contenedorPosts.className = 'contenedor-posts';
    feedSection.appendChild(contenedorPosts);

    // savePosts(textoUser.value).then().catch(error => console.log("fallo la promesa para postear", error));


    // postsRef()
    getPost(postsCollection => {
        contenedorPosts.innerHTML = '';
        postsCollection.forEach((item) => { /*para traer los posts de mi colección */

            const posts = item.data();
            //console.log(posts);
            //console.log(posts["fecha"]);
            const postCreado = document.createElement('div');
            postCreado.className = 'post-div';
            const divContainerPost = document.createElement('div');
            divContainerPost.className = 'container-post';
            divContainerPost.id = 'ContainerPost';
            postCreado.appendChild(divContainerPost);

            //div para botones likes-edit-delete
            const divParteSuperior = document.createElement('div');
            divParteSuperior.className = 'parte-superior-post';
            divParteSuperior.id = 'parteSuperior';
            divContainerPost.appendChild(divParteSuperior);

            //botones de parte superior
            const userPost = document.createElement('h2');
            userPost.className = 'titulo-post';
            userPost.innerHTML = `${posts.uid}`; //aquí debe ir enlazado al usuario registrado/logueado
            divParteSuperior.appendChild(userPost);


            const btnLike = document.createElement('button');
            btnLike.type = 'button';
            btnLike.className = 'boton-like';
            btnLike.id = 'botonLike';
            btnLike.innerHTML = '<i class="fa-solid fa-heart fa-lg"></i>15 likes';
            divParteSuperior.appendChild(btnLike);

            const btnEditar = document.createElement('button');
            btnEditar.type = 'button';
            btnEditar.className = 'boton-editar';
            btnEditar.id = 'botonEditar';
            btnEditar.innerHTML = '<i class="fa-solid fa-pencil fa-lg"></i>';
            divParteSuperior.appendChild(btnEditar);

            const btnEliminar = document.createElement('button');
            btnEliminar.type = 'button';
            btnEliminar.className = 'boton-eliminar';
            btnEliminar.id = 'botonEliminar';
            btnEliminar.innerHTML = '<i class="fa-solid fa-trash-can fa-lg"></i>';
            divParteSuperior.appendChild(btnEliminar);

            const divParteInferior = document.createElement('div');
            divParteInferior.className = 'parte-inferior-post';
            divContainerPost.appendChild(divParteInferior);

            divParteInferior.innerHTML = '';
            divParteInferior.innerHTML = `
        
             <h3 class = "descripcion-post"> ${posts["descripcion"]}</h3> 
             <h4 class = "fecha-post">${posts.date}</h4> 
          
         `;

            contenedorPosts.append(postCreado);

            if (btnEliminar) {
                btnEliminar.addEventListener('click', () => {
                    console.log('click')
                    openModalDelete();
                    

                });
            };
        });
    })
    // .catch(error => console.log("fallo la promesa de firestore", error))

    //MODAL LOG OUT
    const modalLogOut = document.createElement('div');
    modalLogOut.className = 'modal';
    modalLogOut.id = 'idModalLogout';

    modalLogOut.innerHTML = `
       <div class="modal-container" id="modalContainerLogout">
           <h3 class=" texto-delete">Log out of Dad's Power?</h3>
           <button type="button" class ="boton-aceptar" id="botonAceptar"> Ok </button>
           <button type="button" class ="boton-cancelar" id="botonCancelar"> Cancel </button>

       </div>
      `;
    feedSection.appendChild(modalLogOut);

    const closeModal = () => {
        // console.log('cerrando');
        modalLogOut.style.display = 'none';
    }

    const openModal = () => {
        // console.log('hello');
        modalLogOut.style.display = 'flex';
    }

    logoutButton.addEventListener('click', () => {
        openModal();
    });

    const closeModalLogout = modalLogOut.querySelector('#botonCancelar'); //no se puede usar getElementById porque aun no existe
    if (closeModalLogout) { closeModalLogout.addEventListener('click', () => { closeModal() }); }

    // MODAL ELIMINAR

    const modalDelete = document.createElement('div');
    modalDelete.className = 'modal';
    modalDelete.id = 'idModalDelete';

    modalDelete.innerHTML = `
    <div class="modal-container" id="modalContainerDelete">
        <h3 class="texto-delete">Do you want to delete?</h3>
        <button type="button" class ="boton-aceptar" ' id="Eliminar"> Ok </button>
        <button type="button" class ="boton-cancelar" id="botonCancelarEliminar"> Cancel </button>

    </div>
    `;
    feedSection.appendChild(modalDelete);

    const closeModalDelete = () => {
        console.log('cerrando');
        modalDelete.style.display = 'none';
    }

    const openModalDelete = () => {
        console.log('hello');
        modalDelete.style.display = 'flex';
    }
    

     
    const aceptarEliminar = contenedorPosts.querySelectorAll('.boton-aceptar');
      aceptarEliminar.forEach(btn => { 
        console.log(aceptarEliminar)
        btn.addEventListener('click', (e) => {
       /*funcion delete*/ 
            
        });
    
});
    const closeDelete = modalDelete.querySelector('#botonCancelarEliminar'); //no se puede usar getElementById porque aun no existe
    if (closeDelete) {
        closeDelete.addEventListener('click', () => { closeModalDelete() });
    }


    return feedSection;

}


