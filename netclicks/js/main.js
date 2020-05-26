
// Установка констант

const leftMenu = document.querySelector('.left-menu');
const menuHamburger = document.querySelector('.hamburger');
const tvCard = document.querySelectorAll('.tv-card__img');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');

// Класс для создания карточек
const DBService = class {
    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Не удалось получить данные по адресу ${url}`);
        }
    }
    getTestData = () => {
        return this.getData('test.json');
    }
}

const renderCard = response => {
    console.log(response);
    tvShowsList.textContent = '';

    response.results.forEach(item => {

        const card = document.createElement('li');
        card.className = 'tv-shows__item';
        card.innerHTML = `
        <a href="#" class="tv-card">
        <span class="tv-card__vote">7.4</span>
        <img class="tv-card__img"
            src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/fhV9ckyBko1ZejEEmwdiXG8YMy5.jpg"
            data-backdrop="https://image.tmdb.org/t/p/w185_and_h278_bestv2/AdJgkXb8oLI8e4rsk8XzkvABIuw.jpg"
            alt="Звёздные войны: Повстанцы">
        <h4 class="tv-card__head">Звёздные войны: Повстанцы</h4>
        </a>
        `;
        tvShowsList.append(card);

        console.log(card);
    })
}

new DBService().getTestData().then(renderCard);
// ! Класс для создания карточек

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

// Смена картинки на карточке при наведении
for (let i = 0; i < tvCard.length; i++) {
    let imgSrc = tvCard[i].src;
    let imgChng = tvCard[i].getAttribute('data-backdrop');
    tvCard[i].addEventListener('mouseover', event => {
        tvCard[i].src = imgChng;
    });
    tvCard[i].addEventListener('mouseout', event => {
        tvCard[i].src = imgSrc;
    });
} // ! Смена картинки на карточке при наведении

// Модальное окно
tvShowsList.addEventListener('click', event => {
    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }

})

modal.addEventListener('click', event => {
    if (event.target.closest('.cross') || event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
}) // ! Модальное окно

