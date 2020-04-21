import { viewLogin } from './view/login.js';
import { viewRegister } from './view/register.js';
import { viewForum } from './view/fuorum.js'
import { editionOfProfile } from './view/editprofile.js'
import { viewProfile } from './view/profile.js'

let data;



document.addEventListener("DOMContentLoaded", function() {
    viewLogin()
        .then(function() {
            // En esta parte creo una variable en donde voy a llamar a mi id al que quiero darle el click en este caso el login
            
            var buttonLogin = document.querySelector('#doLogin');
            buttonLogin.addEventListener('click', function(e) {
                e.preventDefault();
                loginPageOne();               
            });

        })
        .then(function() {
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
            });
        })
        .then(function() {
            var ntAccount = document.getElementById('reg');
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
            var viewRedirectionForum = document.getElementById('/Foro');
            viewRedirectionForum.addEventListener('click', function(e) {
                e.preventDefault();
                viewForum(user.data);
                window.history.pushState('Foro', 'Foro', '/Foro')
            });
        }).then(function() {
            var viewRedirectionProfile = document.getElementById('/Perfil');
            viewRedirectionProfile.addEventListener('click', function(e) {
                e.preventDefault();
                viewProfile(data.user);
                window.history.pushState('perfil', 'Perfil', '/Perfil');
            });
        })
        .then(function() {
            var viewRedirectionEditProfile = document.getElementById('/editarPerfil');
            viewRedirectionEditProfile.addEventListener('click', function(e) {
                e.preventDefault();
                editionOfProfile(user.data);
                window.history.pushState('Editar Perfil', 'Editar Perfil', '/editarPerfil');
            });
        })

});

// por si quiero limpiar root: document.getElementById('root').innerHTML = '';

// Navegador en móvil

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

// let currentRoute = "/"
// let navegationsButtons = document.querySelectorAll('.colorMenu');

// navegationsButtons.forEach(colorMenu => colorMenu.onclick = e => router(e.target.id))



// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte  la que me hace entrar a la app (login)
function loginPageOne() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((data) => {
            viewForum(data.user); //BLISSS

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

    var cred = firebase.auth.EmailAuthProvider.credential(
        email,
        pass
    );
}

// **************** L O G I N     G O O G L E*******


// En esta parte hago la funcion que va tener mi boton al hacer click
// en entar a la aplicación en esta parte  la que me hace entrar a la app con google (google)
function googleButton() {
    // Aquí se crea una instancia del objeto del proveedor de Google y facebook
    // esta instancia es para que me redireccione a google o de facebook, es la parte que me lleva a ellos.
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        viewForum();


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
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        alert('bienvenido');

        // ...
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

var getOut = document.querySelector('#signOut');
getOut.addEventListener('click', function(e) {
    e.preventDefault();
    out();
});

function out() {
    firebase.auth().signOut()
        .then(function() {
            viewLogin();
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


    if (registerPassLogin2 != registerConfirmPassLogin2) {
        alert('Las contraseñas deben coincidir');
    } else {

        firebase.auth().createUserWithEmailAndPassword(registerEmailLogin2, registerPassLogin2)
            .then((data) => {
                // alert('Bienvenido ' + data.user.email);
                viewForum(data.user); //SE MUESTRA EN FORO DESDE REGISTRO
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



function hideAndShow(hide) {
    document.getElementById(hide).style.display = 'none';

}

function show(show) {
    document.getElementById(show).style.display = 'block';
}