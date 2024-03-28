import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const cardListSelector = ".cards__list";

const profileForm = document.forms["edit-modal-form"];
const addCardFormElement = document.forms["add-card-form"];

const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

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

const addCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

const previewImageModal = document.querySelector("#preview-image-modal");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      const cardElement = card.getView();
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

const imageModal = new ModalWithImage("#preview-image-modal");

cardsList.renderItems();

addCardFormValidator.enableValidation();

//Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(
  "#edit-modal-close-button"
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

const userInfo = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription,
});

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                   Functions;                                   ||
// // ! ||--------------------------------------------------------------------------------||

function createCard({ name, link }) {
  const newCard = new Card({ name, link }, "#card-template", handleImageClick);
  const newCardElement = newCard.getView();
  return newCardElement;
}

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Handlers                                 ||
// // ! ||--------------------------------------------------------------------------------||

function handleProfileEditSubmit(e) {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditPopup.close();
  profileFormValidator.resetValidation();
}

function handleAddCardFormSubmit(e) {
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  const newCardElement = createCard({ name, link });
  cardsList.prependItem(newCardElement);
  addCardModal.close();
  addCardFormValidator.resetValidation();
}

function handleImageClick(name, link) {
  imageModal.open(name, link);
}

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Listeners                                ||
// // ! ||--------------------------------------------------------------------------------||

addNewCardButton.addEventListener("click", () => {
  console.log("test");
  addCardModal.open();
});

const profileEditPopup = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

imageModal.setEventListeners();
profileEditPopup.setEventListeners();
addCardModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  profileEditPopup.open();
});
