$(document).ready(function () {
    const language = document.querySelector('.social-icons'),
        kz = document.querySelector('#menu-kz'),
        ru = document.querySelector('#menu-ru'),
        modal = document.querySelector('#modal'),
        modalBody = document.querySelector('.modal-body'),
        modalPrice = document.querySelector('.modal-pricetag'),
        modalOverlay = document.querySelector('#modal-overlay'),
        phone = document.querySelector('#phone'),
        policy = document.querySelector('#policy'),
        tradeMark = document.querySelector('#tm'),
        mcTitle = document.querySelector('#mc-title'),
        mcTitle2 = document.querySelector('#mc-title2'),
        closeButton = document.querySelector('#close-button'),
        btnCancel = document.querySelector('#close'),
        openCart2 = document.querySelector('#open-cart-2'),
        contactsKz = document.querySelector('#contacts-kz'),
        contactsRu = document.querySelector('#contacts-ru'),
        aboutKz = document.querySelector('#about-kz'),
        aboutRu = document.querySelector('#about-ru'),
        serviceKz = document.querySelector('#service-kz'),
        serviceRu = document.querySelector('#service-ru'),
        openCart = document.querySelector('#open-cart');

    const cart = [];
    const pageData = {
        siteTitle: 'Unicom',
        mainPage: 'index',
        phoneK: 'Қоңырау шалу:<span>+7(747)271-82-88</span>',
        phoneR: 'Звонок:<span>+7(747)271-82-88</span>',
        tmK: 'ЖШС &laquo;Unicom Outsourcing&raquo;',
        tmR: 'ТОО &laquo;Unicom Outsourcing&raquo;',
        policyK: 'Дербес деректерді өңдеу туралы келісім',
        policyR: 'Соглашение об обработке персональных данных',
        pages: {
            index: {
                titleKz: 'Басты бет',
                titleRu: 'Главная',
                mcTitleK: 'ӨНДІРУШІЛЕР',
                mcTitleR: 'Производители',
                mcTitleK2: '<span>Біздің</span> клиенттеріміздің пікірлері',
                mcTitleR2: '<span>Отзывы</span> наших клиентов'
            },
            service: {
                titleKz: 'Shop',
                titleRu: 'Shop',
                mcTitleK: '<span>Жөндеу</span> қызметі',
                mcTitleR: '<span>Услуги</span> ремонта'
            },
            shop: {
                titleKz: 'Жөндеу қызметі',
                titleRu: 'Услуги ремонта',
                mcTitleK: '<span>Жөндеу</span> қызметі',
                mcTitleR: '<span>Услуги</span> ремонта'
            },
            contacts: {
                titleKz: 'Бізбен байланысу',
                titleRu: 'Контакты',
                mcTitleK: '<span>Байланыс</span> ақпараты',
                mcTitleR: '<span>Контактная</span> информация'
            },
            about: {
                titleKz: 'Кәсіпорын жайлы',
                titleRu: 'О компании',
                mcTitleK: '<span>Кәсіпорын</span> жайлы',
                mcTitleR: '<span>О</span> компании'
            }
        }
    };
    console.log(pageData);

    let page = document.location.pathname;
    console.log('page: ', page);
    let lng = document.location.search.substring(1);
    if (!lng) lng = 'kz';
    console.log(lng);

    changeLanguage();

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
        console.log(cart);
        modal.classList.toggle('closed');
        modalOverlay.classList.toggle('closed');
    }

    function changeLanguage() {
        // event.preventDefault();
        // console.log(cart);
        tradeMark.textContent = '';
        policy.textContent = '';
        phone.textContent = '';
        mcTitle.textContent = '';

        const pageName = page.substring(1, page.length - 5);
        console.log('pageName: ', pageName);
        const tKz = pageData.pages[pageName].titleKz;
        const tRu = pageData.pages[pageName].titleRu;

        if (lng == 'kz') {
            document.title = pageData.siteTitle + ' - ' + tKz;
            // меню
            kz.classList.remove('closed');
            ru.classList.add('closed');
            // страница контактов
            if (pageName == 'contacts') {
                contactsKz.classList.remove('closed');
                contactsRu.classList.add('closed');
            }
            // страница о компании
            if (pageName == 'about') {
                aboutKz.classList.remove('closed');
                aboutRu.classList.add('closed');
            }
            // страница сервис
            if (pageName == 'service') {
                serviceKz.classList.remove('closed');
                serviceRu.classList.add('closed');
            }

            mcTitle.insertAdjacentHTML('beforeend', pageData.pages[pageName].mcTitleK);
            tradeMark.insertAdjacentHTML('beforeend', pageData.tmK);
            phone.insertAdjacentHTML('beforeend', pageData.phoneK);
            policy.textContent = pageData.policyK;
            if (pageName == 'index') {
                mcTitle2.textContent = '';
                mcTitle2.insertAdjacentHTML('beforeend', pageData.pages[pageName].mcTitleK2);
            }
            renderCart();
        }

        if (lng == 'ru') {
            document.title = pageData.siteTitle + ' - ' + tRu;
            kz.classList.add('closed');
            ru.classList.remove('closed');

            if (pageName == 'contacts') {
                contactsKz.classList.add('closed');
                contactsRu.classList.remove('closed');
            }

            if (pageName == 'about') {
                aboutKz.classList.add('closed');
                aboutRu.classList.remove('closed');
            }
            if (pageName == 'service') {
                serviceKz.classList.add('closed');
                serviceRu.classList.remove('closed');
            }


            mcTitle.insertAdjacentHTML('beforeend', pageData.pages[pageName].mcTitleR);
            tradeMark.insertAdjacentHTML('beforeend', pageData.tmR);
            phone.insertAdjacentHTML('beforeend', pageData.phoneR);
            policy.textContent = pageData.policyR;
            if (pageName == 'index') {
                mcTitle2.textContent = '';
                mcTitle2.insertAdjacentHTML('beforeend', pageData.pages['index'].mcTitleR2);
            }
            renderCart();
        }
    }

    function renderCart() {
        // console.log(cart);
        modalBody.textContent = '';
        cart.forEach(function ({ id, name, cost, count }) {
            const itemCart = `
          <div class="order-row">
                <span class="order-name">${name}</span>
                <strong class="order-price">${cost}</strong>
                <div class="order-counter">
                  <button class="counter-button counter-minus" data-id="${id}">-</button>
                  <span class="counter" >${count}</span>
                  <button class="counter-button counter-plus" data-id="${id}">+</button>
                </div>
              </div>
          `;
            console.log(open);

            modalBody.insertAdjacentHTML('afterbegin', itemCart);
        })
        const totalPrice = cart.reduce(function (result, item) {
            return result + (parseFloat(item.cost)) * item.count;
        }, 0);

        modalPrice.textContent = totalPrice + ' ₸';
    }

    function addToCart(item) {
        // console.log(cartCount);
        cart.push({
            id: item.id,
            name: item.name,
            cost: item.cost,
            count: item.count
        })
        changeCartCount();
    }

    function changeCount(event) {
        const target = event.target;

        if (target.classList.contains('counter-button')) {
            const order = cart.find(function (item) {
                return item.id === target.dataset.id;
            });
            if (target.classList.contains('counter-minus')) {
                order.count--;
                if (order.count === 0) {
                    cart.splice(cart.indexOf(order), 1);
                }
            }
            if (target.classList.contains('counter-plus')) order.count++;
            changeCartCount();
            renderCart();
        }
    }

    function changeCartCount() {
        openCart.textContent = ''
        openCart2.textContent = ''
        const cartCount = `<a><span class="fa fa-shopping-cart"> ${cart.length}</span></a>`;
        openCart.insertAdjacentHTML('beforeend', cartCount);
        openCart2.insertAdjacentHTML('beforeend', cartCount);
    }

    $('.slider').owlCarousel({
        loop: true, //Зацикливаем слайдер
        margin: 0, //Отступ от элемента справа в 0px
        nav: false, //Отключение навигации
        dots: true,
        autoplay: true, //Автозапуск слайдера
        smartSpeed: 1000, //Время движения слайда
        autoplayTimeout: 5000, //Время смены слайда
        items: 1
        // responsive: { //Адаптивность. Кол-во выводимых элементов при определенной ширине.
        //     0: {
        //         items: 1
        //     },
        //     600: {
        //         items: 1
        //     },
        //     1000: {
        //         items: 1
        //     }
        // }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height() - 100) {
            $('.top').addClass('active');
        } else {
            $('.top').removeClass('active');
        }
    })
    $('.top').click(function () {
        $('html, body').stop().animate({ scrollTop: 0 }, 'slow', 'swing');
    });

    $('.reviews').owlCarousel({
        loop: true,
        items: 1,
        smartSpeed: 700,
        responsiveClass: true,
        dots: true,
        autoHeight: false
    });

    getData('cart.json').then(function (data) {
        data.forEach(addToCart);
        renderCart();
    });

    language.addEventListener('click', function (event) {
        const target = event.target;

        if (target.closest('.lng-kz')) {
            lng = 'kz';
            changeLanguage();
        }
        if (target.closest('.lng-ru')) {
            lng = 'ru';
            changeLanguage();
        }
    })


    closeButton.addEventListener('click', toggleModal);
    btnCancel.addEventListener('click', toggleModal);
    openCart.addEventListener('click', toggleModal);
    openCart2.addEventListener('click', toggleModal);
    modalBody.addEventListener('click', changeCount);
})