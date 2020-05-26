// Меню

const leftMenu = document.querySelector('.left-menu');
const menuHamburger = document.querySelector('.hamburger');
const tvCard = document.getElementsByClassName('tv-card__img');

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
        hamburger.classList.add('open');
    }
})
// var newAddr = new Array(tvCard.length);
// for (i = 0; i < tvCard.length; i++) {
    // tvCard[i].addEventListener('mouseover', event => {
        // newAddr[i] = tvCard[i].getAttribute('data-backdrop');
        // console.log(tvCard[i].getAttribute('data-backdrop'));

        // tvCard[i].setAttribute('src', newAddr[i]);
//     })
// }

// for (i = 0; i < tvCard.length; i++) {
//     console.log(tvCard[i].getAttribute('data-backdrop'));
// }

