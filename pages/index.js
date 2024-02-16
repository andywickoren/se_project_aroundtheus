import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Get the profile form element
const profileForm = document.querySelector("#profile-edit-modal .modal__form");

// Create an instance of FormValidator and enable validation for the profile form
const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();

const addCardFormElement = document.querySelector(
  "#add-card-modal .modal__form"
);

const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addCardFormValidator.enableValidation();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Elements                                    ||
// ! ||--------------------------------------------------------------------------------||

const cardData = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// const cardData = {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// };

// const cardImageEl = cardElement.querySelector(".card__image");

// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

// const previewTemplate = document.querySelector("#preview-template");

// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalContainer = document.querySelector(
  "#profile-edit-modal-container"
);

//Notice the discrepancy  between how you select
// const addCardModal = document.querySelector("#add-card-modal");
// vs
// const profileFormElement = profileEditModal.querySelector(".modal__form");
const modalContainer = document.querySelector(".modal__container");
const imageModalContainer = document.querySelector(".modal__preview-image");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const modalElements = document.querySelectorAll(".modal");
// const modalElements = document.querySelector("#add-card-modal .modal__form")
const previewImage = document.querySelector(".modal__preview-image");
const previewImageLabel = previewImageModal.querySelector(
  ".modal__image-label"
);

//Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(
  "#edit-modal-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-modal-close-button"
);
const previewModalCloseButton = previewImageModal.querySelector(
  "#preview-modal-close-button"
);

//Form data
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileNameInput = profileFormElement.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                   Functions;                                   ||
// // ! ||--------------------------------------------------------------------------------||

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}
// function renderCard(cardData, wrapper) {
//   const cardElement = getCardElement(cardData);
//   wrapper.prepend(cardElement);
// }

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModals = document.querySelectorAll(".modal_opened");
    openModals.forEach((modal) => closeModal(modal));
  }
}

function handleModalClose(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

modalElements.forEach((modal) => {
  modal.addEventListener("mousedown", handleModalClose);
});

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Handlers                                 ||
// // ! ||--------------------------------------------------------------------------------||

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

// Update the event listener for form submission
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;

  // Create a new instance of Card with the submitted data
  const newCard = new Card({ name, link }, "#card-template", handleImageClick);

  // Get the view of the new card and append it to the DOM
  const newCardElement = newCard.getView();
  document.querySelector(".cards__list").appendChild(newCardElement);

  closeModal(addCardModal);
  e.target.reset();
}

// Attach the event listener to the form
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
// const cardImageEl = cardElement.querySelector(".card__image");
// const cardTitleEl = cardElement.querySelector(".card__title");
// const likeButton = cardElement.querySelector(".card__like-button");
// const deleteButton = cardElement.querySelector(".card__delete-button");

// deleteButton.addEventListener("click", () => {
//   cardElement.remove();
// });

// likeButton.addEventListener("click", () => {
//   likeButton.classList.toggle("card__like-button_active");
// });

// handleImageClick = cardImageEl.addEventListener("click", () => {
//   openModal(previewImageModal);
//   previewImage.src = cardData.link;
//   previewImage.alt = `Photo of ${cardData.name}`;
//   previewImageLabel.textContent = cardTitleEl.textContent;
// });

//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   cardTitleEl.textContent = cardData.name;
//   return cardElement;
// }

// function handleImageClick() {
//   openModal(previewImageModal);
//   previewImage.src = cardData.link;
//   previewImage.alt = `Photo of ${cardData.name}`;
//   previewImageLabel.textContent = cardTitleEl.textContent;
// }

function handleImageClick(name, link) {
  openModal(previewImageModal);
  previewImage.src = link;
  previewImage.alt = `Photo of ${name}`;
  previewImageLabel.textContent = name;
}

// cardImageEl.addEventListener("click", handleImageClick);

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Listeners                                ||
// // ! ||--------------------------------------------------------------------------------||

// Form Listeners

profileFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

//add new card button
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

// initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

function human(n) {
  const name = n;
  function sayHi() {
    console.log(`Hi I am ${name}`);
  }
  function sayHowYouFeel() {
    console.log(`${name} is feeling good!`);
  }
  return {
    sayHi,
    sayHowYouFeel,
  };
}

const card = new Card(cardData, "#card-template", handleImageClick);
const cards = cardData.map(
  (data) => new Card(data, "#card-template", handleImageClick)
);
cards.forEach((card) => {
  const cardElement = card.getView();
  // Append cardElement to the DOM, assuming you have a container element
  // For example:
  document.querySelector(".cards__list").appendChild(cardElement);
});

const testSaveButton = addCardModal.querySelector(".modal__save-button");
console.log(testSaveButton.validity);
