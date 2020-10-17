'use strict';

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
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MOUSE_BUTTON_LEFT = 0;
/*
const IMAGE_WIDTH = 45;
const IMAGE_HEIGHT = 40;
*/
const PIN_CONTROL_WIDTH = 62;
const PIN_CONTROL_HEIGHT = 62;
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
const pinOfferTemplate = document.querySelector(`#pin`).content;
/*
const cardTemplate = document.querySelector(`#card`).content;
*/
const fieldMap = document.querySelector(`.map`);
const mapPinControl = fieldMap.querySelector(`.map__pin`);
const similarListElement = fieldMap.querySelector(`.map__pins`);
const mapPinContolCenterX = PIN_CONTROL_WIDTH / 2;
const mapPinControlCenterY = PIN_CONTROL_HEIGHT / 2;
const noticeForm = document.querySelector(`.ad-form`);
const elementsForm = noticeForm.querySelectorAll(`.ad-form__element`);
const elementFormInput = noticeForm.querySelector(`.ad-form-header__input`);
const fieldAddress = noticeForm.querySelector(`#address`);
const roomsNumber = noticeForm.querySelector(`#room_number`);
const capacity = noticeForm.querySelector(`#capacity`);
const mapWidth = similarListElement.offsetWidth;
const limits = fieldMap.getBoundingClientRect();
const limitsMapBlock = {
  top: 0,
  right: limits.width - mapPinContolCenterX,
  bottom: limits.height - PIN_CONTROL_HEIGHT,
  left: -mapPinContolCenterX
};

const getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomVariant = function (data) {
  return data.filter(() => Math.random() < 0.5);
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
        "photos": getRandomVariant(PHOTOS)
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
const offers = createOffersMock();

const renderPinOffer = function (offer) {
  const pinOfferElement = pinOfferTemplate.cloneNode(true);
  pinOfferElement.querySelector(`.map__pin`).style.left = (offer.location.x + PIN_WIDTH / 2) + `px`;
  pinOfferElement.querySelector(`.map__pin`).style.top = (offer.location.y + PIN_HEIGHT) + `px`;
  pinOfferElement.querySelector(`.map__pin img`).setAttribute(`src`, offer.author.avatar);
  pinOfferElement.querySelector(`.map__pin img`).setAttribute(`alt`, offer.offer.title);
  return pinOfferElement;
};
/*
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
*/
const fillBlockOffer = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPinOffer(offers[i]));
  }
  similarListElement.appendChild(fragment);
};
/*
const fillBlockCard = function () {
  similarListElement.appendChild(renderCard(offers[0]));
};
*/
const setFormActive = function () {
  fieldMap.classList.remove(`map--faded`);
};

const setFormElementsInactive = function () {
  elementsForm.forEach(function (elementForm) {
    elementForm.disabled = true;
  });
  elementFormInput.disabled = true;
};
setFormElementsInactive();

const setFormElementsActive = function () {
  elementsForm.forEach(function (elementForm) {
    elementForm.disabled = false;
  });
  elementFormInput.disabled = false;
  noticeForm.classList.remove(`ad-form--disabled`);
};

let getStartCoordinates = function (element) {
  const coordinates = {
    "x": Math.floor(parseInt(element.style.left, 10) + mapPinContolCenterX),
    "y": Math.floor(parseInt(element.style.top, 10) + mapPinControlCenterY)
  };
  return `${coordinates.x}, ${coordinates.y}`;
};

const transferAddressCoordinates = function () {
  fieldAddress.value = getStartCoordinates(mapPinControl);
};
transferAddressCoordinates();


mapPinControl.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();
  if (evt.button === MOUSE_BUTTON_LEFT) {
    setFormActive();
    setFormElementsActive();
    fillBlockOffer();
  }
});

mapPinControl.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    setFormActive();
    setFormElementsActive();
    fillBlockOffer();
  }
});


mapPinControl.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };

    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if ((mapPinControl.offsetLeft - shift.x) < limitsMapBlock.left) {
      mapPinControl.style.left = limitsMapBlock.left + `px`;
    } else if ((mapPinControl.offsetLeft - shift.x) > limitsMapBlock.right) {
      mapPinControl.style.left = limitsMapBlock.right + `px`;
    }

    if ((mapPinControl.offsetTop - shift.y) < limitsMapBlock.top) {
      mapPinControl.style.top = limitsMapBlock.top + `px`;
    } else if ((mapPinControl.offsetTop - shift.y) > limitsMapBlock.bottom) {
      mapPinControl.style.top = limitsMapBlock.bottom + `px`;
    }

    mapPinControl.style.left = (mapPinControl.offsetLeft - shift.x) + `px`;
    mapPinControl.style.top = (mapPinControl.offsetTop - shift.y) + `px`;

    fieldAddress.value = getStartCoordinates(mapPinControl);
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

const compareRoomsAndCapacity = function () {
  let capacityOptions = capacity.options;
  let roomsNumberValue = roomsNumber.value;
  for (let option of capacityOptions) {
    if (option.value <= roomsNumberValue && option.value !== `0` && roomsNumberValue !== `100`) {
      option.hidden = false;
      option.selected = true;
    } else if (option.value === `0` && roomsNumberValue === `100`) {
      option.hidden = false;
      option.selected = true;
    } else {
      option.hidden = true;
      option.selected = false;
    }
  }
};
roomsNumber.addEventListener(`change`, compareRoomsAndCapacity);


const onCapacityChange = function () {
  if (capacity.value && roomsNumber.value && capacity.value > roomsNumber.value || capacity.value === `0`) {
    capacity.setCustomValidity(`Количество гостей должно быть не более ${roomsNumber.value}!`);
  } else {
    capacity.setCustomValidity(``);
  }
  capacity.reportValidity();
};
capacity.addEventListener(`change`, onCapacityChange);
