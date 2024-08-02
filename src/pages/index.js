// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Imports                                     ||
// ! ||--------------------------------------------------------------------------------||

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithFormSubmit from "../components/ModalWithFormSubmit.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import {
  validationSettings,
  cardListSelector,
  profileForm,
  addCardFormElement,
  profileEditButton,
  profileName,
  profileDescription,
  avatarImage,
  addNewCardButton,
  profileNameInput,
  avatarButton,
  profileDescriptionInput,
} from "../utils/constants.js";

// ! ||--------------------------------------------------------------------------------||
// ! ||                        Initialization and Configuration                        ||
// ! ||--------------------------------------------------------------------------------||

const cardsList = new Section(
  {
    renderer: (card) => {
      const cardElement = createCard(card);
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);
const userInfo = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription,
  avatarImage: avatarImage,
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
});

const profileFormValidator = new FormValidator(validationSettings, profileForm);

const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

//Enable form validation

addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                     Modals                                     ||
// ! ||--------------------------------------------------------------------------------||

const addCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
const deleteCardModal = new ModalWithFormSubmit("#delete-card-modal");
const imageModal = new ModalWithImage("#preview-image-modal");
const profileEditPopup = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
const updateAvatarModal = new ModalWithForm(
  "#update-avatar-modal",
  handleUpdateAvatarFormSubmit
);

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                   Functions                                    ||
// // ! ||--------------------------------------------------------------------------------||

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

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    API Calls                                   ||
// ! ||--------------------------------------------------------------------------------||

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });
    userInfo.setAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getInitialCards()
  .then((cards) => {
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Handlers                                 ||
// // ! ||--------------------------------------------------------------------------------||

function handleDeleteClick(card) {
  const id = card.getID();
  deleteCardModal.open(() => {
    deleteCardModal.setLoading();
    api
      .removeCard(id)
      .then(() => {
        card.handleDeleteCard();
        deleteCardModal.close();
      })
      .catch((error) => {
        console.error("Error removing card:", error);
      })
      .finally(() => {
        deleteCardModal.resetButtonText();
      });
  });
}

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
function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;
  addCardModal.setLoading();
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
    })
    .finally(() => {
      addCardModal.resetButton();
    });
}

function handleUpdateAvatarFormSubmit(inputValues) {
  const link = inputValues.url;
  updateAvatarModal.setLoading();
  api
    .changeProfilePicture(link)
    .then((data) => {
      userInfo.setAvatar(data.avatar);
      updateAvatarModal.reset();
      updateAvatarModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      updateAvatarModal.resetButton();
    });
}

function handleUpdateAvatar() {
  const link = document.getElementById("avatar-image-url").value;
  updateAvatarModal.open(() => {
    api
      .changeProfilePicture(link)
      .then(() => {
        deleteCardModal.close();
      })
      .catch((error) => {
        console.error("Error removing card:", error);
      });
  });
}

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  profileEditPopup.setLoading();
  api
    .updateUserInfo(inputValues)
    .then((userData) => {
      userInfo.setUserInfo({
        title: userData.name,
        description: userData.about,
      });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditPopup.resetButton();
    });
  profileEditPopup.close();
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

avatarButton.addEventListener("click", () => {
  handleUpdateAvatar();
});

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  profileFormValidator.resetValidation();
  profileEditPopup.open();
});

imageModal.setEventListeners();
profileEditPopup.setEventListeners();
addCardModal.setEventListeners();
deleteCardModal.setEventListeners();
updateAvatarModal.setEventListeners();
