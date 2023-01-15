//let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

function renderOneToy(toy) {
  let card = document.createElement('li')
  card.className = 'card'
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn" id=${toy.id}>Like ❤️</button>
  `
document.querySelector('#toy-collection').appendChild(card)
}

function getAllToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
}

getAllToys()

document.querySelector('.add-toy-form').addEventListener('submit', handleNewToySubmit)

// Create toy object from form
function handleNewToySubmit(e) {
  e.preventDefault()
  let toyObject = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  renderOneToy(toyObject)
  addToy(toyObject)
}

function addToy(toy) {
  fetch("http://localhost:3000/toys",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': "application/json"
    },
    body: JSON.stringify(toy)
})
  .then(res => res.json())
  .then(toys => console.log(toys))
}

});
