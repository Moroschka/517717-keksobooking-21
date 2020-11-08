'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const pinOfferTemplate = document.querySelector(`#pin`).content;
  window.similarListElement = fieldMap.querySelector(`.map__pins`);

  const renderPinOffer = function (offer) {
    const pinOfferElement = pinOfferTemplate.cloneNode(true);
    pinOfferElement.querySelector(`.map__pin`).style.left = (offer.location.x + PIN_WIDTH / 2) + `px`;
    pinOfferElement.querySelector(`.map__pin`).style.top = (offer.location.y + PIN_HEIGHT) + `px`;
    pinOfferElement.querySelector(`.map__pin`).setAttribute(`id`, offer.offer.id);
    pinOfferElement.querySelector(`.map__pin img`).setAttribute(`src`, offer.author.avatar);
    pinOfferElement.querySelector(`.map__pin img`).setAttribute(`alt`, offer.offer.title);
    return pinOfferElement;
  };

  const fillBlockOffer = function () {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < offers.length; i++) {
      fragment.appendChild(renderPinOffer(offers[i]));
    }
    similarListElement.appendChild(fragment);
  };
  window.fillBlockOffer = fillBlockOffer;
})();
