import Swiper from "swiper";
import JustValidate from "just-validate";
import { stepVars } from "../_variables.js";
import { ModalConstructor } from '../vendor/modal/modalconstructor.js'

// свайпер последнего блока опросника, библиотека Swiper.js
export function initMeasuresSwiper() {
  new Swiper('.measures-swiper', {
    direction: 'horizontal',
    observeParents: true,
    observeSlideChildren: true,
    observer: true,
    loop: true,
    nested: true,
    spaceBetween: 14,
    grabCursor: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      400: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      669: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      }
    }
  })
}
/*************ТАБЫ*********************/

// !!!ЭТОТ СВАЙПЕР СКРЫТ, находится в блоке "tabs", это кнопки переключения опросника, при желании можно активировать
export function initTabsSwiper() {
  let tabSwiper = new Swiper('.tabs__swiper', {
    direction: 'horizontal',
    observeParents: true,
    observeSlideChildren: true,
    observer: true,
    slidesPerView: 'auto',
    grabCursor: true,
  })
  return tabSwiper
}

//  блок "tabs", логика переключения шагов опросника
let quizResults = {};//здесь записываются результаты тестирования
export function setTabs() {
  const { steps, backBtn, genderBtns, nextBtns, tabBtns, fill } = stepVars;
  let activeInd;

  // открытие скрытого слайдера при клике на первый таб
  Array.from(genderBtns, el => {
    el.addEventListener("click", (e) => {
      showElems()
    })
  })

  //логика переключения на следующую страницу(шаг)опросника при выборе ответа на текущей. данные записываются в объекте quizResults, при необходимости могут быть исопльзованы для передачи на сервер. Т.к. используются в качестве элементов выбора кнопки, то значение каждой запрограммировано в data-атрибутах 
  Array.from(nextBtns, el => {
    el.addEventListener('click', (e) => {
      quizResults[el.dataset.property] = el.dataset.value;//передаем выбранные результат в quizResults по значениям атрибутов data-propertry и data-value
      let stepParent = el.closest('.js-step');
      let nextInd = +stepParent.dataset.target + 1
      activeInd = nextInd;
      toggleSteps(steps[activeInd], activeInd)
    })
  })

  //обработка клика по кнопке назад
  backBtn.addEventListener('click', (e) => {
    let prevInd = activeInd - 1 > 0 ? activeInd - 1 : 0;
    activeInd = prevInd;
    toggleSteps(steps[activeInd], activeInd)
  })

  // переключение при нажатии на кнопку внутри свайпера. !СКРЫТОГО СВАЙПЕРА
  tabBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      let path = +el.dataset.path;
      activeInd = path;
      toggleSteps(document.querySelector(`[data-target="${path}"]`), activeInd)

    })
  })

  //обработка клика по прогрессбару
  fill.addEventListener('click', (e) => {
    const indByClick = getIndByClick(e.clientX);
    activeInd = indByClick;
    toggleSteps(steps[activeInd], activeInd)
  })

}

// переключение страниц опросника, завязано на индекс активного элемента
function toggleSteps(elToOpen, activeInd) {
  const {steps} = stepVars;
  setProgress(activeInd);
  Array.from(steps).forEach(elem => {
    elem.classList.add('js-hide');
  })
  if(!activeInd) hideElems();
  elToOpen.classList.remove('js-hide');
  enableBtns(activeInd);
}

// показываем блок с табами, кнопку назад, которые скрыты в начальном состоянии страницы(на первом шаге) и прячем описание
function showElems() {
  const { tabBlock, backBtn, descr, authBtn } = stepVars;
  tabBlock.classList.remove('js-hide');
  backBtn.classList.remove('js-hide');
  descr.classList.add('js-hide');
  // authBtn.classList.add('js-hide');
}
// прячем блок с табами, кнопку назад и показываем описание, возвращаем опросник в начальное сосотояние
function hideElems() {
  const { tabBlock, backBtn, descr, authBtn } = stepVars;
  tabBlock.classList.add('js-hide');
  backBtn.classList.add('js-hide');
  descr.classList.remove('js-hide');
  // authBtn.classList.remove('js-hide');
}

// настариваем прогрессбар при переключении
function setProgress(activeInd) {
  const { steps, fill } = stepVars;
  const percentStep = (1 / steps.length) * 100;
  let percValue = Math.ceil((activeInd + 1) * percentStep) + '%';
  fill.dataset.percent = percValue;
  fill.style.width = percValue;
}

// делаем кнопки ативными.!ЭТО КНОПКИ СКРЫТОГО СВАЙПЕРА
function enableBtns(activeInd) {
  const { tabBtns } = stepVars;
  let btnsArr = Array.from(tabBtns)
  btnsArr.map((el, i) => {
    if (i > activeInd) el.disabled = true;
    else el.disabled = false;

    if (i == activeInd) el.classList.add('tabs__btn--active');
    else el.classList.remove('tabs__btn--active')
  })
}

// получить индекс шага по клику на прогрессбар
function getIndByClick(pos) {
  const {steps, bar} = stepVars;
  let clickPos = pos - bar.offsetLeft;
  let indByClick = Math.ceil(clickPos/(bar.offsetWidth/steps.length));
  return indByClick-1
}

/********************************/
// открытие окошка помощи
export function openHelp() {
  const { helpBtns } = stepVars;
  const helpBtnsArr = Array.from(helpBtns);
  helpBtnsArr.map(el => {
    const infoBlock = el.nextElementSibling;
    const closeBtn = infoBlock.querySelector('.js-close-help');
    infoBlock.addEventListener('click', (e) => {
      e._isClickedInfoBlock = true;
    })
    el.addEventListener('click', (e) => {
      infoBlock.classList.add('help__info--active');
    })

    document.addEventListener('click', (e) => {
      if ((e._isClickedInfoBlock && !e.target.closest('.js-close-help')) || e.target.closest('.js-open-help') == el) return;
      infoBlock.classList.remove('help__info--active');
    })

    document.addEventListener('keyup', e => {
      if (e.key == 'Escape') {
        infoBlock.classList.remove('help__info--active')
      }
    })
  })
}
// инициализация processing modal- это окно показывающее пользователю обработку данных опросника, на нем реализован прогресс бар, по достижению 100%, пользователя перебросит на страницу с формой регистрации на курс
let processingModal;
export function initProcessing() {
  processingModal = new ModalConstructor('.measures__sbmt-btn', {
    isStatic: true,
    animTime: 400,
    modalOverlayClass: 'processing',
    modalWrapperClass: 'processing__container',
    closeClickingOnOverlay: false,
    closeWithEscape: false,
  })
}

// валидация формы с измерениями тела использовался плагин JustValidate
let validation;
export function validateBodyDataForm() {
  const { inputs, measuresForm} = stepVars;
  const [age, height, weight, targetWeight] = inputs;
  const sbmtBtn = measuresForm.querySelector('.measures__sbmt-btn');

  validation = new JustValidate(measuresForm, {
    validateBeforeSubmitting: true,
  })
  validation
    .addField(age, [
      {
        validator: (value) => {
          if (value < 18 || value > 99) return false;
          else return true;
        },
        errorMessage: 'Пожалуйста, введите значение от 18 до 99.'

      }
    ])
    .addField(height, [
      {
        validator: (value) => {
          if (value < 135 || value > 256) return false;
          else return true;
        },
        errorMessage: 'Пожалуйста, введите значение от 135 до 256.'
      }
    ])
    .addField(weight, [
      {
        validator: (value) => {
          if (value < 40 || value > 200) return false;
          else return true;
        },
        errorMessage: 'Пожалуйста, введите значение от 40 до 200.'
      }
    ])
    .addField(targetWeight, [
      {
        validator: (value) => {
          if (value < 40 || value > 200) return false;
          else return true;
        },
        errorMessage: 'Пожалуйста, введите значение от 40 до 200.'
      }
    ])
    .onSuccess((event) => {
      // записываются данные формы
      handleSubmit(measuresForm);
      // открывается окно обработки данных
      processingModal.open();
      // запоускается анимация прогрессбара
      requestAnimationFrame(animate);
    })

  inputs.forEach(elem => {
    elem.addEventListener('keypress', (e) => {
      if (e.key.match(/[^0-9]/g) && e.key.length <= 1) e.preventDefault()
    })
    elem.addEventListener('input', (e) => {
      sbmtBtn.disabled = validation.isValid ? false : true
    })
  })

}

//обработка отправки формы, здесь собираются значения из полей формы в объект formData и записываются в quizResults в свойстве 'measures', 
function handleSubmit(form) {
  const { inputs, initWeight } = stepVars;
  let inputsArr = Array.from(inputs)
  let formData = inputsArr.reduce((result, item) => {
    result[item.name] = item.value
    return result
  }, {});
  initWeight.textContent = formData.weight + 'kg';
  quizResults['measures'] = formData;
  form.reset();
  console.log(quizResults)
}

// функция запуска анимации загрузки прогрессбара, при достижении 100% - редирект на страницу регистрации.
const { planProgress, progressMessage} = stepVars
let start = null;
const duration = 4500;
function animate(timestamp) {
  if (!start) start = timestamp;
  const progress = Math.ceil(Math.min((timestamp - start) / duration, 1) * 100);
  planProgress.style.width = progress + '%';
  planProgress.dataset.fill = progress + '%';
  if (progress < 100) {
    requestAnimationFrame(animate)
  } else {
    start = null;
    processingModal.close();
    window.location.pathname = '/registration.html';

  }
  if (progress == 50) {
    progressMessage.textContent = `Подбор дополнительных тренировок...`
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
