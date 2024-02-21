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

const cardsList = document.querySelector(".cards__list");

const profileForm = document.forms["edit-modal-form"];
const addCardFormElement = document.forms["add-card-form"];

const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

addCardFormValidator.enableValidation();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Elements                                    ||
// ! ||--------------------------------------------------------------------------------||

const initialCards = [
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

const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const modalElements = document.querySelectorAll(".modal");
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

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModals = document.querySelectorAll(".modal_opened");
    openModals.forEach(closeModal);
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

function createCard({ name, link }) {
  const newCard = new Card({ name, link }, "#card-template", handleImageClick);
  const newCardElement = newCard.getView();
  return newCardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  const newCardElement = createCard({ name, link });
  cardsList.prepend(newCardElement);
  closeModal(addCardModal);
  e.target.reset();
  addCardFormValidator.resetValidation();
}

function handleImageClick(name, link) {
  openModal(previewImageModal);
  previewImage.src = link;
  previewImage.alt = `Photo of ${name}`;
  previewImageLabel.textContent = name;
}

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
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardsList.appendChild(cardElement);
});
