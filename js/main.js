'use strict';

const NUMBER_OFFERS = 8;
const AVATARS = [`img/avatars/user01.png`, `img/avatars/user02.png`, `img/avatars/user03.png`, `img/avatars/user04.png`, `img/avatars/user05.png`, `img/avatars/user06.png`, `img/avatars/user07.png`, `img/avatars/user08.png`];
const TITLES = [`Заголовок 1`, `Заголовок 2`, `Заголовок 3`, `Заголовок 4`, `Заголовок 5`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const ROOMS = [1, 2, 3, 4, 5];
const ADDRESS = `600 300`;
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTION = `Описание 1`;
const GUESTS = [1, 2, 3, 4, 5];
const PRICE = 30000;
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const TYPE_HOUSING = [`palace`, `flat`, `house`, `bungalow`];
const pinOfferTemplate = document.querySelector(`#pin`).content;
const fieldMap = document.querySelector(`.map`);
const similarListElement = fieldMap.querySelector(`.map__pins`);

const getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

const makeMapActive = function () {
  document.querySelector(`.map`).classList.remove(`map--faded`);
};
makeMapActive();

const createOffer = function () {
  return {
    "author": {
      "avatar": AVATARS[0]
    },
    "offer": {
      "title": TITLES[0],
      "address": ADDRESS,
      "price": PRICE,
      "type": TYPE_HOUSING[0],
      "rooms": ROOMS[0],
      "guests": GUESTS[0],
      "checkin": CHECKIN[0],
      "checkout": CHECKOUT[0],
      "features": FEATURES,
      "description": DESCRIPTION,
      "photos": PHOTOS
    },
    "location": {
      "x": getRandomNumber(130, 630),
      "y": getRandomNumber(130, 630)
    }
  };
};

const createOffersMock = function () {
  let offersMock = [];

  for (let i = 0; i < NUMBER_OFFERS; i++) {
    offersMock.push(createOffer());
  }
  return offersMock;
};
const offers = createOffersMock();

const renderPinOffer = function (offer) {
  const offerElement = pinOfferTemplate.cloneNode(true);
  offerElement.querySelector(`.map__pin`).style.left = offer.location.x + `px`;
  offerElement.querySelector(`.map__pin`).style.top = offer.location.y + `px`;
  offerElement.querySelector(`.map__pin`).setAttribute(`src`, offer.author.avatar);
  offerElement.querySelector(`.map__pin`).setAttribute(`alt`, offer.offer.title);

  return offerElement;
};

const fillingBlockOffer = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPinOffer(offers[i]));
  }
  similarListElement.appendChild(fragment);
};
fillingBlockOffer();
