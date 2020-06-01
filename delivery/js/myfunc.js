'use strict';

const btnCart = document.querySelector('#cart-button'),
  modal = document.querySelector('.modal'),
  btnClose = document.querySelector('.close'),
  btnCloseAuth = document.querySelector('.close-auth'),
  modalAuth = document.querySelector('.modal-auth'),
  btnAuth = document.querySelector('.button-auth'),
  btnOut = document.querySelector('.button-out'),
  loginForm = document.querySelector('#logInForm'),
  loginInput = document.querySelector('#login'),
  userName = document.querySelector('.user-name'),
  contPromo = document.querySelector('.container-promo'),
  contRestaurants = document.querySelector('.restaurants'),
  cardsRestaurants = document.querySelector('.cards-restaurants'),
  menu = document.querySelector('.menu'),
  logo = document.querySelector('.logo'),
  cardsMenu = document.querySelector('.cards-menu'),
  modalBody = document.querySelector('.modal-body'),
  modalPricetag = document.querySelector('.modal-pricetag'),
  clearCart = document.querySelector('#clear-cart');

let login = localStorage.getItem('deliveryJS');

const cart = [];

const getData = async function (url) {
  const responce = await fetch(url);
  console.log(responce.json);

  if (responce.ok) {
    return responce.json();
  } else {
    throw new Error(`Не удалось получить данные по адресу ${url}, статус: ошибка ${responce.status}`);
  }
};

function toggleModal() {
  modal.classList.toggle('is-open');
}

// Day 1

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}
function returnMain() {

}

function authorized() {

  function logOut(event) {
    login = null;
    localStorage.removeItem('deliveryJS');
    btnAuth.style.display = 'block';
    // btnCart.style.display = 'initial';
    btnOut.style.display = '';
    userName.style.display = '';
    userName.textContent = login;
    btnCart.style.display = '';
    btnOut.removeEventListener('click', logOut);
    checkAuth();
    returnMain();
  }

  btnAuth.style.display = 'none';
  btnCart.style.display = 'flex';
  btnOut.style.display = 'flex';
  userName.style.display = 'flex';
  userName.textContent = login;

  btnOut.addEventListener('click', logOut);
}

function notAuthorized() {

  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;

    localStorage.setItem('deliveryJS', login);

    toggleModalAuth();
    btnAuth.removeEventListener('click', toggleModalAuth);
    btnCloseAuth.removeEventListener('click', toggleModalAuth);
    loginForm.removeEventListener('submit', logIn);
    loginForm.reset();
    checkAuth();
  }

  btnAuth.addEventListener('click', toggleModalAuth);
  btnCloseAuth.addEventListener('click', toggleModalAuth);
  loginForm.addEventListener('submit', logIn);
}

// Day 2

function createCard(restaurant) {
  // console.log(restaurant);

  const {
    name,
    time_of_delivery: delivery,
    stars,
    price,
    kitchen,
    image,
    products
  } = restaurant;

  const card = `
          <a class="card card-restaurant wow fadeInLeft" data-wow-duration="2s"
            data-wow-delay="0.4s" data-products="${products}">
            <img src="${image}" alt="${name}" class="card-image">
            <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title">${name}</h3>
                <span class="card-tag tag">${delivery} мин.</span>
              </div>
              <div class="card-info">
                <div class="rating">
                  <img src="img/rating.svg" alt="rating" class="rating-pic">
                  ${stars}
                </div>
                <div class="price">От ${price} ₸</div>
                <div class="category">${kitchen}</div>
              </div>
            </div>
          </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createMenuCard(products) {

  const {
    id,
    name,
    description,
    price,
    image
  } = products;

  const card = document.createElement('div');
  card.className = 'card';
  card.id = id;

  card.insertAdjacentHTML('beforeend', `
            <img src="${image}" alt="${name}" class="card-image"> 
            <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title card-title__reg">${name}</h3>
              </div>
              <div class="card-info">
                <div class="ingredients">${description}</div>
              </div>
              <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                  <span class="button-card-text">В корзину</span>
                  <img src="img/shopping-cart-white.svg" alt="" class="button-cart-image">
                </button>
                <strong class="card-price card-price-bold">${price} ₸</strong>
              </div>
            </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);

}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');

  if (restaurant) {
    cardsMenu.textContent = '';

    contPromo.classList.add('hide');
    contRestaurants.classList.add('hide');
    menu.classList.remove('hide');
    getData(`db/${restaurant.dataset.products}`).then(function (data) {
      data.forEach(createMenuCard);
    })
  }
}

function addToCart(event) {

  const target = event.target;
  const buttonAddToCart = target.closest('.button-add-cart');
  if (buttonAddToCart) {
    const card = target.closest('.card');
    const title = card.querySelector('.card-title__reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const id = card.id;

    const food = cart.find(function (item) {
      return item.id === id;
    })

    if (food) {
      food.count += 1;
    } else {
      cart.push({
        id,
        title,
        cost,
        count: 1
      })
    }
  }
}

function renderCart() {
  modalBody.textContent = '';
  cart.forEach(function ({ id, title, cost, count }) {
    const itemCart = `
    <div class="food-row">
          <span class="food-name">${title}</span>
          <strong class="food-price">${cost}</strong>
          <div class="food-counter">
            <button class="counter-button counter-minus" data-id="${id}">-</button>
            <span class="counter" >${count}</span>
            <button class="counter-button counter-plus" data-id="${id}">+</button>
          </div>
        </div>
    `;

    modalBody.insertAdjacentHTML('afterbegin', itemCart);
  })
  const totalPrice = cart.reduce(function (result, item) {
    return result + (parseFloat(item.cost)) * item.count;
  }, 0);

  modalPricetag.textContent = totalPrice + ' ₸';
}

function changeCount(event) {
  const target = event.target;

  if (target.classList.contains('counter-button')) {
    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    });
    if (target.classList.contains('counter-minus')) {
      food.count--;
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1);
      }
    }
    if (target.classList.contains('counter-plus')) food.count++;
    renderCart();
  }
}

function init() {
  getData('db/partners.json').then(function (data) {
    data.forEach(createCard);
  });

  logo.addEventListener('click', event => {
    contPromo.classList.remove('hide');
    contRestaurants.classList.remove('hide');
    menu.classList.add('hide');
  });

  checkAuth();

  btnCart.addEventListener('click', function () {
    renderCart();
    toggleModal();
  });

  modalBody.addEventListener('click', changeCount);

  clearCart.addEventListener('click', function () {
    cart.length = 0;
    renderCart();
  });

  btnClose.addEventListener('click', toggleModal);
  cardsMenu.addEventListener('click', addToCart);
  cardsRestaurants.addEventListener('click', openGoods);

  new WOW().init();
}
init();