const addBtn = document.querySelector("#new-toy-btn")
const toyForm = document.querySelector(".container")
const form = document.querySelector(".add-toy-form")
let addToy = false

document.addEventListener("DOMContentLoaded", () => {
    getToys()
    form.addEventListener("submit", createToy)
})

function getToys() {
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(res => 
        {res.forEach(toy => displayToy(toy))
    })
}

function createToy(e) {
    e.preventDefault()
    const name = document.getElementById("input-name")
    const image = document.getElementById("input-image")
    let newToy = {"name": name.value, "image": image.value, "likes": 0}
    createNewToy(newToy)
}

function createNewToy(newToy) {
    fetch("http://localhost:3000/toys", {
       method: "POST",
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(newToy)
     }).then(resp => resp.json())
     .then(displayToy)
     .then(form.reset())
}

function displayToy(toy) {
    const toyCollection = document.getElementById("toy-collection")
    const div = document.createElement("div")
    div.className = "card"

    const h2 = document.createElement("h2")
    h2.innerText = toy.name

    const img = document.createElement("img")
    img.className = "toy-avatar"
    img.src = toy.image

    const p = document.createElement("p")
    p.innerText = toy.likes

    const likeButton = document.createElement("button")
    likeButton.class = "like-btn"
    likeButton.innerText = "Like <3"
        likeButton.addEventListener("click", () => {
            p.innerText = parseInt(p.innerText) + 1
        fetch(`http://localhost:3000/toys/${toy.id}`,{
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({likes: p.innerText})
        })
    })
    toyCollection.append(div)

    div.append(h2, img, p, likeButton)
}

addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = "block"
    } else {
      toyForm.style.display = "none"
    }
})























// const addBtn = document.querySelector("#new-toy-btn")
// const toyForm = document.querySelector(".container")
// const form = document.querySelector(".add-toy-form")
// let addToy = false
// document.addEventListener("click", handleClickEvents)

// function handleClickEvents(e){
//   if (e.target.className === "like-btn") {
//     let span = e.target.parentElement.children[2].children[0]
//     span.innerText = parseInt(span.innerText)+1

//     fetch(`http://localhost:3000/toys/${e.target.parentElement.dataset.id}`, {
//       method: "PATCH",
//       headers: {"Content-Type":"application/json"},
//       body: JSON.stringify({likes: span.innerText})
//     })
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   getToys()
//   toyForm.addEventListener("submit", addNewToy)
// })

// function getToys() {
//   fetch("http://localhost:3000/toys")
//   .then(res => res.json())
//   .then(res => {
//     res.forEach(toy => displayToy(toy))
//   })
// }

// function displayToy(toy) {
//   document.querySelector("#toy-collection").innerHTML +=
//     `<div data-id="${toy.id}"class="card">
//       <h2>${toy.name}</h2>
//       <img src=${toy.image} class="toy-avatar" />
//       <p><span>${toy.likes}</span> Likes</p>
//       <button class="like-btn">Like <3</button>
//     </div>`
// }

// function addNewToy(e) {
//   e.preventDefault()
//   fetch(`http://localhost:3000/toys`, {
//     method: "POST",
//     headers: {"Content-Type":"application/json"},
//     body: JSON.stringify({name: e.target.name.value,
//       image: e.target.image.value,
//       likes: 0})
//   })
//   .then(resp => resp.json())
//   .then(displayToy)
//   .then(form.reset())
// }

