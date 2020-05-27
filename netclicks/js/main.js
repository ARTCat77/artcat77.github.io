
// Установка констант
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
    API_KEY = 'Уже получил на сайте TMDB',
    leftMenu = document.querySelector('.left-menu'),
    menuHamburger = document.querySelector('.hamburger'),
    tvShowsList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal');

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
    // console.log(response);
    tvShowsList.textContent = '';

    response.results.forEach(item => {
        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote
        } = item;

        const posterImg = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        const backImg = backdrop ? IMG_URL + backdrop : '';
        const voteValue = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

        const card = document.createElement('li');
        card.className = 'tv-shows__item';
        card.innerHTML = `
        <a href="#" class="tv-card">
        ${voteValue}
        <img class="tv-card__img"
            src="${posterImg}"
            data-backdrop="${backImg}"
            alt="${title}">
        <h4 class="tv-card__head">${title}</h4>
        </a>
        `;
        tvShowsList.append(card);

        // console.log(card);
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

// Смена картинки на карточке при наведении (моя функция)
// for (let i = 0; i < tvCard.length; i++) {
//     let imgSrc = tvCard[i].src;
//     let imgChng = tvCard[i].getAttribute('data-backdrop');
//     tvCard[i].addEventListener('mouseover', event => {
//         tvCard[i].src = imgChng;
//     });
//     tvCard[i].addEventListener('mouseout', event => {
//         tvCard[i].src = imgSrc;
//     });
// } 
const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if (card) {
        tvCard = card.querySelector('.tv-card__img');
        if (tvCard.dataset.backdrop) {
            [tvCard.src, tvCard.dataset.backdrop] = [tvCard.dataset.backdrop, tvCard.src];
        }
    }
}

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);
// ! Смена картинки на карточке при наведении

// Модальное окно
tvShowsList.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }

})

modal.addEventListener('click', event => {
    if (event.target.closest('.cross') ||
        event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
}) // ! Модальное окно

