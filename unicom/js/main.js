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
        deliveryKz = document.querySelector('#delivery-kz'),
        deliveryRu = document.querySelector('#delivery-ru'),
        shop = document.querySelector('#shop'),
        sectionName = document.querySelector('.section-name'),
        mainMenu = document.querySelector('.header-menu__topmenu'),
        subMenu = document.querySelector('.submenu-ru'),
        subMenuk = document.querySelector('.submenu-kz'),
        addCart = document.querySelector('.product-item'),
        openCart = document.querySelector('#open-cart');

    const cart = JSON.parse(localStorage.getItem('myCart')) || [];
    renderCart();
    changeCartCount();

    const saveCart = function () {
        localStorage.setItem('myCart', JSON.stringify(cart));
    }

    const shopSection = []
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
                titleKz: 'Жөндеу қызметі',
                titleRu: 'Услуги ремонта',
                mcTitleK: '<span>Жөндеу</span> қызметі',
                mcTitleR: '<span>Услуги</span> ремонта'
            },
            shop: {
                titleKz: 'Shop',
                titleRu: 'Shop',
                mcTitleK: '',
                mcTitleR: ''
            },
            contacts: {
                titleKz: 'Бізбен байланысу',
                titleRu: 'Контакты',
                mcTitleK: '<span>Байланыс</span> ақпараты',
                mcTitleR: '<span>Контактная</span> информация'
            },
            delivery: {
                titleKz: 'Төлем және жеткізу',
                titleRu: 'Оплата и доставка',
                mcTitleK: '<span>Төлем</span> және жеткізу',
                mcTitleR: '<span>доставка</span> и Оплата'
            },
            about: {
                titleKz: 'Кәсіпорын жайлы',
                titleRu: 'О компании',
                mcTitleK: '<span>Кәсіпорын</span> жайлы',
                mcTitleR: '<span>О</span> компании'
            }
        }
    };

    //E-mail Ajax Send
    $("form.callback").submit(function () { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "/mail.php", //Change
            data: th.serialize()
        }).done(function () {
            $(th).find('.success').addClass('active').css("display", "flex").hide().fadeIn();
            setTimeout(function () {
                $(th).find('.success').removeClass('active').fadeOut();
                th.trigger("reset");
            }, 2000);
        });
        return false;
    });

    const shopData = {
        pages: {
            computers: {
                titleKZ: 'Компьютерлер',
                titleRu: 'Компьютеры',
                db: 'computers'
            },
            parts: {
                titleKZ: 'Құрылғылар',
                titleRu: 'Комплектующие',
                db: 'parts'
            },
            periferals: {
                titleKZ: 'Перифериялық құрылғылар',
                titleRu: 'Периферийные устройства',
                db: 'periferals'
            },
            expendable: {
                titleKZ: 'Шығыс материалдар',
                titleRu: 'Расходные материалы',
                db: 'periferals'
            },
            pr: {
                titleKZ: 'Бағдарламалық жасақтама',
                titleRu: 'Програмное обеспечение',
                db: 'programs'
            },
            pc: {
                titleKZ: 'Жүйелік блоктар',
                titleRu: 'Готовые решения',
                db: 'computer'
            },
            nb: {
                titleKZ: 'Ноутбуктер',
                titleRu: 'Ноутбуки',
                db: 'notebooks'
            },
            mbk: {
                titleKZ: 'Моноблоктар',
                titleRu: 'моноблоки',
                db: 'monoblock'
            },
            cpu: {
                titleKZ: 'Процессорлар',
                titleRu: 'процессоры',
                db: 'cpu'
            },
            mb: {
                titleKZ: 'Аналық тақша',
                titleRu: 'материнские платы',
                db: 'mainboard'
            },
            ram: {
                titleKZ: 'Жедел жад',
                titleRu: 'оперативная память',
                db: 'ram'
            },
            hdd: {
                titleKZ: 'Қатты дискілер',
                titleRu: 'жесткие диски',
                db: 'hdd'
            },
            vc: {
                titleKZ: 'Бейнекарта',
                titleRu: 'видеокарты',
                db: 'videocards'
            },
            case: {
                titleKZ: 'корпустар',
                titleRu: 'корпуса',
                db: 'cases'
            },
            per: {
                titleKZ: 'Кеңсе жабдықтары',
                titleRu: 'офисное оборудование',
                db: 'office'
            },
            au: {
                titleKZ: 'Спикерлер',
                titleRu: 'аудио оборудование',
                db: 'audio'
            },
            km: {
                titleKZ: 'Тінтуір және пернетақта',
                titleRu: 'клавиатуры, мыши',
                db: 'keyboard'
            },
            mon: {
                titleKZ: 'Проекторлар мен мониторлар',
                titleRu: 'мониторы, проекторы',
                db: 'monitors'
            },
            p: {
                titleKZ: 'Қағаз',
                titleRu: 'бумага',
                db: 'paper'
            },
            lem: {
                titleKZ: 'Лазерлік принтерлер үшін',
                titleRu: 'для лазерных принтеров',
                db: 'laserprinter'
            },
            iem: {
                titleKZ: 'Сиялы принтерлер үшін',
                titleRu: 'для струйных принтеров',
                db: 'inkprinter'
            }

        }
    }

    // + getData
    const getData = async function (url) {
        const responce = await fetch(url);
        // console.log(responce.json);

        if (responce.ok) {
            return responce.json();
        } else {
            throw new Error(`Не удалось получить данные по адресу ${url}, статус: ошибка ${responce.status}`);
        }
    };
    // ! getData

    // console.log(pageData);

    // console.log('document.location: ', document.location);
    let url = document.location.pathname;
    var queryString = url.slice(1);
    // console.log(queryString);

    if (!queryString.length) {

        var page = 'index';
    } else {

        var page = url.substring(1, url.length - 5);
    }

    let hash = document.location.hash.substring(1);

    let lng = document.location.search.substring(1);
    if (!lng) lng = 'kz';
    // console.log(lng, hash);

    if (page.trim() !== 'shop') {
        // console.log('page: ', page);
        shopSection.length = 0;
        // sectionName.removeEventListener('click', createSection);
    } else {
        // console.log(page);
        sectionName.addEventListener('click', createSection);
        openShop(hash);
    }

    function openShop(hash) {
        // console.log(hash);
        switch (hash) {
            case 'computers':
                var url1 = 'db/' + hash + '.json';
                pageData.pages[page].mcTitleR = shopData.pages[hash].titleRu;
                pageData.pages[page].mcTitleK = shopData.pages[hash].titleKZ;
                shop.textContent = '';
                createSection(url1);
                // console.log(url1);
                break;
            case 'parts':
                var url1 = 'db/' + hash + '.json';
                pageData.pages[page].mcTitleR = shopData.pages[hash].titleRu;
                pageData.pages[page].mcTitleK = shopData.pages[hash].titleKZ;
                shop.textContent = '';
                createSection(url1);
                // console.log(pageData.pages[page].mcTitleR);
                break;
            case 'periferals':
                var url1 = 'db/' + hash + '.json';
                pageData.pages[page].mcTitleR = shopData.pages[hash].titleRu;
                pageData.pages[page].mcTitleK = shopData.pages[hash].titleKZ;
                shop.textContent = '';
                createSection(url1);
                // console.log(url1);
                break;
            case 'expendable':
                var url1 = 'db/' + hash + '.json';
                pageData.pages[page].mcTitleR = shopData.pages[hash].titleRu;
                pageData.pages[page].mcTitleK = shopData.pages[hash].titleKZ;
                shop.textContent = '';
                createSection(url1);
                // console.log(url1);
                break;
            default:
                shop.textContent = '';
                openGoods(hash);

        }
    }


    changeLanguage();

    function toggleModal() {
        // console.log(cart);
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


        const tKz = pageData.pages[page].titleKz;
        const tRu = pageData.pages[page].titleRu;

        if (lng == 'kz') {
            document.title = pageData.siteTitle + ' - ' + tKz;
            // меню
            kz.classList.remove('closed');
            ru.classList.add('closed');
            // страница контактов
            if (page == 'contacts') {
                contactsKz.classList.remove('closed');
                contactsRu.classList.add('closed');
            }
            // страница о компании
            if (page == 'about') {
                aboutKz.classList.remove('closed');
                aboutRu.classList.add('closed');
            }
            // страница сервис
            if (page == 'service') {
                serviceKz.classList.remove('closed');
                serviceRu.classList.add('closed');
            }
            // страница доставка
            if (page == 'delivery') {
                deliveryKz.classList.remove('closed');
                deliveryRu.classList.add('closed');
            }

            mcTitle.insertAdjacentHTML('beforeend', pageData.pages[page].mcTitleK);
            tradeMark.insertAdjacentHTML('beforeend', pageData.tmK);
            phone.insertAdjacentHTML('beforeend', pageData.phoneK);
            policy.textContent = pageData.policyK;
            if (page == 'index') {
                mcTitle2.textContent = '';
                mcTitle2.insertAdjacentHTML('beforeend', pageData.pages[page].mcTitleK2);
            }

            if (page == 'shop') {
                mcTitle.textContent = '';
                mcTitle.insertAdjacentHTML('beforeend', pageData.pages[page].mcTitleK);
            }
            renderCart();
        }

        if (lng == 'ru') {
            document.title = pageData.siteTitle + ' - ' + tRu;
            kz.classList.add('closed');
            ru.classList.remove('closed');

            if (page == 'contacts') {
                contactsKz.classList.add('closed');
                contactsRu.classList.remove('closed');
            }

            if (page == 'about') {
                aboutKz.classList.add('closed');
                aboutRu.classList.remove('closed');
            }
            if (page == 'service') {
                serviceKz.classList.add('closed');
                serviceRu.classList.remove('closed');
            }
            if (page == 'delivery') {
                deliveryKz.classList.add('closed');
                deliveryRu.classList.remove('closed');
            }


            mcTitle.insertAdjacentHTML('beforeend', pageData.pages[page].mcTitleR);
            tradeMark.insertAdjacentHTML('beforeend', pageData.tmR);
            phone.insertAdjacentHTML('beforeend', pageData.phoneR);
            policy.textContent = pageData.policyR;
            if (page == 'index') {
                mcTitle2.textContent = '';
                mcTitle2.insertAdjacentHTML('beforeend', pageData.pages[page].mcTitleR2);
            }
            renderCart();
        }
    }

    function renderCart() {
        // console.log(cart);
        modalBody.textContent = '';
        cart.forEach(function ({ id, title, cost, count }) {
            const itemCart = `
          <div class="order-row">
                <span class="order-name">${title}</span>
                <strong class="order-price">${cost}</strong>
                <div class="order-counter">
                  <button class="counter-button counter-minus" data-id="${id}">-</button>
                  <span class="counter" >${count}</span>
                  <button class="counter-button counter-plus" data-id="${id}">+</button>
                </div>
              </div>
          `;
            // console.log(open);

            modalBody.insertAdjacentHTML('afterbegin', itemCart);
        })
        const totalPrice = cart.reduce(function (result, item) {
            return result + (parseFloat(item.cost)) * item.count;
        }, 0);

        modalPrice.textContent = totalPrice + ' ₸';
    }

    function renderSection(section) {
        // console.log(section);
        const {
            img,
            link,
            name,
            db
        } = section;
        const itemSection = `
        <article class="col-lg-3 col-md-4 col-sm-6 section-name">
                    <a href="${link}" class="card-link">
                        <figure class="section-img">
                            <img src="${img}" alt="${name}" class="img-responsive">
                            <figcaption class="section-title">${name}</figcaption>
                        </figure>
                    </a>
                </article>
        `;

        changeLanguage();
        shop.insertAdjacentHTML('beforeend', itemSection);

    }

    function createSection(url) {
        mcTitle.textContent = '';
        getData(url).then(function (data) {
            data.forEach(renderSection);
        })
    }

    function openGoods(data) {

        const url = 'db/' + shopData.pages[data].db + '.json';
        pageData.pages[page].mcTitleR = shopData.pages[data].titleRu;
        // console.log('pageData.pages[page].mcTitleR: ', pageData.pages[page].mcTitleR);
        pageData.pages[page].mcTitleK = shopData.pages[data].titleKZ;
        // console.log('pageData.pages[page].mcTitleK: ', pageData.pages[page].mcTitleK);
        // console.log(shopData.pages[data].titleRu);
        getData(url).then(function (data) {
            data.forEach(renderCard);
        })
        changeLanguage();
    }

    function renderCard(cards) {
        const {
            id,
            name,
            description,
            price,
            image
        } = cards;
        const cardGood = `
        <div class="product-item col-sm-12 col-md-6 col-lg-4" id="${id}">
                    <img src="${image}" alt="" class="product-item_img">
                    <div class="product-item_info">
                        <div class="product-item_subtitle">${name}</div>
                        <div class="product-item_text">${description}</div>
                        <div class="product-item_price">${price} ₸</div>
                    </div>

                    <button class="product-item_btn">В корзину</button>
                </div>
        `


        shop.insertAdjacentHTML('beforeend', cardGood);

    }

    function addToCart(event) {
        console.log(event);
        const target = event.target;
        const btnAddCart = target.closest('.product-item_btn');
        const selectSection = target.closest('.section-name')
        if (btnAddCart) {
            const card = target.closest('.product-item');
            const title = card.querySelector('.product-item_subtitle').textContent;
            const cost = card.querySelector('.product-item_price').textContent;
            const id = card.id;
            console.log(card, title, cost, id);

            const product = cart.find(function (item) {
                return item.id === id;
            })
            if (product) {
                product.count += 1;
            } else {
                cart.push({
                    id,
                    title,
                    cost,
                    count: 1
                })
            }
            renderCart();
            changeCartCount();
            // localStorage.setItem('myCart', cart);
        }
        if (selectSection) {
            const path = event.path[2];
            console.log('menu: ', path.hash);
            openShop(path.hash.substring(1));
        }
        saveCart();
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
            saveCart();
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

    if (shop) {
        shop.addEventListener('click', addToCart);
    }
    // shop.removeEventListener('click', addToCart);
    closeButton.addEventListener('click', toggleModal);
    mainMenu.addEventListener('click', function (event) {
        const target = event.target;

        console.log('menu: ', target);
    })
    // shop.addEventListener('click', addToCart);
    btnCancel.addEventListener('click', function () {
        cart.length = 0;
        saveCart();
        renderCart();
        changeCartCount();
    });
    openCart.addEventListener('click', toggleModal);
    openCart2.addEventListener('click', toggleModal);
    modalBody.addEventListener('click', changeCount);
    ru.addEventListener('click', function (event) {
        const target = event.target;
        const path = event.path[0];
        console.log('menu: ', target);
        if (path.hash) {
            shop.addEventListener('click', addToCart);
            openShop(path.hash.substring(1));
        }
        if (!path.hash) {
            shop.removeEventListener('click', addToCart);
        }
    })
    kz.addEventListener('click', function (event) {
        const path = event.path[0];
        // console.log('menu: ', path.hash);
        if (!!path.hash) openShop(path.hash.substring(1));
    })

})