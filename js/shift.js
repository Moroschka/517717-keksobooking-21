'use strict';

(function () {
  const PIN_CONTROL_ARROW = 22;
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

      let rightEdge = fieldMap.offsetWidth - mapPinControlCenter.x;
      if (newLeft < 0) {
        newLeft = -mapPinControlCenter.x;
      } else if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      if (newTop < rangeY.min) {
        newTop = rangeY.min;
      } else if (newTop > rangeY.max) {
        newTop = rangeY.max;
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
})();
