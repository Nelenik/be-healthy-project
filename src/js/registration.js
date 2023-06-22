import { initDishesSwiper } from "./components/parts/_registr.js";
import { Timer } from "./components/vendor/timer.js";

// инициализируем тайемр на странице регистрации по истечении времени будет редирект на главную
let offerTimer;
function initTimer(timeValue) {
  document.querySelector('.reg-page').style.visibility = 'visible';

  offerTimer = new Timer({
    container: document.getElementById('timer'),
    min: timeValue,
    onTimeOut: () => {
      window.location.pathname = '/index.html'
    }
  });
}
// переход к данной странице возможен только после опросника все другие переходы, по прямой ссылке и прочее будут перенаправлять на главную
window.addEventListener('DOMContentLoaded', () => {
  if (!document.referrer) {
    // если прямой переход по вставке ссылки в адресную строку, перенаправляем на главную
    window.location.pathname = '/index.html';
  } else if (performance.getEntriesByType("navigation")[0].type === "reload") {
    // проверяем если была перезагрузка создаем новый таймер со значением из хранилища
    let storagedTimerValue = localStorage.getItem('timerRemainingTime');
    storagedTimerValue ? initTimer(JSON.parse(storagedTimerValue)) : window.location.pathname = '/index.html';
  } else {
    initTimer('13')
  }
})
// при перезагрузке запоминаем оставшееся время в хранилище, переводим предварительно в минуты
window.addEventListener('unload', () => {
  localStorage.setItem('timerRemainingTime', offerTimer.currentTime / 60)
})
// запуск свайпера на странице регистрации
initDishesSwiper()