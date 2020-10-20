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
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const IMAGE_WIDTH = 45;
const IMAGE_HEIGHT = 40;
const PIN_CONTROL_WIDTH = 65;
const PIN_CONTROL_HEIGHT = 65;
const PIN_CONTROL_ARROW = 22;
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
const cardTemplate = document.querySelector(`#card`).content;
const fieldMap = document.querySelector(`.map`);
const mapPinControl = fieldMap.querySelector(`.map__pin--main`);
const similarListElement = fieldMap.querySelector(`.map__pins`);
const mapPinContolCenterX = PIN_CONTROL_WIDTH / 2;
const mapPinControlCenterY = PIN_CONTROL_HEIGHT / 2;
const noticeForm = document.querySelector(`.ad-form`);
const elementsForm = noticeForm.querySelectorAll(`.ad-form__element`);
const elementFormInput = noticeForm.querySelector(`.ad-form-header__input`);
const titleInput = noticeForm.querySelector(`#title`);
const typeSelect = noticeForm.querySelector(`#type`);
const priceInput = noticeForm.querySelector(`#price`);
const typePrice = {
  "bungalow": 0,
  "flat": 1000,
  "house": 5000,
  "palace": 10000
};
const time = noticeForm.querySelector(`.ad-form__element--time`);
const timeOut = noticeForm.querySelector(`#timeout`);
const timeIn = noticeForm.querySelector(`#timein`);
const fieldAddress = noticeForm.querySelector(`#address`);
const roomsNumber = noticeForm.querySelector(`#room_number`);
const capacity = noticeForm.querySelector(`#capacity`);
const mapWidth = similarListElement.offsetWidth;

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

const fillBlockOffer = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPinOffer(offers[i]));
  }
  similarListElement.appendChild(fragment);
};

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    removeCard();
  }
};

const fillBlockCard = function (index) {
  similarListElement.appendChild(renderCard(offers[index]));

  document.addEventListener(`keydown`, onPopupEscPress);
};

const removeCard = function () {
  const mapCards = fieldMap.querySelectorAll(`.map__card`);
  for (let i = 0; i < mapCards.length; i++) {
    mapCards[i].remove();
  }
};

const closePopupCard = function () {
  const closePopup = fieldMap.querySelector(`.popup__close`);
  closePopup.addEventListener(`click`, removeCard);
};

const getCardWork = function (index) {
  removeCard();
  fillBlockCard(index);
  closePopupCard();
};

const getCardOfPin = function () {
  const mapPins = similarListElement.querySelectorAll(`.map__pin[type="button"]`);
  for (let i = 0; i < mapPins.length; i++) {
    mapPins[i].addEventListener(`click`, function () {
      getCardWork(i);
    });

    mapPins[i].addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        getCardWork(i);
      }
    });
  }
  document.removeEventListener(`keydown`, onPopupEscPress);
};

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
    "x": Math.floor(parseInt(element.style.left, 10) - mapPinContolCenterX),
    "y": Math.floor(parseInt(element.style.top, 10) - mapPinControlCenterY - shift)
  };
  fieldAddress.value = `${coordinates.x}, ${coordinates.y}`;
};

const setFormActiveBlock = function (evt) {
  if (evt.button === MOUSE_BUTTON_LEFT || evt.key === `Enter`) {
    setFormActive();
    setFormElementsActive();
    fillBlockOffer();
    getStartCoordinates(mapPinControl, 0);
    getCardOfPin();
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

const compareRoomsAndCapacity = function () {
  let capacityOptions = capacity.options;
  let roomsNumberValue = roomsNumber.value;
  for (let option of capacityOptions) {
    if (option.value <= roomsNumberValue && option.value !== `0` && roomsNumberValue !== `100` || option.value === `0` && roomsNumberValue === `100`) {
      option.hidden = false;
      option.selected = true;
    } else {
      option.hidden = true;
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

titleInput.addEventListener(`input`, function () {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} символы`);
  } else {
    titleInput.setCustomValidity(``);
  }
  titleInput.reportValidity();
});

const getTime = function (evt) {
  let targetValue = evt.target.value;
  if (evt.target.matches(`#timein`)) {
    timeOut.value = targetValue;
  } else if (evt.target.matches(`#timeout`)) {
    timeIn.value = targetValue;
  }
};
time.addEventListener(`change`, getTime);

const getPrice = function (evt) {
  let targetKey = evt.target.value;
  let targetValue = typePrice[targetKey];
  priceInput.setAttribute(`min`, targetValue);
  priceInput.setAttribute(`placeholder`, `${targetValue}`);
};
typeSelect.addEventListener(`change`, getPrice);

priceInput.addEventListener(`invalid`, function () {
  if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity(`Цена должна быть не ниже ${typePrice[typeSelect.value]} рублей`);
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity(`Цена не должна превышать ${MAX_PRICE} рублей`);
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity(`Обязательное поле`);
  } else {
    priceInput.setCustomValidity(``);
  }
});