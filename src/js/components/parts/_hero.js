import Swiper, {Autoplay} from "swiper";

// свайпер на главной странице, библиотека Swiper.js
export function initHeroSwiper() {
  new Swiper('.hero__swiper', {
    modules: [Autoplay],
    spaceBetween: 14,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 5000,
    },
  })
}