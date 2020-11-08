'use strict';

(function () {
const getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
window.getRandomNumber = getRandomNumber;

const getRandomVariant = function (data) {
  return data.filter(() => Math.random() < 0.5);
};
window.getRandomVariant = getRandomVariant;
})();