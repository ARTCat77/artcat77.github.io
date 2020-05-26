/* Вывод 
сообщений
в консоль*/
//Комментарий
console.log('Hello, JS!');
console.warn('Hello, JS!');
console.error('Hello, JS!');
// переменные
//console.log(myVar, newVar, myConst);
var myVar = 10;
let newVar = 15; //не видно за областью видимости { let newVar = 15;} console.log(newVar); выдаст ошибку
const myConst = 333;
console.log(myVar, newVar, myConst);
const number = 50;
const string = "My";
const string1 = 'Hello';
const tmpString = `Hello ${string + ' New World'}
<div class="cross">
    <span></span>
    <span></span>
</div>
`;// позволяет делать многострочные строки, с полным форматированием
const bool = true;
const obj = {
    key: 'Number',
    js: 55,
    car: {
        color: 'red',
        doors: 5,
    },
    arr: ['Hello', 5, true, null, [1, 2, 3], { a: 1, b: 2 }],
};
const arr = ['Hello', 5, true, null, [1, 2, 3], { a: 1, b: 2 }];
const err = Error('ERROR MESSAGE!');
const date = new Date();
console.log(tmpString, bool);
console.log(100 > 200);
console.log(obj);
console.log(err);
console.log(date);
// Условия
let n = 12;
if (n > 10) {
    console.log(`${n} > 10`);
} else if (n < 10) {
    console.log(`${n} < 10`);
} else {
    console.log(`${n} = 10`);
};
foo();
// Циклы
for (let i = 0; i < 3; i++) {
    console.log(i);
};
//Функции
function foo() {
    console.error('Function declaration(Задекларированые функции) - Можно вызвать из любого места'); //Можно вызвать из любого места
}

const bar = function () {
    console.error('Function Expression(функциональное выражение) - Нельзя вызвать до объявления '); // Нельзя вызвать до объявления
}
bar();

const arrow = () => {
    console.error('Arrow Function(стрелочные функции) - Нельзя вызвать до объявления '); // Нельзя вызвать до объявления
}
arrow();
console.log(document);
console.dir(document);

const headerFlex = document.querySelector('.header-flex');
headerFlex.addEventListener('click', event => {
    console.log(event.target);
    console.log(event);
})