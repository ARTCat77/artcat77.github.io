// Установка констант

const leftMenu = document.querySelector('.left-menu');
const menuHamburger = document.querySelector('.hamburger');
const tvCard = document.querySelectorAll('.tv-card__img');

// Меню
// Открытие <-> закрытие меню
menuHamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    menuHamburger.classList.toggle('open');
})

document.addEventListener('click', event => {
    if (!event.target.closest('.left-menu')) {
        // console.log('not menu');
        leftMenu.classList.remove('openMenu');
        menuHamburger.classList.remove('open');
    } else {
        // console.log(event.target);
    }
})

leftMenu.addEventListener('click', event => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        menuHamburger.classList.add('open');
    }
})

//Смена картинки на карточке при наведении
for (let i = 0; i < tvCard.length; i++) {
    let imgSrc = tvCard[i].src;
    let imgChng = tvCard[i].getAttribute('data-backdrop');
    tvCard[i].addEventListener('mouseover', event => {
        tvCard[i].src = imgChng;
    });
    tvCard[i].addEventListener('mouseout', event => {
        tvCard[i].src = imgSrc;
    });
}



