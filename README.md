#  Red Social DAD'S POWER
![inicioApp](https://user-images.githubusercontent.com/113317909/217306786-1951a285-1336-4a17-9e9f-b9b0410c95ae.png)

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2.Investigación UX](#2-Ivestigación-UX)
* [3. Historias de usuario](#3-historias-de-usuario)
* [4. Prototipo de baja calidad](#4-Prototipo-de-alta-calidad)
* [5. Prototipo de alta calidad](#4-Prototipo-de-alta-calidad)
* [6. Organización](#6-Organización)

## 1. Preámbulo

Dad’s power es una comunidad para padres primerizos lo cual el propósito del App es crear un espacio de apoyo entre ellos mismos logrando  resolver dudas y reír mientras lo haces.
Cada consejo y tip será de gran ayuda para cada uno. Dad’s power valora tu opinión..



## 2. Investigación UX

¿Quiénes son los principales usuarios? 
Nuestros principales usuarios son padres con mucho interés en expresar sus emociones y encontrar un ambiente donde puedes ser auténtico al mostrar su lado sensible  y no ser juzgado. 
¿Qué problema resuelve el producto ? 
Nuestro producto sirve para resolver preguntas dadas por los usuarios generando una variedad de respuestas, donde se podrá interactuar al reaccionar con un like.
¿para qué le sirve a los usuarios ?
Para generar calma y saber que no estará solo en el proceso, ya que  como él, existen otros padres en su misma situación. 


## 3. Historias de usuario

HU 1 :📝
Como nuevo usuario quiero poder registrarme para acceder al sitio web por primera vez.
Criterios de aceptación:
Que aparezca un formulario para ingresar los datos de creación de cuenta (correo electrónico y contraseña ).
Lo que se escriba en el campo ( input ) de contraseña debe ser secreto.
Que haya un botón de envío del formulario.

Definición determinada:  
Que no se permite enviar el formulario en los siguientes casos (vacío o con alguno de los campos faltantes, correo invalido, contraseña que no cumpla lo requerido, no pueden haber usuarios repetidos).
Si hay errores, se debe mostrar mensajes descriptivos para ayudar al usuario a corregirlos.
El fiel a los estilos definidos según prototipo de alta fidelidad.

HU 2 :📝
Como usuario registrado quiero poder loguearme para ingresar a la App

   Criterios de aceptación:
Se presenta un botón (login) que al hacer click aparezca el formulario de ingreso
se presenta un formulario con dos campos (correo y contraseña ) (iniciar con google)
Se presenta un botón para envío de formulario.
Definición determinada:  
Correo válido, contraseña registrada, no se permite campos vacíos.
Se debe mostrar mensajes descriptivos para ayudar al usuario a corregir el error.
Es fiel a los estilos definidos según el prototipo de alta fidelidad.

HU 3 :📝
Como usuario logueado quiero poder visualizar los post existentes en el muro de la App.
  Criterios de aceptación:
Es fiel a los estilos definidos según el prototipo de alta fidelidad.
Se puede desplazar en vertical (hacer scroll)
Se muestran los post en una columna.
Cada post debe contener nombre del usuario, descripción y fecha.
Definición determinada:  
Al recargar la App , se debe verificar si el usuario esta logueado antes de mostrar el contenido.

HU 4 :📝
Como usuario logueado quiero poder postear , para poder interactuar con los otros usuarios.
 Criterios de aceptación:
Poder publicar un post solo si se encuentra logueado.
Al publicar, se debe validar que exista contenido en el input
Capturar el id del usuario - descripción - fecha 
Utilizar el onSnapshot para poder actualizar en tiempo real.
Implementación del logout

Definición determinada:  
Ver los post existentes en tiempo real.
HU 5 :📝
Como usuario logueado quiero poder editar mi propio post, para poder corregir y complementar lo escrito.
Criterios de aceptación:
Se muestra el post editado en tiempo real
Se selecciona el div del post para poder editar 
Se muestra una alert donde te pregunta si aun quieres editar tu post.
Se muestra una alert donde te informa que el post ya está publicado.

HU 6 :📝Como usuario logueado quiero poder eliminar mi propio post , para que no se muestre. 
Criterios de aceptación:
Se muestra un alert donde te pregunta ¿Estás seguro de eliminar el post?
Se elimina el post y se actualiza en tiempo real.

HU 7 :
Como usuario logueado quiero poder dar like a un post y visualizar los likes que tiene un post, para demostrar que me agrado el post publicado y saber cuales son los post con mas interacción. 
Criterios de aceptación:
Poder visualizar el botón del like.
Poder visualizar el aumentos de los likes por usuario logueado.
Se muestra en cambio en tiempo real 

Criterios de aceptación:
Solo poder dar like una vez por usuario.
Poder quitar el like con el mismo botón al presionar por segunda vez.

## 4. Prototipo de baja calidad



## 5. Prototipo de alta calidad

[PROTOTIPO DE ALTA CALIDAD](http://https://www.figma.com/file/1MHOh4djL5qDU49IhIfA0M/PROTOTIPO-DE-ALTA-RED-SOCIAL-NVJ?node-id=0%3A1&t=YXrYsFT15GoG3kM0-0 "PROTOTIPO DE ALTA CALIDAD")### Features

 [Figma Dad's Power](https://www.figma.com/file/1MHOh4djL5qDU49IhIfA0M/PROTOTIPO-DE-ALTA-RED-SOCIAL-NVJ?node-id=0%3A1&t=YXrYsFT15GoG3kM0-0)

## 5. Organización

[Github Project](https://github.com/users/tianitol/projects/1/views/1)
