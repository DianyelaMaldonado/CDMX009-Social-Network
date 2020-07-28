// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDF2PQTuDxma-jcWQTtM5CIDKOXfkrOWs8",
    authDomain: "code-dev-2c2bb.firebaseapp.com",
    databaseURL: "https://code-dev-2c2bb.firebaseio.com",
    projectId: "code-dev-2c2bb",
    storageBucket: "code-dev-2c2bb.appspot.com",
    messagingSenderId: "979122313699",
    appId: "1:979122313699:web:0d1607f19df3374ec568d6",
    measurementId: "G-Q6JXSY4BL8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore()


// var firebaseConfig = {
//     apiKey: "AIzaSyCkfImtzIXqG7KbK3b6Tu3MABA91hPqdFA",
//     authDomain: "social-network-pruebas.firebaseapp.com",
//     databaseURL: "https://social-network-pruebas.firebaseio.com",
//     projectId: "social-network-pruebas",
//     storageBucket: "social-network-pruebas.appspot.com",
//     messagingSenderId: "327573056555",
//     appId: "1:327573056555:web:38bda7ccadbd1fb70c0e6e",
//     measurementId: "G-ZLRFD83MS0"
// };