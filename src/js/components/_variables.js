export const stepVars ={ 
  stepsParent: document.querySelector('.quiz'),
  steps: document.querySelectorAll('.js-step'),
  // steps: stepsParent.children,
  backBtn: document.querySelector('.js-back-btn'),
  descr: document.querySelector('.js-descr'),
  authBtn: document.querySelector('.js-auth'),
  genderBtns: document.querySelectorAll('.gender__choice'),
  nextBtns: document.querySelectorAll('.js-next'),
  tabBlock: document.querySelector('.tabs'),
  tabBtns: document.querySelectorAll('.tabs__btn'),
  bar:document.querySelector('.progress-bar'),
  fill:document.querySelector('.progress-fill'),
  helpBtns: document.querySelectorAll('.js-open-help'),
  measuresForm: document.querySelector('[name="bodyData"]'),
  inputs: document.querySelectorAll('.measures__input'),
  planProgress: document.querySelector('.bar__fill'),
  progressMessage: document.querySelector('.plan-progress__message'),
  initWeight: document.querySelector('.processing__initial-w'),
};

export const registrVars = {

}

export const unsubVar = {
  unsubModalTrigger: document.querySelector('[data-path="unsubscribe"]'),
  unsubModal: document.querySelector('.unsubscribe')
}