export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const initialCards = [
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

export const cardListSelector = ".cards__list";
export const profileForm = document.forms["edit-modal-form"];
export const addCardFormElement = document.forms["add-card-form"];
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileModalCloseButton = profileEditModal.querySelector(
  "#edit-modal-close-button"
);
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profileFormElement =
  profileEditModal.querySelector(".modal__form");
export const profileNameInput = profileFormElement.querySelector(
  ".modal__input_type_name"
);
export const profileDescriptionInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
