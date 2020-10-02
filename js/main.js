'use strict';

const NUMBER_OFFERS = 8;
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const TYPE_HOUSING = [`palace`, `flat`, `house`, `bungalow`];
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const pinOfferTemplate = document.querySelector(`#pin`).content;
const fieldMap = document.querySelector(`.map`);
const similarListElement = fieldMap.querySelector(`.map__pins`);
const mapWidth = similarListElement.offsetWidth;

const getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

const makeMapActive = function () {
  document.querySelector(`.map`).classList.remove(`map--faded`);
};
makeMapActive();

const createOffersMock = function () {
  const createOffer = function (index) {
    const locationX = getRandomNumber(PIN_WIDTH, mapWidth - PIN_WIDTH);
    const locationY = getRandomNumber(130, 630);

    return {
      "author": {
        "avatar": `img/avatars/user` + (index < 10 ? `0${index}` : index) + `.png`
      },
      "offer": {
        "title": `Заголовок ${index}`,
        "address": `${locationX}, ${locationY}`,
        "price": getRandomNumber(5000, 100000),
        "type": TYPE_HOUSING[getRandomNumber(0, TYPE_HOUSING.length)],
        "rooms": getRandomNumber(1, 5),
        "guests": getRandomNumber(1, 10),
        "checkin": CHECKIN[getRandomNumber(0, CHECKIN.length)],
        "checkout": CHECKOUT[getRandomNumber(0, CHECKOUT.length)],
        "features": FEATURES[getRandomNumber(0, FEATURES.length)],
        "description": `Описание ${index}`,
        "photos": PHOTOS[getRandomNumber(0, PHOTOS.length)]
      },
      "location": {
        "x": locationX,
        "y": locationY
      }
    };
  };

  let offersMock = [];
  for (let i = 1; i < NUMBER_OFFERS + 1; i++) {
    offersMock.push(createOffer(i));
  }
  return offersMock;
};
const offers = createOffersMock();

const renderPinOffer = function (offer) {
  const pinOfferElement = pinOfferTemplate.cloneNode(true);
  pinOfferElement.querySelector(`.map__pin`).style.left = (offer.location.x + PIN_WIDTH / 2) + `px`;
  pinOfferElement.querySelector(`.map__pin`).style.top = (offer.location.y + PIN_HEIGHT) + `px`;
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
fillBlockOffer();
