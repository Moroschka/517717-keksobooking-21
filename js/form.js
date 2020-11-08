'use strict';

(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;
  const noticeForm = document.querySelector(`.ad-form`);
  const time = noticeForm.querySelector(`.ad-form__element--time`);
  const elementsForm = noticeForm.querySelectorAll(`.ad-form__element`);
  const elementFormInput = noticeForm.querySelector(`.ad-form-header__input`);
  const timeOut = noticeForm.querySelector(`#timeout`);
  const timeIn = noticeForm.querySelector(`#timein`);
  const fieldAddress = noticeForm.querySelector(`#address`);
  const roomsNumber = noticeForm.querySelector(`#room_number`);
  const capacity = noticeForm.querySelector(`#capacity`);
  const titleInput = noticeForm.querySelector(`#title`);
  const typeSelect = noticeForm.querySelector(`#type`);
  const priceInput = noticeForm.querySelector(`#price`);
  const typePrice = {
    "bungalow": 0,
    "flat": 1000,
    "house": 5000,
    "palace": 10000
  };

  const onRoomsNumberChange = function () {
    if (capacity.value && roomsNumber.value
      && (roomsNumber.value < capacity.value)
      && (roomsNumber.value !== `100`)
      && capacity.value !== `0`) {
      roomsNumber.setCustomValidity(`Количество комнат должно быть больше либо равно ${capacity.value}!`);
    } else if (roomsNumber.value === `100` && capacity.value !== `0`) {
      roomsNumber.setCustomValidity(`Укажите ${capacity.value} комн.`);
    } else if (roomsNumber.value !== `100` && capacity.value === `0`) {
      roomsNumber.setCustomValidity(`Укажите 100 комн.`);
    } else {
      roomsNumber.setCustomValidity(``);
    }
    roomsNumber.reportValidity();
  };
  roomsNumber.addEventListener(`change`, onRoomsNumberChange);

  const onCapacityChange = function () {
    if (capacity.value && roomsNumber.value
      && (capacity.value > roomsNumber.value)
      && (roomsNumber.value !== `100`)) {
      capacity.setCustomValidity(`Количество гостей должно быть не более ${roomsNumber.value}!`);
    } else if (capacity.value === `0` && roomsNumber.value !== `100`) {
      capacity.setCustomValidity(`Укажите необходимое количество гостей!`);
    } else if (capacity.value !== `0` && roomsNumber.value === `100`) {
      capacity.setCustomValidity(`Укажите "Не для гостей"`);
    } else {
      capacity.setCustomValidity(``);
    }
    capacity.reportValidity();
  };
  capacity.addEventListener(`change`, onCapacityChange);

  titleInput.addEventListener(`input`, function () {
    const valueLength = titleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} символы`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  });

  const getTime = function (evt) {
    let targetValue = evt.target.value;
    if (evt.target.matches(`#timein`)) {
      timeOut.value = targetValue;
    } else if (evt.target.matches(`#timeout`)) {
      timeIn.value = targetValue;
    }
  };
  time.addEventListener(`change`, getTime);

  const getPrice = function (evt) {
    let targetKey = evt.target.value;
    let targetValue = typePrice[targetKey];
    priceInput.setAttribute(`min`, targetValue);
    priceInput.setAttribute(`placeholder`, `${targetValue}`);
  };
  typeSelect.addEventListener(`change`, getPrice);

  priceInput.addEventListener(`invalid`, function () {
    if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity(`Цена должна быть не ниже ${typePrice[typeSelect.value]} рублей`);
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity(`Цена не должна превышать ${MAX_PRICE} рублей`);
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity(`Обязательное поле`);
    } else {
      priceInput.setCustomValidity(``);
    }
  });

  window.form = {
    noticeForm: noticeForm,
    elementsForm: elementsForm,
    elementFormInput: elementFormInput,
    fieldAddress: fieldAddress
  };
})();
