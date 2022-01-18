const burgerMenu = (selectorBurger, selectorMenu, burgerActive, menuActive) => {
  const burger = document.querySelector(selectorBurger);
  const menu = document.querySelector(selectorMenu);
  console.log("menu :", menu);

  burger.addEventListener("click", () => {
    burger.classList.toggle(burgerActive);
    menu.classList.toggle(menuActive);
  });
};

export default burgerMenu;
