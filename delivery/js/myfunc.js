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
  btnCancel = document.querySelector('#close');

let login = localStorage.getItem('deliveryJS');

const getData = async function (url) {
  const responce = await fetch(url);
  console.log(responce.json);

  if (responce.ok) {
    return responce.json();
  } else {
    throw new Error(`Не удалось получить данные по адресу ${url}, статус: ошибка ${responce.status}`);
  }
};

getData('db/partners.json');

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
checkAuth();

function authorized() {

  function logOut(event) {
    login = null;
    localStorage.removeItem('deliveryJS');
    btnAuth.style.display = 'block';
    // btnCart.style.display = 'initial';
    btnOut.style.display = '';
    userName.style.display = '';
    userName.textContent = login;
    btnOut.removeEventListener('click', logOut);

    checkAuth();
  }

  btnAuth.style.display = 'none';
  // btnCart.style.display = 'initial';
  btnOut.style.display = 'initial';
  userName.style.display = 'inline';
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

function createCard() {

  const card = `
          <a class="card card-restaurant wow fadeInLeft" data-wow-duration="2s"
            data-wow-delay="0.4s">
            <img src="img/catalog/c1.jpg" alt="" class="card-image">
            <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title">Пицца плюс</h3>
                <span class="card-tag tag">50 мин.</span>
              </div>
              <div class="card-info">
                <div class="rating">
                  <img src="img/rating.svg" alt="rating" class="rating-pic">
                  4.5
                </div>
                <div class="price">От 900 ₸</div>
                <div class="category">Пицца</div>
              </div>
            </div>
          </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createMenuCard() {
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
            <img src="img/pizza-plus/pizza-classic.jpg" alt="Пицца Классика"    class="card-image"> 
            <div class="card-text">
              <div class="card-heading">
                <h3 class="card-title">Пицца Классика</h3>
              </div>
              <div class="card-info">
                <div class="ingredients">
                  Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями, грибы.
                </div>
              </div>
              <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                  <span class="button-card-text">В корзину</span>
                  <img src="img/shopping-cart-white.svg" alt="" class="button-cart-image">
                </button>
                <strong class="card-price-bold">900 ₸</strong>
              </div>
            </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);

}

function openGoods(event) {
  const target = event.target;

  const restaurant = target.closest('.card-restaurant');
  console.log(restaurant);

  if (restaurant) {
    cardsMenu.textContent = '';

    contPromo.classList.add('hide');
    contRestaurants.classList.add('hide');
    menu.classList.remove('hide');

    createMenuCard();
    createMenuCard();
    createMenuCard();
    createMenuCard();
    createMenuCard();
    createMenuCard();
    createMenuCard();
    createMenuCard();
  }

}

logo.addEventListener('click', event => {
  contPromo.classList.remove('hide');
  contRestaurants.classList.remove('hide');
  menu.classList.add('hide');
})

btnCart.addEventListener('click', toggleModal);
btnCancel.addEventListener('click', toggleModal);
btnClose.addEventListener('click', toggleModal);
cardsRestaurants.addEventListener('click', openGoods);

createCard();
createCard();
createCard();
createCard();
createCard();
createCard();
new WOW().init();