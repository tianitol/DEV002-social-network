import { savePosts, getPost, deletePost, obtenerPost, updatePost, obtenerUsuario, getUsuarios, toggleLike } from "../lib/firebase/methodsFirestore.js";
import { Timestamp, auth} from "../init.js";
import { onNavigate } from "../js/routes.js";
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

    let usuarioActual = '';

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        let textPost = document.getElementById('idUserPost').value;
        if (textPost === null || textPost === '' || textPost.length == 0) {
            alert('escriba un mensaje');
        }
        else {
            getUsuarios(usersCollection => {
                usersCollection.forEach((itemUser) => {

                    let usuarios = itemUser.data();
                    console.log(usuarios);
                    if (auth.currentUser == null) {
                        alert('debes iniciar sesión para postear algo')
                    }

                    else if (auth.currentUser.uid === usuarios.idUsuario) {
                        usuarioActual = auth.currentUser.uid;
                        const usuarioLogeado = usuarios.usuario;
                        console.log(usuarioLogeado);
                        savePosts(textPost, auth.currentUser.uid, usuarioLogeado).then().catch(error => console.log("fallo la promesa para postear", error));
                        alert('tu post ha sido publicado');
                        console.log(usuarioActual);
                    }
                    else { }


                });
                textPost = '';
            })


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


    //----SE INTENTA BLOQUEAR EL MURO, VISIBLE SOLO PARA USUARIOS LOGUEADOS----
    // se crea un boton para volver al inicio con onNavigate dandole el click
    //     const botonHome = document.createElement('button');
    //     botonHome.type = 'button';
    //     botonHome.className = 'home-btn';
    //     botonHome.textContent = 'go SignIn';
    //     botonHome.style.display = 'none';
    //     feedSection.appendChild(botonHome);

    //     if(auth.currentUser !== null) {
    //        contenedorPosts.style.display = 'block';
    //        createContainerButtons.style.display = 'block';

    //     }
    //     else {
    //         contenedorPosts.style.display = 'none';
    //         createContainerButtons.style.display = 'none';

    //         alert('debes iniciar sesión');
    //         botonHome.style.display = 'flex';

    //         botonHome.addEventListener('click', () => {
    //             console.log('yo, botonHome, hice click');
    // onNavigate('/login');
    // botonHome.style.display = 'none';
    //         })

    //     };

    contenedorPosts.className = 'contenedor-posts';
    feedSection.appendChild(contenedorPosts);


    getPost(postsCollection => {
        contenedorPosts.innerHTML = '';
        postsCollection.forEach((item) => { /*para traer los posts de mi colección */

            let posts = item.data()
            //console.log(item.id);
            posts = { ...posts, time: new Date(posts.date.seconds * 1000) }
             console.log(posts);
            const dateTime = getFecha(posts.time); /* trae la fecha como un timestamp, new Date lo convierte a fecha completa en inglés y con la función getFecha convertimos a formato d/m/y h:m */


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
            userPost.innerHTML = `${posts["nombreUsuario"]}`; //aquí debe ir enlazado al usuario registrado/logueado
            divParteSuperior.appendChild(userPost);
            //console.log(posts);

            //obtenerPost(item.id).then(console.log(item._userDataWriter)).catch();
            //console.log(auth.currentUser);
            const btnLike = document.createElement('button');
            btnLike.type = 'button';
            btnLike.className = 'boton-like';
            btnLike.id = 'botonLike';
            btnLike.innerHTML = '<i class="fa-solid fa-heart fa-lg"></i>' + posts.likes.length + ' likes';
            btnLike.addEventListener('click', (e) => {
                //console.log('e',e);
                toggleLike({
                    uid: auth.currentUser.uid,
                    post_id: item.id,
                    newFile: {
                        likes: posts.likes
                    }

                })
                //console.log();

            })
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

            const descripcionPost = document.createElement('h3');
            descripcionPost.className = 'descripcion-post';
            descripcionPost.innerHTML = `${posts["descripcion"]}`;
            divParteInferior.appendChild(descripcionPost);

            const fechaPost = document.createElement('h4');
            fechaPost.className = 'fecha-post';
            fechaPost.innerHTML = `${dateTime}`;
            divParteInferior.appendChild(fechaPost);


            contenedorPosts.append(postCreado);

            //----------------------ELIMINACIÓN DE UN POST SEGÚN ID DEL DOCUMENTO---------------------------------------
            btnEliminar.addEventListener('click', async () => {
                const eliminar = confirm('Do you want to delete this message?');
                if (eliminar) {
                    if (eliminar) {
                        // obtenerPost(item.id).then(console.log(item.id)).catch();
                        let idPost = '';
                        if (item.id) {
                            idPost = item.id;
                            //console.log(idPost);
                        }
                        // deletePost(idPost).then(console.log(deletePost(idPost))).catch(); then resuelve de forma asíncrona y el try(síncrono) se le pone el await(hasta que se resuelva no pasa el código a siguientes instrucciones) para resolverlo
                        try {
                            await deletePost(idPost);
                            alert('el post ha sido eliminado');


                        } catch (error) {
                            alert('error al eliminar');
                        }
                        // console.log(deletePost(idPost));

                    }
                };
            });



            //----------------------INTERACCIÓN LIKES--------------------------------------

            // var arrayLikesUsuarios= posts.likes;
            // console.log(posts.likes);
            // var numeroLikes=0;
            // function addLike(){
            //     numeroLikes++;
            //     console.log(numeroLikes)
            // }

            //var numeroLikes = arrayLikesUsuarios.length;
            //const suma= item + 1;
            //console.log(suma);
            // console.log(numeroLikes);



            //Likear(item.id,suma, auth.currentUser.uid)











            //----------------------EDICIÓN DE UN POST SEGÚN ID DEL DOCUMENTO--------------------------------------

            //--------------botón que aparece para enviar el post editado (en el div de cada post)---------
            const botonEnviarEditar = document.createElement('button');
            botonEnviarEditar.type = 'button';
            botonEnviarEditar.className = 'post-btn';
            botonEnviarEditar.textContent = 'Save';
            botonEnviarEditar.style.display = 'none';
            divParteInferior.appendChild(botonEnviarEditar);
            //----------------------------------------------------------------------------------

            btnEditar.addEventListener('click', () => {
                console.log('click')
                //textPostEdit.innerText = item.data().descripcion;
                descripcionPost.contentEditable = "true";
                descripcionPost.style.backgroundColor = '#97cbdc';
                descripcionPost.style.border = 'dotted';
                descripcionPost.focus();


                botonEnviarEditar.style.display = 'flex';
            });

            botonEnviarEditar.addEventListener('click', async () => {
                const editar = confirm('Do you want to edit this message?');
                if (editar) {
                    if (editar) {
                        // obtenerPost(item.id).then(console.log(item.id)).catch();
                        let idPost = '';
                        if (item.id) {
                            idPost = item.id;
                        }
                        const textoEditado = descripcionPost.textContent;
                        try {
                            await updatePost(idPost, {
                                "descripcion": textoEditado,
                                "date": Timestamp.fromDate(new Date()),
                                "likes": []
                            });
                            botonEnviarEditar.style.display = 'none'; //al dar click en SEND desaparece el boton
                            alert('editado con éxito');
                        } catch (error) {
                            console.log(error);
                            alert('error al editar');
                        }
                    }
                }
                //console.log(item.data().descripcion); 
                /*al consolear se obtiene la descripcion del post original, 
                y no el texto post editar, ya que onSnapshot es más rápido que 
                el proceso firestore para almacenar data desde la APP*/

            });




        });


    });

    // .catch(error => console.log("fallo la promesa de firestore", error))

    //MODAL LOG OUT
    const modalLogOut = document.createElement('div');
    modalLogOut.className = 'modal';
    modalLogOut.id = 'idModalLogout';

    modalLogOut.innerHTML = `
        <div class="modal-container" id="modalContainerLogout">
            <h3>Log out of Dad's Power?</h3>
            <button type="button" class ="aceptar-logout" id="botonAceptar"> Ok </button>
            <button type="button" class ="close-modalLogout" id="botonCancelar"> Cancel </button>
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


    return feedSection;

}


const getFecha = (dateTime) => {
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1 < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1;
    const day = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate();
    const hour = dateTime.getHours();
    const minutes = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minutes}`;
}