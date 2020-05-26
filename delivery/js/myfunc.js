const btnCart = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const btnClose = document.querySelector('.close');
const btnCancel = document.querySelector('#close');

btnCart.addEventListener('click', toggleModal);
btnCancel.addEventListener('click', toggleModal);
btnClose.addEventListener('click', toggleModal);

function toggleModal() {
  modal.classList.toggle('is-open');
}