import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  cardListSelector,
  profileForm,
  addCardFormElement,
  profileEditButton,
  profileName,
  profileDescription,
  addNewCardButton,
  profileNameInput,
  profileDescriptionInput,
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(validationSettings, profileForm);

profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Elements                                    ||
// ! ||--------------------------------------------------------------------------------||

const addCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

const imageModal = new ModalWithImage("#preview-image-modal");

cardsList.renderItems();

addCardFormValidator.enableValidation();

//Form data

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

function handleAddCardFormSubmit(inputValues) {
  console.log(this._modalForm);
  const name = inputValues.title;
  const link = inputValues.url;
  const newCardElement = createCard({ name, link });
  cardsList.prependItem(newCardElement);
  addCardModal.close();
  addCardFormValidator.resetValidation();
  addCardModal.reset();
}

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  profileEditPopup.close();
  profileEditPopup.reset();
}

function handleImageClick(name, link) {
  imageModal.open(name, link);
}

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Listeners                                ||
// // ! ||--------------------------------------------------------------------------------||

addNewCardButton.addEventListener("click", () => {
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
  profileFormValidator.resetValidation();
  profileEditPopup.open();
});
