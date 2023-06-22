import { ModalConstructor } from "../vendor/modal/modalconstructor";

export function initAuthModal(){
  const authModal = new ModalConstructor('[data-path="authorization"]', {
  autoOpen: true,
  isStatic: true,
  animTime: 300,
  modalCloseBtnClass: 'authorization__close',
  modalOverlayClass: "authorization",
  modalWrapperClass: "authorization__content",
  modalOpenClass: "authorization--open"
})
}
