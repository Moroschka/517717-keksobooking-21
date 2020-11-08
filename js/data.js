'use strict';

(function () {
  const NUMBER_OFFERS = 8;
  const CHECKIN = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const TYPE_HOUSING = {
    "flat": `Квартира`,
    "bungalow": `Бунгало`,
    "house": `Дом`,
    "palace": `Дворец`
  };
  const mapWidth = similarListElement.offsetWidth;
  const price = {
    min: 5000,
    max: 10000
  };
  const rooms = {
    min: 1,
    max: 5
  };
  const guests = {
    min: 1,
    max: 10
  };
  const rangeY = {
    min: 130,
    max: 630
  };

  const createOffersMock = function () {
    const createOffer = function (index) {
      const locationX = getRandomNumber(0, mapWidth);
      const locationY = getRandomNumber(rangeY.min, rangeY.max);
      return {
        "author": {
          "avatar": `img/avatars/user${(index < 10 ? `0${index}` : index)}.png`
        },
        "offer": {
          "title": `Заголовок ${index}`,
          "address": `${locationX}, ${locationY}`,
          "price": getRandomNumber(price.min, price.max),
          "type": TYPE_HOUSING[Object.keys(TYPE_HOUSING)[getRandomNumber(0, Object.keys(TYPE_HOUSING).length - 1)]],
          "rooms": getRandomNumber(rooms.min, rooms.max),
          "guests": getRandomNumber(guests.min, guests.max),
          "checkin": CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
          "checkout": CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
          "features": getRandomVariant(FEATURES),
          "description": `Описание ${index}`,
          "photos": getRandomVariant(PHOTOS),
          "id": `${index - 1}`
        },
        "location": {
          "x": locationX,
          "y": locationY
        }
      };
    };
    let offersMock = [];
    for (let i = 1; i <= NUMBER_OFFERS; i++) {
      offersMock.push(createOffer(i));
    }
    return offersMock;
  };
  window.offers = createOffersMock();
})();