import { viewLogin } from './view/login.js';
import { viewRegister } from './view/register.js';
import { viewForum } from './view/fuorum.js';
import { editionOfProfile } from './view/editprofile.js';
import { viewProfile } from './view/profile.js';


document.addEventListener("DOMContentLoaded", function() {
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
            .then(function() {
                var viewRedirectionForum = document.querySelectorAll('.foro');
                console.log("Foro", viewRedirectionForum);
                viewRedirectionForum.forEach(nodo => nodo.addEventListener('click', function(e) {
                    e.preventDefault();
                    viewForum()
                    .then(function() {
                        publicPost();
                    });
                    window.history.pushState('Foro', 'Foro', '/Foro')
                }));
            }).then(function() {
                var viewRedirectionProfile = document.querySelectorAll('.perfil');
                console.log("Profile", viewRedirectionProfile);
                viewRedirectionProfile.forEach(nodo => nodo.addEventListener('click', function(e) {
                    e.preventDefault();
                    viewProfile();
                    window.history.pushState('perfil', 'Perfil', '/Perfil');
                }));
            })
            .then(function() {
                var viewRedirectionEditProfile = document.querySelectorAll('.editarPerfil');
                console.log("Foro", viewRedirectionEditProfile);
                viewRedirectionEditProfile.forEach(nodo => nodo.addEventListener('click', function(e) {
                    e.preventDefault();
                    editionOfProfile();
                    window.history.pushState('Editar Perfil', 'Editar Perfil', '/EditarPerfil');
                }));
            })
            .then(function() {
                var viewRedirectionGetOut = document.querySelectorAll('.cerrarSesion');
                console.log("cerrarSesion", viewRedirectionGetOut);
                viewRedirectionGetOut.forEach(nodo => nodo.addEventListener('click', function(e) {
                    e.preventDefault();
                    out();

                }));
            })
    })
    // por si quiero limpiar root: document.getElementById('root').innerHTML = '';

// Navegador en móvil
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte la que me hace entrar a la app (login)
function loginPageOne() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    var movilIcon = document.getElementById('movilIcon');
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((data) => {
            viewForum(data.user)//BLISS
            .then(function() {
                publicPost();
            });  
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

// **************** L O G I N     G O O G L E*******
// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte  la que me hace entrar a la app con google (google)
function googleButton() {
    // Aquí se crea una instancia del objeto del proveedor de Google y facebook
    // esta instancia es para que me redireccione a google o de facebook, es la parte que me lleva a ellos.
    var provider = new firebase.auth.GoogleAuthProvider();
    var movilIcon = document.getElementById('movilIcon');

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        viewForum(user)
        .then(function() {
            publicPost();
        });
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

// **************** L O G I N     F A C E B O O K *******

// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte  la que me hace entrar a la app con facebook (facebook)
function facebookButton() {
    var provider = new firebase.auth.FacebookAuthProvider();
    var movilIcon = document.getElementById('movilIcon');
    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            viewForum(user)
            .then(function() {
                publicPost();
            });
            movilIcon.classList.add('shown');
            document.getElementById('hideAndShow').style.display = 'block';
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
}
// ******** LOG OUT FUNCTION 
function out() {

    firebase.auth().signOut()
        .then(function() {
            document.getElementById('movilIcon').classList.toggle('shown');
            document.getElementById('hideAndShow').style.display = 'none';
        })
        .then(function() {
            viewLogin();
            window.history.pushState('cerrar sesion', 'cerrar sesion', '/');
        })
        .catch(function(error) {
            console.log(error);

        });
}

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
                // alert('Bienvenido ' + data.user.email);
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








/*************** FUNCIONALIDAD DE POSTS***************/

//listeners

/*funcion para subir archivo o archivos en el post
let fileInput = document.getElementById('myNewFile') //variable para la prueba de subir imagen
let url = ''

fileInput.onchange = e => {        
    let file = e.target.files //lleva el indice cuando se quiere subir varios archivos, si no, se quita el indice y se coloca la llave file
    let fileInput = document.getElementById('myNewFile') //variable para la prueba de subir imagen
let url = ''
    firebase.storage().ref("devpost").child(file.name).put(file)
        .then(snap => {   //¿Donde esta el archivo? En file.name
            return snap.ref.getDownloadURL() //conseguir el link de la imagen. Retornas la promesa y concatenas el otro then
        })
        .then(link => {
            url = link
            let img = document.createElement('img')
            img.src = link
            document.body.appendChild(img)
        })
}

*/


//traer la informacion del post cuando se le da clic en el boton
 function publicPost(){
    let fileInput = document.getElementById('myNewFile')
    let imageUrl = ''

    fileInput.onchange = respuestaCambioImagen => {
        let file = respuestaCambioImagen.target.files[0]       
        firebase.storage().ref("devpost").child(file.name).put(file)
            .then(snap => {   //¿Donde esta el archivo? En file.name
                return snap.ref.getDownloadURL() //conseguir el link de la imagen. Retornas la promesa y concatenas el otro then
            })
            .then(link => {
                imageUrl = link
                let img = document.createElement('img')
                img.src = imageUrl
                document.body.appendChild(img)
                document.getElementById("picturePerfect").appendChild(img);
            })
     }


    
     let publicPost = document.getElementById('publish')

     publicPost.onclick = function(){
        let text = document.getElementById('showComment')//variable con id en donde se pintaran los post, textArea
        // traer el texto
        let post = {
        texto: text.value,
        user: "spiderman",
        date: new Date(),
        img: imageUrl 
     }

     addNewPost(post)
         .then(function(post) { 
            alert('datos guardados') 
         })
         .catch(err => {
            console.log("Ocurrio un error, intenta mas tarde.", err) 
         })
     }

     
    
}

//pasar a la funcion el objeto que se encuentra en la base de datos de firebase
function addNewPost(post) { 
    let postsRef = db.collection('post') //se llama post porque asi se llama nuestra coleccion en Database 
    return postsRef.add(post)
    console.log('post')
 }

 //Obtén todos los documentos de una colección
     db.collection("post").get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
  });

//Obtén un documento
 let docRef = db.collection("post").doc("fna7W1xk1Xq2xT03FtRG");
 docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
 });


 //leer la coleccion de post
 let postsRef = db.collection('post')

 postsRef.onSnapshot(snap => {
    let p = document.getElementById('collection')
    p.innerHTML = 'collection'
    snap.forEach(doc => {
        let div = `<div>
            <img src="${doc.data().imageUrl}" /> // doc.data xq ahi esta la data
            <p>${doc.data().texto}</p>
        </div>`
        let nodo = document.createElement('div')
        nodo.innerHTML = div
        p.appendChild(nodo)
    })
})




