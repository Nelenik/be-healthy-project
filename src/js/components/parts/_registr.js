import Swiper from "swiper";
import JustValidate from "just-validate";
import { stepVars } from "../_variables.js";

// свайпер на странице регистрации, Swiper.js
export function initDishesSwiper() {
  new Swiper('.dishes__swiper', {
    grabCursor: true,
    loop: true,
    breakpoints: {
      1921: {
        slidesPerGroup: 4,
        slidesPerView: 4,
        spaceBetween: 25,
      },
      641: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 14,
      },
      320: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 14,
      }
    }
  })
}