const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  // autoplay parameters
  autoplay: {
    delay: 5000,
  },
  // effect
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".slider-button-next",
    prevEl: ".slider-button-prev",
  },
});
