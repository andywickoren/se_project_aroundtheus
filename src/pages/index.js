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
import Api from "../components/Api";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "20e48b0c-8946-48f3-99d9-01b588193102",
    "Content-Type": "application/json",
  },
});

// GET https://around-api.en.tripleten-services.com/v1/users/me

// fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//   headers: {
//     authorization: "0afca99d-8153-447a-a5a2-e86af97bee8f",
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// api
//   .getInitialCards()
//   .then((result) => {
//     console.log(result);
//     // process the result
//   })
//   .catch((err) => {
//     console.error(err); // log the error to the console
//   });

// api
//   .getUserInfo()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.error(err); // log the error to the console
//   });

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

api
  .getInitialCards()
  .then((cards) => {
    const cardsList = new Section(
      {
        items: cards,
        renderer: (card) => {
          const cardElement = createCard(card);
          cardsList.addItem(cardElement);
        },
      },
      cardListSelector
    );
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

// api.getInitialCards().then((cards) => {
//   cardsList.renderItems(cards);
// });

const imageModal = new ModalWithImage("#preview-image-modal");
addCardFormValidator.enableValidation();

//Form data

const userInfo = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription,
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });
  })
  .catch((err) => {
    console.error(err); // log the error to the console
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

// fetch("https://api.kanye.rest")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

// fetch("https://api.kanye.rest")
//   .then((res) => res.text())
//   .then((data) => {
//     console.log(data);
//   });
