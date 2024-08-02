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
  avatarImage,
  addNewCardButton,
  profileNameInput,
  profileDescriptionInput,
  profileEditModal,
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

const avatar1 = document.querySelector(".avatar1");

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
  avatarImage: avatarImage,
});

// api
//   .getUserInfo()
//   .then((userData) => {
//     userInfo.setUserInfo({
//       title: userData.name,
//       description: userData.about,
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });
// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                   Functions;                                   ||
// // ! ||--------------------------------------------------------------------------------||

const modalElement = deleteCardModal.getElement();

function handleDeleteClick(card) {
  const id = card.getID();
  console.log(id);
  deleteCardModal.open(() => {
    deleteCardModal.setLoading();
    api
      .removeCard(id)
      .then(() => {
        console.log("Card removed successfully");
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

const avatarButton = document.querySelector(".avatar__button");
const updateAvatarModal = new ModalWithForm(
  "#update-avatar-modal",
  handleUpdateAvatarFormSubmit
);

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

// function changeAvatarPhoto(link)

function handleUpdateAvatarFormSubmit(inputValues) {
  console.log(inputValues);
  // const name = inputValues.title;
  const link = inputValues.url;
  updateAvatarModal.setLoading();
  // updateAvatarModal.setLoading(true, "Saving...");
  console.log(link);
  //this does produce the url
  api
    .changeProfilePicture(link)
    .then((data) => {
      console.log(data);
      // console.log(avatarButton);
      // console.log(avatarImage);
      // avatarImage.src = data.url;
      // console.log(data.avatar);
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
        // card.handleDeleteCard();
        deleteCardModal.close();
      })
      .catch((error) => {
        console.error("Error removing card:", error);
      });
  });
}

api
  .getUserInfo()
  .then((userData) => {
    console.log(userData);
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });
    userInfo.setAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

//HERE

// api
//   .getProfilePicture()
//   .then((url) => {
//     console.log(url);
//     // userInfo.setUserInfo({
//     //   title: userData.name,
//     //   description: userData.about,
//     // });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

function handleProfileEditSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserInfo(inputValues);
  profileEditPopup.setLoading();
  api
    .updateUserInfo(inputValues)
    .then((userData) => {
      console.log(userData);
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
  // profileEditPopup.reset();
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
