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
// const addCardModal = new ModalWithForm(
//   "#add-card-modal",
//   handleAddCardFormSubmit
// );
const addCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

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
// const addCardModalCloseButton = addCardModal.querySelector(
//   "#add-card-modal-close-button"
// );
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

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscape);
// }

function closeModal(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", handleEscape);
}

// function handleEscape(evt) {
//   if (evt.key === "Escape") {
//     const openModals = document.querySelectorAll(".modal_opened");
//     openModals.forEach(closeModal);
//   }
// }

// function handleModalClose(evt) {
//   if (
//     evt.target.classList.contains("modal") ||
//     evt.target.classList.contains("modal__close")
//   ) {
//     closeModal(evt.currentTarget);
//   }
// }

// modalElements.forEach((modal) => {
//   modal.addEventListener("mousedown", handleModalClose);
// });

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Handlers                                 ||
// // ! ||--------------------------------------------------------------------------------||

// old logic
function createCard({ name, link }) {
  const newCard = new Card({ name, link }, "#card-template", handleImageClick);
  const newCardElement = newCard.getView();
  return newCardElement;
}

//Form data
// const profileName = document.querySelector(".profile__name");
// const profileDescription = document.querySelector(".profile__description");

const userInfo = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription,
});

// const currentUser = userInfo.getUserInfo();
// console.log(currentUser.name);

// console.log(currentUser.description);

// profileForm.addEventListener("submit", (e) => {
//   userProfile.getUserInfo(profileName, profileDescription);
//   userProfile.setUserInfo(profileName, profileDescription);
//   profileFormValidator.resetValidation();
//   profileEditPopup.close();
// });
//this is be implemented with UserInfo class/methodos
function handleProfileEditSubmit(e) {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditPopup.close(); // why not addCardModal.close() ?
  // e.target.reset();
  profileFormValidator.resetValidation();
}

// function handleProfileEditSubmit(e) {
//   const formData = {
//     profileName: profileNameInput.value,
//     profileDescription: profileDescriptionInput.value,
//   };
//   console.log(formData);
//   const userInfo = new UserInfo(formData);
//   userInfo.setUserInfo();

//   profileEditModal.close();
//   profileFormValidator.resetValidation();
// }

function handleAddCardFormSubmit(e) {
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  const newCardElement = createCard({ name, link });
  cardsList.prependItem(newCardElement);
  addCardModal.close();
  // same here
  // e.target.reset();
  addCardFormValidator.resetValidation();
}

// Old logic
// function handleImageClick(name, link) {
//   const imageModal = new ModalWithImage();
//   openModal(previewImageModal);
//   previewImage.src = link;
//   previewImage.alt = `Photo of ${name}`;
//   previewImageLabel.textContent = name;
// }

const imageModal = new ModalWithImage("#preview-image-modal");
function handleImageClick(name, link) {
  imageModal.open(name, link);
}

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Listeners                                ||
// // ! ||--------------------------------------------------------------------------------||

// Form Listeners

// profileFormElement.addEventListener("submit", handleProfileEditSubmit);
// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      const cardElement = card.getView();
      cardsList.addItem(cardElement);
      //logic
    },
  },
  cardListSelector
);

cardsList.renderItems();

// old logic
// profileEditButton.addEventListener("click", () => {
//   profileNameInput.value = profileName.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openModal(profileEditModal);
// });

// With object literals, not working
// profileEditButton.addEventListener("click", () => {
//   const profileEditModal = document.querySelector("#profile-edit-modal");
//   const modal = new ModalWithForm({
//     modalSelector: profileEditModal, // Pass the modal element directly
//     handleFormSubmit: handleProfileEditSubmit,
//   });
//   modal.open();
// });

//HERE

// addNewCardButton.addEventListener("click", () => openModal(addCardModal));
// addNewCardButton.addEventListener("click", () => openModal(addCardModal));

addNewCardButton.addEventListener("click", () => {
  console.log("test");
  // const addCardModal = new ModalWithForm(
  //   "#add-card-modal",
  //   handleAddCardFormSubmit
  // );
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

  //getUserInfo()
  // profileNameInput.value = profileName.textContent;
  // profileDescriptionInput.value = profileDescription.textContent;

  // profileEditPopup.open();
});

// // This is the old logic
// // initialCards.forEach((card) => {
// //   const cardElement = createCard(card);
// //   cardsList.appendChild(cardElement);
// // });

// const newCardModal = new ModalWithForm("#add-card-modal", () => {});
// newCardModal.open();

// newCardModal.close();

// index.js;
