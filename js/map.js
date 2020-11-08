'use strict';

(function () {
  const MOUSE_BUTTON_LEFT = 0;
  const PIN_CONTROL_WIDTH = 65;
  const PIN_CONTROL_HEIGHT = 65;
  const PIN_CONTROL_ARROW = 22;
  const fieldMap = document.querySelector(`.map`);
  const mapPinControl = fieldMap.querySelector(`.map__pin--main`);
  const mapPinContolCenterX = PIN_CONTROL_WIDTH / 2;
  const mapPinControlCenterY = PIN_CONTROL_HEIGHT / 2;

  const setFormActive = function () {
    fieldMap.classList.remove(`map--faded`);
  };

  const setFormElementsInactive = function () {
    window.form.elementsForm.forEach(function (elementForm) {
      elementForm.disabled = true;
    });
    window.form.elementFormInput.disabled = true;
    window.form.noticeForm.classList.add(`ad-form--disabled`);
  };
  setFormElementsInactive();

  const setFormElementsActive = function () {
    window.form.elementsForm.forEach(function (elementForm) {
      elementForm.disabled = false;
    });
    window.form.elementFormInput.disabled = false;
    window.form.noticeForm.classList.remove(`ad-form--disabled`);
  };

  const getStartCoordinates = function (element, shift) {
    const coordinates = {
      "x": Math.floor(parseInt(element.style.left, 10) - mapPinContolCenterX),
      "y": Math.floor(parseInt(element.style.top, 10) - mapPinControlCenterY - shift)
    };
    window.form.fieldAddress.value = `${coordinates.x}, ${coordinates.y}`;
  };

  const setFormActiveBlock = function (evt) {
    if (evt.button === MOUSE_BUTTON_LEFT || evt.key === `Enter`) {
      setFormActive();
      setFormElementsActive();
      window.pin.fillBlockOffer();
      getStartCoordinates(mapPinControl, 0);
    }
  };

  mapPinControl.addEventListener(`mousedown`, setFormActiveBlock);
  mapPinControl.addEventListener(`keydown`, setFormActiveBlock);
  mapPinControl.addEventListener(`mousedown`, function (evt) {
    mapPinControl.removeEventListener(`mousedown`, setFormActiveBlock);
    mapPinControl.removeEventListener(`keydown`, setFormActiveBlock);
    evt.preventDefault();

    let shiftX = evt.clientX - mapPinControl.getBoundingClientRect().left;
    let shiftY = evt.clientY - mapPinControl.getBoundingClientRect().top;

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

    function onMouseMove(moveEvt) {
      let newLeft = moveEvt.clientX - shiftX - fieldMap.getBoundingClientRect().left;
      let newTop = moveEvt.clientY - shiftY - fieldMap.getBoundingClientRect().top;

      let rightEdge = fieldMap.offsetWidth - mapPinContolCenterX;
      if (newLeft < 0) {
        newLeft = -mapPinContolCenterX;
      } else if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      if (newTop < window.rangeY.min) {
        newTop = window.rangeY.min;
      } else if (newTop > window.rangeY.max) {
        newTop = window.rangeY.max;
      }

      mapPinControl.style.left = newLeft + `px`;
      mapPinControl.style.top = newTop + `px`;

      getStartCoordinates(mapPinControl, PIN_CONTROL_ARROW);
    }

    function onMouseUp() {
      document.removeEventListener(`mouseup`, onMouseUp);
      document.removeEventListener(`mousemove`, onMouseMove);
    }
  });

  mapPinControl.addEventListener(`dragstart`, function () {
    return false;
  });

  window.map = {
    fieldMap: fieldMap,
    getStartCoordinates: getStartCoordinates,
    setFormActiveBlock: setFormActiveBlock
  };
})();
