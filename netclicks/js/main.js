
// Установка констант
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
    SERVER = 'https://api.themoviedb.org/3',
    ON_AIR_TODAY = 'https://api.themoviedb.org/3/tv',
    API_KEY = '2abce81a8d2a7a5209f37ab50ae265b6',
    leftMenu = document.querySelector('.left-menu'),
    menuHamburger = document.querySelector('.hamburger'),
    tvShowsList = document.querySelector('.tv-shows__list'),
    tvShows = document.querySelector('.tv-shows'),
    tvCardImg = document.querySelector('.tv-card__img'),
    modalTitle = document.querySelector('.modal__title'),
    genresList = document.querySelector('.genres-list'),
    rating = document.querySelector('.rating'),
    description = document.querySelector('.description'),
    modalLink = document.querySelector('.modal__link'),
    searchForm = document.querySelector('.search__form'),
    searchFormInput = document.querySelector('.search__form-input'),
    tvShowsHead = document.querySelector('.tv-shows__head'),
    titleWrapper = document.querySelector('.title-wrapper'),
    returnIndex = document.querySelector('.return-index'),
    // more = document.querySelector('.more'),
    preloader = document.querySelector('.preloader'),
    dropdown = document.querySelectorAll('.dropdown'),
    pagination = document.querySelector('.pagination'),
    modal = document.querySelector('.modal');

let tvShowsHeader = 'Сегодня в эфире'; // заголовок для индексной строницы
// Прелоадер
const loading = document.createElement('div');
loading.className = 'loading';
// ! Прелоадер

// Класс для создания карточек
class DBService {
    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Не удалось получить данные по адресу ${url}`);
        }
    }

    getLatest = () => {
        return this.getData(`${ON_AIR_TODAY}/latest?api_key=${API_KEY}&language=ru-Ru`);
    }

    onAirToday = () => {
        return this.getData(`${ON_AIR_TODAY}/airing_today?api_key=${API_KEY}&language=ru-RU`);
    }
    getRated = () => {
        return this.getData(`${ON_AIR_TODAY}/top_rated?api_key=${API_KEY}&language=ru-Ru`);
    }
    getPopular = () => {
        return this.getData(`${ON_AIR_TODAY}/popular?api_key=${API_KEY}&language=ru-Ru`);
    }
    onAirWeek = () => {
        return this.getData(`${ON_AIR_TODAY}/on_the_air?api_key=${API_KEY}&language=ru-Ru`);
    }

    getSearchResult = query => {
        return this.getData(`${SERVER}/search/tv?api_key=${API_KEY}&query=${query}&language=ru-RU`);
    }

    getTvShow = id => {
        return this.getData(`${ON_AIR_TODAY}/${id}?api_key=${API_KEY}&language=ru-RU`);
    }
}

// console.log(new DBService().getSearchResult('Няня'));

// Рендеринг карточек
const renderCard = (response, target) => {
    console.log(response);

    // if (response.total_pages != 1 && response.total_pages != 0) {
    //     more.classList.remove('hide');
    // } else {
    //     more.classList.add('hide');
    // }
    returnIndex.classList.add('hide');
    tvShowsList.textContent = '';
    if (response.total_results) {
        tvShowsHead.textContent = `${target}: ${response.total_results}`;
    } else {
        tvShowsHead.textContent += `: По вашему запросу ни чего не найдено :(`;
        returnIndex.classList.remove('hide');
        loading.remove();
    }

    response.results.forEach(item => {
        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote,
            id
        } = item;

        const posterImg = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        const noPosterImg = !poster ? 'id = "no-poster"' : '';
        const backImg = backdrop ? IMG_URL + backdrop : '';
        const voteValue = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

        const card = document.createElement('li');
        card.idTv = id;
        card.className = 'tv-shows__item';
        card.innerHTML = `
        <a href="#" id="${id}" class="tv-card">
        ${voteValue}
        <img class="tv-card__img"
        ${noPosterImg}
            src="${posterImg}"
            data-backdrop="${backImg}"
            alt="${title}">
        <h4 class="tv-card__head">${title}</h4>
        </a>
        `;

        loading.remove();
        tvShowsList.append(card);

        // console.log(card);
    })

    if (response.total_pages > 1) {
        for (let i = 1; i <= response.total_pages; i++) {
            pagination.innerHTML += `<li><a href="#" class="pages">${i}</a></li>`;
        }
    }
}

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    tvShowsHead.textContent = 'Результат поиска';
    const value = searchFormInput.value.trim();
    searchFormInput.value = '';
    tvShows.append(loading);
    new DBService().getSearchResult(value).then((responce) => renderCard(responce, tvShowsHead.textContent));
})

{
    tvShows.append(loading); // запуск прелоадера
}

/* функция загрузки индексной страницы
с сериалами на сегодняшний день */
const loadIndex = () => {
    tvShowsHead.textContent = tvShowsHeader;
    new DBService().onAirToday().then((responce) => renderCard(responce, tvShowsHeader));
} // ! функция загрузки индексной страницы

// ! Класс для создания карточек


// Меню
// Открытие <-> закрытие меню
const closeDropdown = () => {
    dropdown.forEach(item => {
        item.classList.remove('active');
    })
}

menuHamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    menuHamburger.classList.toggle('open');
    closeDropdown();
})

document.addEventListener('click', event => {
    if (!event.target.closest('.left-menu')) {
        // console.log('not menu');
        leftMenu.classList.remove('openMenu');
        menuHamburger.classList.remove('open');
        closeDropdown();
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

    if (target.closest('#top-rated')) {
        new DBService().getRated().then((responce) => renderCard(responce, target.textContent));
    }
    if (target.closest('#popular')) {
        new DBService().getPopular().then((responce) => renderCard(responce, target.textContent));
    }
    if (target.closest('#today')) {
        new DBService().onAirToday().then((responce) => renderCard(responce, target.textContent));
    }
    if (target.closest('#week')) {
        new DBService().onAirWeek().then((responce) => renderCard(responce, target.textContent));
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
    if (target.id.trim() != 'no-poster') {
        // console.log('Poster is present!');
        if (card) {

            preloader.style.display = 'block';

            new DBService().getTvShow(card.id)
                .then(data => {
                    // console.log(data);
                    tvCardImg.src = IMG_URL + data.poster_path;
                    modalTitle.textContent = data.name;
                    // genresList.innerhtml = data.genres.reduce((acc, item) => return `${acc}<li>${item.name}</li>`, '');
                    genresList.textContent = '';
                    for (const item of data.genres) {
                        genresList.innerHTML += `<li>${item.name}</li>`;
                    }
                    rating.textContent = data.vote_average;
                    description.textContent = data.overview;
                    modalLink.href = data.homepage;
                })
                .then(() => {
                    document.body.style.overflow = 'hidden';
                    modal.classList.remove('hide');
                })
                .finally(() => {
                    preloader.style.display = '';
                })
        }
    }
});

modal.addEventListener('click', event => {
    if (event.target.closest('.cross') ||
        event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
}) // ! Модальное окно


titleWrapper.addEventListener('click', event => {
    loadIndex();
})

returnIndex.addEventListener('click', event => {
    returnIndex.classList.add('hide');
    loadIndex();
})
loadIndex(); // запуск функции индексной страницы