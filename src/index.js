let addToy = false;

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
  const likeButton = document.querySelector('.like-btn')
  likeButton.addEventListener('click', function(e) {
    debugger
    likes(e)
    })
  }

  function getAllToys() {
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
  }

  getAllToys()

  document.querySelector('.add-toy-form').addEventListener('submit', handleNewToySubmit)

  function addNewToy(toy) {
    fetch("http://localhost:3000/toys",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(toys => console.log(toys))
  }

  // Create toy object from form
  function handleNewToySubmit(e) {
    e.preventDefault()
    let toyObject = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    renderOneToy(toyObject)
    addNewToy(toyObject)
  }

  function likes(e) {
    e.preventDefault()
    let moreLikes = parseInt(e.target.likeButton.innerText) + 1
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": moreLikes
      })
    })
    .then(res => res.json())
    .then(likeObj => {
      e.target.likeButton.innerText = `${moreLikes} likes`;
    })
  }
});
