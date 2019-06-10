const addBtn = document.querySelector("#new-toy-btn")
const toyForm = document.querySelector(".container")
const form = document.querySelector(".add-toy-form")
let addToy = false
document.addEventListener("click", handleClickEvents)

function handleClickEvents(e){
  if (e.target.className === "like-btn") {
    let span = e.target.parentElement.children[2].children[0]
    span.innerText = parseInt(span.innerText)+1

    fetch(`http://localhost:3000/toys/${e.target.parentElement.dataset.id}`, {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({likes: span.innerText})
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  toyForm.addEventListener("submit", addNewToy)
})

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(res => {
    res.forEach(toy => displayToy(toy))
  })
}

function displayToy(toy) {
  document.querySelector("#toy-collection").innerHTML +=
    `<div data-id="${toy.id}"class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p><span>${toy.likes}</span> Likes</p>
      <button class="like-btn">Like <3</button>
    </div>`
}

function addNewToy(e) {
  e.preventDefault()
  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({name: e.target.name.value,
      image: e.target.image.value,
      likes: 0})
  })
  .then(resp => resp.json())
  .then(displayToy)
  .then(form.reset())
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