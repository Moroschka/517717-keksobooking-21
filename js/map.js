'use strict';

(function () {
  const MOUSE_BUTTON_LEFT = 0;

  window.fieldMap = document.querySelector(`.map`);
  window.mapPinControl = fieldMap.querySelector(`.map__pin--main`);
  window.pinControlSize = {
    pinControlWidth: 65,
    pinControlHeight: 65
  };
  window.mapPinControlCenter = {
    x: pinControlSize.pinControlWidth / 2,
    y: pinControlSize.pinControlHeight / 2
  };
  const elementsForm = noticeForm.querySelectorAll(`.ad-form__element`);
  const elementFormInput = noticeForm.querySelector(`.ad-form-header__input`);

  const setFormActive = function () {
    fieldMap.classList.remove(`map--faded`);
  };

  const setFormElementsInactive = function () {
    elementsForm.forEach(function (elementForm) {
      elementForm.disabled = true;
    });
    elementFormInput.disabled = true;
    noticeForm.classList.add(`ad-form--disabled`);
  };
  setFormElementsInactive();

  const setFormElementsActive = function () {
    elementsForm.forEach(function (elementForm) {
      elementForm.disabled = false;
    });
    elementFormInput.disabled = false;
    noticeForm.classList.remove(`ad-form--disabled`);
  };

  const getStartCoordinates = function (element, shift) {
    const coordinates = {
      "x": Math.floor(parseInt(element.style.left, 10) - mapPinControlCenter.x),
      "y": Math.floor(parseInt(element.style.top, 10) - mapPinControlCenter.y - shift)
    };
    fieldAddress.value = `${coordinates.x}, ${coordinates.y}`;
  };

  const setFormActiveBlock = function (evt) {
    if (evt.button === MOUSE_BUTTON_LEFT || evt.key === `Enter`) {
      setFormActive();
      setFormElementsActive();
      fillBlockOffer();
      getStartCoordinates(mapPinControl, 0);
    }
  };
  window.setFormActiveBlock = setFormActiveBlock;

  mapPinControl.addEventListener(`mousedown`, setFormActiveBlock);
  mapPinControl.addEventListener(`keydown`, setFormActiveBlock);
})();
