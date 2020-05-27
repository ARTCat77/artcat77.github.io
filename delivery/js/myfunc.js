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

  btnCancel = document.querySelector('#close');

let login = localStorage.getItem('deliveryJS');

btnCart.addEventListener('click', toggleModal);
btnCancel.addEventListener('click', toggleModal);
btnClose.addEventListener('click', toggleModal);

function toggleModal() {
  modal.classList.toggle('is-open');
}

new WOW().init();

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