import { ModalConstructor } from "../vendor/modal/modalconstructor.js";
import {unsubVar} from '../_variables.js';

// Информационное модальное окно,динамическое, октрывается после опросника при отписки.При подтверждении перехода пользователь перенаправляется на страницу отписки от реккурентных платежей cloudPayments
const redirModal = new ModalConstructor('.js-un-btn[data-un="true"]', {
  autoOpen: false,
  animTime: 400,
  modalInner: `
  <p class="redirect__descr">Вы будете перенаправлены на страницу отмены рекуррентных платежей платежной системы CloudPayments.</p>
  <button class="btn-reset redirect__confirm-btn" type="button" data-redirect="1">Подтвердить переход</button>
  <button class="btn-reset redirect__cancel-btn" type="button" data-redirect="0">Отмена</button>
  `,
  modalOverlayClass: 'redirect',
  modalWrapperClass: 'redirect__content',
  modalOpenClass: 'redirect--open',
  closeClickingOnOverlay: false,
  closeWithEscape: false,
})

export function initUnsubModal() {
  const {unsubModalTrigger, unsubModal} = unsubVar;
  // модальное окно открывается при нажатии на "Отменить подписку",скрыто в разметке, это опросник, предлагает указать причину отписки.
  const unModal = new ModalConstructor('[data-path="unsubscribe"]', {
    autoOpen: false,
    isStatic: true,
    animTime: 300,
    modalCloseBtnClass: 'unsubscribe__close',
    modalOverlayClass: "unsubscribe",
    modalWrapperClass: "unsubscribe__content",
    modalOpenClass: "unsubscribe--open"
  })
  // обработчик триггера вызова модального окна-отписки
  unsubModalTrigger.addEventListener('click', (e)=> {
    e.preventDefault()
    unModal.open();
  })
  // обрботка клика по кнопке "Продолжить", внутри опросника перед отпиской
  unsubModal.addEventListener('click', function setUnsubBtn(e){
    const target = e.target.closest('.js-un-btn');
    if(!target) return;
    if(+target.dataset.un) {
      unModal.close();
      redirModal.open();
      
    } else {
      unModal.close();
      
    }
  })
  // обработчки кнопки "Подтвердить переход" страницы редиректа
    document.addEventListener('click', function setRedirBtn(e){
      const target = e.target.closest('button[data-redirect]');
      if(!target) return;
      if(+target.dataset.redirect) {
        window.location.href = 'https://my.cloudpayments.ru/';
        redirModal.close();
        
      } else {
        redirModal.close();
      }
    })
}