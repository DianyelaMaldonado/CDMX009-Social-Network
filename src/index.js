import { viewLogin } from './view/login.js';
import { viewRegister } from './view/register.js';
import { viewForum } from './view/fuorum.js';
import { editionOfProfile } from './view/editprofile.js';
import { viewProfile } from './view/profile.js';
import { buildComent } from './view/coment.js';

document.addEventListener("DOMContentLoaded", function() {
    var obtainingPersistenceData = JSON.parse(localStorage.getItem('userdata')); //aquí lo obtengo.GET ITEM es para que local me muestre la data si existe dentro de ella
    if (obtainingPersistenceData == null) { //no hay localStorage
        // console.log('Keep Calm', obtainingPersistenceData);
        document.getElementById('hideAndShow').style.display = 'none';
        document.getElementById('movilIcon').style.display = 'none';
        viewLogin()
            .then(function() {
                // En esta parte creo una variable en donde voy a llamar a mi id al que quiero darle el click en este caso el login
                var buttonLogin = document.querySelector('#doLogin');
                buttonLogin.addEventListener('click', function(e) {
                    e.preventDefault();
                    loginPageOne();

                    movilIcon.classList.add('shown');
                });
            }).then(function() {
                // En esta parte creo una variable en donde voy a llamar a mi id al que quiero darle el click en este caso el ingreso con google
                var buttonGoogle = document.querySelector('#loginGoogle');
                buttonGoogle.addEventListener('click', function(e) {
                    e.preventDefault();
                    googleButton();
                });
            })
            .then(function() {
                // En esta parte creo una variable en donde voy a llamar a mi id al
                // que quiero darle el click en este caso el ingreso con facebook
                var buttonFacebook = document.querySelector('#loginFacebook');
                buttonFacebook.addEventListener('click', function(e) {
                    e.preventDefault();
                    facebookButton();
                    document.getElementById('hideAndShow').style.display = 'block';
                    movilIcon.classList.add('shown');
                });
            })
            .then(function() {
                var ntAccount = document.querySelector('#reg');
                ntAccount.addEventListener('click', function(e) {
                    e.preventDefault();
                    viewRegister()
                        .then(function() {
                            var buttonReg = document.querySelector('#doRegister');
                            buttonReg.addEventListener('click', function(e) {
                                e.preventDefault();
                                register();
                            });
                        })
                });
            })
    } else {
        clickMenus(obtainingPersistenceData);
        viewForum(obtainingPersistenceData)
            .then(function() {
                publicPost(obtainingPersistenceData);
                readPosts();



            })
        document.getElementById('hideAndShow').style.display = 'block';
        movilIcon.classList.add('shown');
    }
})

// Navegador en móvil
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

//*********************BLOQUE      UNO ****************************/

// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte la que me hace entrar a la app (login)
function loginPageOne() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    var movilIcon = document.getElementById('movilIcon');
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((data) => {
            clickMenus(data.user);
            viewForum(data.user)
                .then(function() {
                    publicPost(data.user);
                    readPosts();
                })
                .then(function() {
                    localStorage.setItem('userdata', JSON.stringify(data.user)); //aquí le digo que guarde como un json formateado mi objeto. su parametro es su nombre el segundo lo que vale
                })
            document.getElementById('hideAndShow').style.display = 'block';
            movilIcon.classList.add('shown');
        })
        .catch(function(error) {
            alert('Los datos ingresados no son correctos');
            // Handle Errors here. puedo hacer algo despues del login, si salio mal
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // borrar o cambiar la pantalla
            // renderLogin()
        });
    var cred = firebase.auth.EmailAuthProvider.credential(email, pass);
}



//*********************BLOQUE      DOS ****************************/



// **************** L O G I N     G O O G L E*******
// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte  la que me hace entrar a la app con google (google)
function googleButton() {
    // Aquí se crea una instancia del objeto del proveedor de Google y facebook
    // esta instancia es para que me redireccione a google o de facebook, es la parte que me lleva a ellos.
    var provider = new firebase.auth.GoogleAuthProvider();
    var movilIcon = document.getElementById('movilIcon');

    firebase.auth().signInWithPopup(provider)
        .then(function(data) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = data.credential.accessToken;
            // The signed-in user info.
            var user = data.user;
            clickMenus(user);
            viewForum(user)
                .then(function() {
                    publicPost();
                }).then(function() {
                    localStorage.setItem('userdata', JSON.stringify(user)); //aquí le digo que guarde como un json formateado mi objeto, esa data.user la bautizo como user data que es lo que estoy colocando arriba
                })
            document.getElementById('hideAndShow').style.display = 'block';
            movilIcon.classList.add('shown');
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}



//*********************BLOQUE      TRES ****************************/

// **************** L O G I N     F A C E B O O K *******
// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte  la que me hace entrar a la app con facebook (facebook)
function facebookButton() {
    var provider = new firebase.auth.FacebookAuthProvider();
    var movilIcon = document.getElementById('movilIcon');

    firebase.auth().signInWithPopup(provider)
        .then(function(data) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = data.credential.accessToken;
            // The signed-in user info.
            var user = data.user;
            clickMenus(user);
            viewForum(user)
                .then(function() {
                    publicPost();
                }).then(function() {
                    localStorage.setItem('userdata', JSON.stringify(user)); //aquí le digo que guarde como un json formateado mi objeto
                })
            movilIcon.classList.add('shown');
            document.getElementById('hideAndShow').style.display = 'block';
        }).catch(function(error) {
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
}

//*********************BLOQUE      CUATRO ****************************/
// ******** LOG OUT FUNCTION 
function out() {
    console.log('revisando out');

    firebase.auth().signOut()
        .then(function() {
            document.getElementById('movilIcon').classList.toggle('shown');
            document.getElementById('hideAndShow').style.display = 'none';
        })
        .then(function() {
            viewLogin()
                .then(function() {
                    localStorage.setItem('userdata', null); //aquí le digo que guarde como un json formateado mi objeto
                })
                .then(function() {
                    // En esta parte creo una variable en donde voy a llamar a mi id al que quiero darle el click en este caso el login
                    var buttonLogin = document.querySelector('#doLogin');
                    buttonLogin.addEventListener('click', function(e) {
                        e.preventDefault();
                        loginPageOne();

                        movilIcon.classList.add('shown');
                    });
                }).then(function() {
                    // En esta parte creo una variable en donde voy a llamar a mi id al que quiero darle el click en este caso el ingreso con google
                    var buttonGoogle = document.querySelector('#loginGoogle');
                    buttonGoogle.addEventListener('click', function(e) {
                        e.preventDefault();
                        googleButton();
                    });
                })
                .then(function() {
                    // En esta parte creo una variable en donde voy a llamar a mi id al
                    // que quiero darle el click en este caso el ingreso con facebook
                    var buttonFacebook = document.querySelector('#loginFacebook');
                    buttonFacebook.addEventListener('click', function(e) {
                        e.preventDefault();
                        facebookButton();
                        document.getElementById('hideAndShow').style.display = 'block';
                        movilIcon.classList.add('shown');
                    });
                })
                .then(function() {
                    var ntAccount = document.querySelector('#reg');
                    ntAccount.addEventListener('click', function(e) {
                        e.preventDefault();
                        viewRegister()
                            .then(function() {
                                var buttonReg = document.querySelector('#doRegister');
                                buttonReg.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    register();
                                });
                            })
                    });
                })

            window.history.pushState('cerrar sesion', 'cerrar sesion', '/');
        })
        .catch(function(error) {
            console.log(error);

        });
}


//*********************BLOQUE      CINCO ****************************/

function register() {
    var registerNameLogin2 = document.getElementById('registerLoginName2').value;
    var registerEmailLogin2 = document.getElementById('registerLoginEmail2').value;
    var registerPassLogin2 = document.getElementById('registerLoginPass2').value;
    var registerConfirmPassLogin2 = document.getElementById('registerLoginConfirmPass2').value;
    var movilIcon = document.getElementById('movilIcon');
    if (registerPassLogin2 != registerConfirmPassLogin2) {
        alert('Las contraseñas deben coincidir');
    } else {
        firebase.auth().createUserWithEmailAndPassword(registerEmailLogin2, registerPassLogin2)
            .then((data) => {
                clickMenus(data.user);
                viewForum(data.user);
                document.getElementById('hideAndShow').style.display = 'block';
                movilIcon.classList.add('shown');
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
            });
    }
}


//*********************BLOQUE      SEIS ****************************/


/*************** FUNCIONALIDAD DE POSTS***************/

//traer la informacion del post cuando se le da clic en el boton
function publicPost(user) {
    //console.log(user)
    let fileInput = document.getElementById('myNewFile'); //variable para la prueba de subir imagen
    let imageUrl = '';
    fileInput.onchange = respuestaCambioImagen => {
        console.log(respuestaCambioImagen);
        console.log(respuestaCambioImagen)
        let file = respuestaCambioImagen.target.files[0]
        firebase.storage().ref("devpost").child(file.name).put(file)
            .then(snap => { //¿Donde esta el archivo? En file.name
                return snap.ref.getDownloadURL() //conseguir el link de la imagen. Retornas la promesa y concatenas el otro then
            })
            .then(link => {
                imageUrl = link
                let img = document.createElement('img');
                img.src = imageUrl;
                document.body.appendChild(img)
                document.getElementById("showComment").appendChild(img); //aquí va  el preview de mi imagen antes de dar click en publicar
            })
    }

    let publicPost = document.getElementById('publish');
    publicPost.onclick = function() {
        let text = document.getElementById('userCommit'); //variable con id en donde se pintaran los post, textArea
        // traer el texto
        console.log(user);
        let post = {
            texto: text.value,
            user: user.displayName,
            date: new Date(),
            img: imageUrl, //variable global, aqui se almacena la imagen cuando ya se tiene el link que envio la funcion onchange
            mail: user.email,
            photo: user.photoURL,
            uid: user.uid,
        }
        addNewPost(post)
            .then(function(post) { //esto es la promesa
                alert('hello') //este es el resultado de la promesa
            })
            .then(function() {
                text.value = "";
            })
            .catch(err => {
                console.log(err) //esto es el error cuando la respuesta es negativa
            })

    }

}

//pasar a la funcion el objeto que se encuentra en la base de datos de firebase
function addNewPost(post) {
    console.log(post)
    let postsRef = db.collection('probando render 2') //se llama post porque asi se llama nuestra coleccion en Database , le podemos llamar como queramos
    return postsRef.add(post);
}

//leer coleccion de post
//AQUIII ESTAN LAS FUNCIONES DE EDITAR Y BORRAR POST EN COMENT.JS HICIMOS LOS CAMBIOS QUE TIENEN QUE VER CON ESTO
function readPosts() {
    var EmailCortado = 'No hay email';
    let postsRef = db.collection('probando render 2') //se llama post porque asi se llama nuestra coleccion en Database , le podemos llamar como queramos     
    postsRef.orderBy('date', 'desc').onSnapshot(snap => {
        let publishPust = document.querySelector('#showComment')
        publishPust.innerHTML = ''
        snap.forEach(doc => {
            if (typeof doc.data().mail != 'undefined') {
                var email = doc.data().mail;
                var divisiones = email.split("@");
                EmailCortado = divisiones[0];
            } //mi condicion    si, si está ponlo  si no está pon el mail
            var nombre = doc.data().user ? doc.data().user : EmailCortado;
            var image = doc.data().photo ? doc.data().photo : "images/profile-picture-green.jpg";
            let div = buildComent(image, nombre, doc.data().img, doc.data().texto, doc.id);
            let nodo = document.createElement('div')
            nodo.innerHTML = div;
            publishPust.appendChild(nodo);

        })
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
            direction: 'right',
            hoverEnabled: false
        });

        let deleteComments = document.querySelectorAll('.deletePostUser');

        deleteComments.forEach(function(deleteComment) {
            deleteComment.addEventListener('click', function(clickedPoints) {
                console.log(clickedPoints.target.dataset.id);
                db.collection('probando render 2').doc(clickedPoints.target.dataset.id).delete()
                    .then(function() {
                        alert('Post borrado exitosamente'); //AQUI VA LA COLECCION QUE TENGAS TU
                    }).catch(function(error) {
                        alert('Error removing post: ', error);
                    });
            });
        });

        var editComments = document.querySelectorAll('.editPostUser'); //vendría siendo editPostUser= a la clase del boton del icono editar
        editComments.forEach(function(editComment) {
            editComment.addEventListener('click', function(clickedPencil) {
                // console.log(clickedPoints.target.dataset.id);
                var postForEdition = db.collection("probando render 2").doc(clickedPencil.target.dataset.id); //AQUI VA LA COLECCION QUE TENGAS TU
                // console.log(clickedPoints.target.dataset.id)

                let publicEditPost = document.querySelector('#newPostPublish-' + clickedPencil.target.dataset.id); //este es el id del boton de checkado 
                var box = document.querySelector('.editTextPostUser-' + clickedPencil.target.dataset.id); //mi textarea
                box.style.display = 'block'; //estoy incando que cuando el usuario le de click al boton de editar se muestre la texarea
                var buttonCheck = document.querySelector('.publicationedit-' + clickedPencil.target.dataset.id); //es donde tengo los botones de la nueva foto y del check
                buttonCheck.style.display = 'block';

                let fileEdit = document.querySelector('#newEditPost-' + clickedPencil.target.dataset.id); //variable para la prueba de subir imagen
                let imageUrl = '';
                fileEdit.onchange = answerChangeImage => {
                    console.log(answerChangeImage);

                    let editedFile = answerChangeImage.target.files[0]
                    firebase.storage().ref("devpost").child(editedFile.name).put(editedFile)
                        .then(snap => {
                            return snap.ref.getDownloadURL() //conseguir el link de la imagen. Retornas la promesa y concatenas el otro then
                        })
                        .then(link => {
                            imageUrl = link
                            let img = document.createElement('img');
                            img.src = imageUrl;
                            document.body.appendChild(img)
                            document.getElementById("showComment").appendChild(img); //aquí va  el preview de mi imagen antes de dar click en publicar
                        })
                }

                publicEditPost.onclick = function() {

                    return postForEdition.update({
                            texto: box.value,
                            img: imageUrl,

                        })
                        .then(function() {
                            console.log("Document successfully updated!");
                        })
                        .catch(function(error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                }



            });
        });
    });
}

function clickMenus(obtainingPersistenceData) {
    var nameMenus = document.querySelectorAll('ul.clickMenu li a'); //Dentro de mi variable voy a meterme dentro del a que es donde tengo c.u de los nombres de mi navbar
    nameMenus.forEach(function(viewMenus) { //en una nueva variable hago un forEach con un parámetro dentro de la función 
        viewMenus.addEventListener('click', function(clickedMenu) { //llamo el parámetro en este caso es (viewMenus)en  el cual en el addEventListener le digo que escuche el click con una función a la que le pongo también un parámetro por nombre (clickedMenu)
            clickedMenu.preventDefault();
            var userClickMenu = clickedMenu.target.dataset.nav; //creo una nueva variable que va a ser igual al parámetro anterior (clickedMenu) en donde con target.dataset estaría llamando a data-nav que declaré en mi html
            if (userClickMenu == "/Foro") { //aquí en mi if le coloco la condición en donde si le doy click a foro me lleve a ver el foro y así sucesivamente
                viewForum(obtainingPersistenceData)
                    .then(function() {
                        publicPost();
                        readPosts();
                    });
                window.history.pushState('Foro', 'Foro', '/Foro')
            } else if (userClickMenu == "/Perfil") {
                viewProfile(obtainingPersistenceData);
                window.history.pushState('perfil', 'Perfil', '/Perfil');
            } else if (userClickMenu == "/editarPerfil") {
                editionOfProfile(obtainingPersistenceData)
                    .then(function() {
                        editProfileUser(obtainingPersistenceData);
                    })

                window.history.pushState('Editar Perfil', 'Editar Perfil', '/EditarPerfil');
            } else if (userClickMenu == "/cerrarSesion") {
                out();
            }
        })
    });
}

function editProfileUser(user) {
    var savesChanges = document.getElementById('saveChangesButton');
    savesChanges.addEventListener('click', function() {
        // console.log('funcionando');
        var callName = document.querySelector('#changeName');
        var callProfession = document.querySelector('#changeProfession');
        // console.log(callProfession.value);

        let editDataProfile = {
            user: callName,
            job: callProfession,
            // photo: user.photoURL,
            uid: user.uid,
        }

        addInformationProfileEdit(editDataProfile)
            .then(function() { //esto es la promesa
                alert('se guardaron los datos') //este es el resultado de la promesa
            })
            .catch(err => {
                console.log(err) //esto es el error cuando la respuesta es negativa
            })




    });
}

function addInformationProfileEdit(editDataProfile) {
    console.log(editDataProfile);
    let postsRef = db.collection('probandoEditarPerfil') //se llama post porque asi se llama nuestra coleccion en Database , le podemos llamar como queramos
    return postsRef.add(editDataProfile);
}









// var buttonDelete = document.querySelector('#deleteButton');
// buttonDelete.addEventListener('click', function (e) {
//     e.preventDefault();
//DeletePosts();
// }

// function DeletePosts() {
//     doc(id).update({ cosaQueCambio: true })
// }












/*necesitan el id
que llegue como parametro a DeletePost
con ese id hacen un doc(id).update({cosaQueCambio:true})*/
//}























// function editPost() {
// TODO: Get posts from collection to update on firebase

// TODO: Edit coment and save it on firebase

// TODO: render data on screen

/*necesitan el id
que llegue como parametro a editPost
con ese id hacen un doc(id).update({cosaQueCambio:true})*/
//}