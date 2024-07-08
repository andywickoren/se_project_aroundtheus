import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Modal from "../components/Modal.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithFormSubmit from "../components/ModalWithFormSubmit.js";
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
});

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
const deleteCardModal = new ModalWithFormSubmit("#delete-card-modal");

const cardsList = new Section(
  {
    renderer: (card) => {
      const cardElement = createCard(card);
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

api
  .getInitialCards()
  .then((cards) => {
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

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
    console.error(err);
  });
// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                   Functions;                                   ||
// // ! ||--------------------------------------------------------------------------------||

const modalElement = deleteCardModal.getElement();

function handleDeleteClick(card) {
  const id = card.getID();
  console.log(id);
  deleteCardModal.open(() => {
    api
      .removeCard(id)
      .then(() => {
        console.log("Card removed successfully");
        card.handleDeleteCard();
        deleteCardModal.close();
      })
      .catch((error) => {
        console.error("Error removing card:", error);
      });
  });
}

const avatarButton = document.querySelector(".avatar__button");
const updateAvatarModal = new ModalWithForm(
  "#update-avatar-modal",
  handleUpdateAvatarFormSubmit
);

const avatarImage = document.querySelector(".profile__image");

function testFunction() {
  console.log("got it");
}

// deleteCardModal.setSubmitAction(handleDeleteClick);
// updateAvatarModal.setSubmitAction(handleUpdateAvatar);

function handleAddLike(card) {
  const id = card.getID();
  api
    .addLike(id)
    .then((updatedCardData) => {
      card.setLiked(true);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleRemoveLike(card) {
  const id = card.getID();
  api
    .removeLike(id)
    .then((updatedCardData) => {
      card.setLiked(false);
    })
    .catch((err) => {
      console.error(err);
    });
}

function createCard(data) {
  const newCard = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleAddLike,
    handleRemoveLike
  );
  const newCardElement = newCard.getView();
  return newCardElement;
}

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Handlers                                 ||
// // ! ||--------------------------------------------------------------------------------||

function handleAddCardFormSubmit(inputValues) {
  // console.log(this._modalForm);
  const name = inputValues.title;
  const link = inputValues.url;
  api
    .addCard({ name, link })
    .then((newCardData) => {
      const newCardElement = createCard(newCardData);
      cardsList.prependItem(newCardElement);
      addCardModal.close();
      addCardFormValidator.resetValidation();
      addCardModal.reset();
    })
    .catch((err) => {
      console.error(err);
    });
}

// function changeAvatarPhoto(link)

function handleUpdateAvatarFormSubmit(inputValues) {
  console.log(inputValues);
  // const name = inputValues.title;
  const link = inputValues.url;
  console.log(link);
  api.changeProfilePicture(link).then((data) => {
    console.log(data);
    console.log(avatarButton);
    console.log(avatarImage);
    avatarImage.src = data.url;
    updateAvatarModal.close();
    updateAvatarModal.reset();

    // const newCardElement = createCard(newCardData);
    // cardsList.prependItem(newCardElement);
    // addCardModal.close();
    // addCardFormValidator.resetValidation();
    // addCardModal.reset();
  });
  //   .catch((err) => {
  //     console.error(err);
  //   });
}

avatarButton.addEventListener("click", () => {
  handleUpdateAvatar();
});

function handleUpdateAvatar() {
  const link = document.getElementById("avatar-image-url").value;
  console.log(link);
  updateAvatarModal.open(() => {
    console.log("there");
    api
      .changeProfilePicture(link)
      .then(() => {
        console.log("Profile photo changed successfully");
        card.handleDeleteCard();
        deleteCardModal.close();
      })
      .catch((error) => {
        console.error("Error removing card:", error);
      });
  });
}
function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  api
    .getUserInfo()
    .then((userData) => {
      userInfo.setUserInfo({
        title: userData.name,
        description: userData.about,
      });
    })
    .catch((err) => {
      console.error(err);
    });
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
deleteCardModal.setEventListeners();
updateAvatarModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  profileFormValidator.resetValidation();
  profileEditPopup.open();
});
