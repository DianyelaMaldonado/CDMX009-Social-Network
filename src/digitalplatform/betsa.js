import { viewForum } from "../view/fuorum";

function ejecutarFirebasePosts() {
    var boton = document.getElementById("sendPostBetsa");

    boton.onclick = function() {
        let textArea = document.getElementById("textPostBetsa");
        let datos = textArea.value;
        var datosAGuardarEnFirestore = {
            body: datos,
            user: "Betsa",
            date: new Date(),
            img: 'URL Futura chingona de mi imagen',
        }
        addNewPost(datosAGuardarEnFirestore)
            .then(function() {
                alert('Ya quedó')
            })
            .then(function() {
                textArea.value = '';
            })
            .catch(function(error) {
                console.log(error)
            });

    }
}

function addNewPost(datosPost) {
    let databaseConnection = db.collection('triodinamico');
    return databaseConnection.add(datosPost);
}














viewForum()
    .then(function() {
        ejecutarFirebasePosts()
    })


viewForum()
    .then(function() {
        ejecutarFirebasePosts()
    })


viewForum()
    .then(function() {
        ejecutarFirebasePosts()
    })


// 

// let postsCommitUser = db.collection('prueba');

// boton.onclick = function() {
//     let text = document.getElementById("textPost");
//     var datosPost = {
//         body: text.value,
//         user: "Taquito",
//         date: new Date(),
//         img: 'link',
//     }
//     addNewPost(datosPost)
//         .then(function(result) {
//             alert('Post enviado!');
//         })
//         .then(function() {
//             text.value = "";
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// function addNewPost(datosPost) {
//     return postsCommitUser.add(datosPost);
// }