// находим все фреймы в документе
let iframes = document.querySelectorAll("iframe");

// перебираем массив (на самом деле здесь мы имеем дело с объектом Nodelist, но это неважно)
for (let i = 0; i < iframes.length; i++) {
  let iframe = iframes[i],
    // сохраняем оригинальное значение srс
    originalSrc = iframe.src;

  // заменяем содержимое фрейма картинкой
  iframe.src =
    "https://fromwebwithlove.000webhostapp.com/media/iframe-cover.jpg";

  // при наведении курсора отображаем содержимое фрейма
  iframe.addEventListener("mouseover", () => (iframe.src = originalSrc));

  // возвращаем "кавер"
  iframe.addEventListener(
    "mouseout",
    () =>
      (iframe.src =
        "https://fromwebwithlove.000webhostapp.com/media/iframe-cover.jpg")
  );
}
