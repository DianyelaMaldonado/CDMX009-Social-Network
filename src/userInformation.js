//POST

let addBtn = document.querySelector('#myCommit')
let text = document.querySelector('#showComment')
let fileInput = document.querySelector('#file') //variable para la prueba de subir imagen

//global
let url // variable para que reciba el link(token) de la foto que esta en storage

//listeners

//funcion para subir archivo o archivos en el post
fileInput.onchange = e => {        
    let file = e.target.files[0]  
    firebase.storage().ref("memes").child(file.name).put(file)
        .then(snap => {   //¿Donde esta el archivo? En file.name
            return snap.ref.getDownloadURL()
        })
        .then(link => {
            url = link
            let img = document.createElement('img')
            img.src = link
            document.body.appendChild(img)
        })
}

addBtn.onclick = event => {
    // traer el texto
    let post = {
        body: text.value,
        user: "spiderman",
        date: new Date(),
        img: url
    }
    //  [ASINCRONO] 

    addNewPost(post)
        // ESto es asíncrono
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log("todo valió baby: ", err)
        })
}

// firebase

let db = firebase.firestore() // YOLO
let postsRef = db.collection('posts')

function addMyNewPost(post = { user: "spiderman", texto: "mira que bonita foto", date: Date.now() }) {
    return postsRef.add(post)
}

// 
postsRef.onSnapshot(snap => {
    let p = document.querySelector('#posts')
    p.innerHTML = ''
    snap.forEach(doc => {
        let div = `<div>
            <img src="${doc.data().foto}" />
            <p>${doc.data().texto}</p>
        </div>`
        let nodo = document.createElement('div')
        nodo.innerHTML = div
        p.appendChild(nodo)

    })
})