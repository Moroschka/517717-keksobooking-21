'use strict';

(function () {
  const IMAGE_WIDTH = 45;
  const IMAGE_HEIGHT = 40;
  const cardTemplate = document.querySelector(`#card`).content;

  const renderCard = function (card) {
    const cardElement = cardTemplate.cloneNode(true);
    const featuresList = cardElement.querySelector(`.popup__features`);
    const imagesList = cardElement.querySelector(`.popup__photos`);
    featuresList.innerHTML = ``;
    imagesList.innerHTML = ``;
    const createFeaturesList = function (features) {
      const featuresFragment = document.createDocumentFragment();
      features.forEach(function (feature, i) {
        feature = document.createElement(`li`);
        feature.setAttribute(`class`, `popup__feature popup__feature--${features[i]}`);
        featuresFragment.append(feature);
      });
      return featuresFragment;
    };

    const createImagesList = function (images) {
      const imagesFragment = document.createDocumentFragment();
      images.forEach(function (img, i) {
        const photoElement = new Image(IMAGE_WIDTH, IMAGE_HEIGHT);
        photoElement.src = `${images[i]}`;
        photoElement.alt = `Фотография жилья`;
        photoElement.classList.add(`popup__photo`);
        imagesFragment.append(photoElement);
      });
      return imagesFragment;
    };

    featuresList.append(createFeaturesList(card.offer.features));
    imagesList.append(createImagesList(card.offer.photos));
    cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${card.offer.price} ₽/ночь`;
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
    cardElement.querySelector(`.popup__type`).textContent = card.offer.type;
    cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, card.author.avatar);
    cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
    return cardElement;
  };

  const onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      removeCard();
    }
  };

  const fillBlockCard = function (index) {
    window.pin.similarListElement.appendChild(renderCard(window.offers[index]));

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const removeCard = function () {
    const mapCard = window.map.fieldMap.querySelector(`.map__card`);
    if (mapCard) {
      mapCard.remove();
    }
  };

  const getCardOfPin = function (evt) {
    let targetMap = evt.target.closest(`button`);

    if (targetMap && targetMap.hasAttribute(`id`)) {
      let index = targetMap.getAttribute(`id`);
      removeCard();
      fillBlockCard(index);
    } else if (targetMap && targetMap.classList.contains(`popup__close`)) {
      removeCard();

      document.removeEventListener(`keydown`, onPopupEscPress);
      document.removeEventListener(`keydown`, onPopupKeydownPress);
    }
  };

  const onPopupKeydownPress = function (evt) {
    if (evt.key === `Enter`) {
      getCardOfPin(evt);
    }
  };

  window.map.fieldMap.addEventListener(`click`, getCardOfPin);
  window.map.fieldMap.addEventListener(`keydown`, onPopupKeydownPress);
})();
