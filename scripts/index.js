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

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Elements                                    ||
// ! ||--------------------------------------------------------------------------------||

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewTemplate = document.querySelector("#preview-template");

// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalContainer = document.querySelector(
  "#profile-edit-modal-container"
);
const modalContainer = document.querySelector(".modal__container");
const imageModalContainer = document.querySelector(".modal__preview-image");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

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
  console.log("opened");
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// function overlayClose(modalContainer, modalTrigger, modalWindow) {
//   document.addEventListener("click", function (evt) {
//     if (!modalContainer.contains(evt.target) && evt.target !== modalTrigger) {
//       closeModal(modalWindow);
//     }
//   });
// }

function escapeClose(modal) {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal(modal);
    }
  });
}

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Handlers                                 ||
// // ! ||--------------------------------------------------------------------------------||

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
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  e.target.reset();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const previewImage = document.querySelector(".modal__preview-image");
  const previewImageLabel = previewImageModal.querySelector(
    ".modal__image-label"
  );

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    console.log("clicked");
    console.log(previewImage.src);
    openModal(previewImageModal);
    previewImage.src = cardData.link;
    previewImage.alt = `Photo of ${cardData.name}`;
    previewImageLabel.textContent = cardTitleEl.textContent;

    overlayClose(imageModalContainer, cardImageEl, previewImageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

overlayClose(modalContainer, profileEditButton, profileEditModal);
overlayClose(modalContainer, addNewCardButton, addCardModal);
// overlayClose(imageModalContainer, cardImageEl, previewImageModal);

escapeClose(profileEditModal);
escapeClose(addCardModal);

// // ! ||--------------------------------------------------------------------------------||
// // ! ||                                 Event Listeners                                ||
// // ! ||--------------------------------------------------------------------------------||

// Form Listeners

// document.addEventListener("keydown", function (event) {
//   if (event.key === "Escape") {
//     closeModal(profileEditModal);
//     closeModal(addCardModal);
//   }
// });

// document.addEventListener("click", function (evt) {
//   if (
//     !modalContainer.contains(evt.target) &&
//     evt.target !== profileEditButton
//   ) {
//     closeModal(profileEditModal);
//   }
// });

function overlayClose(evt, modal) {
  // console.log(modal);
  console.log(evt.target);
  if (!modal.contains(evt.target)) {
    closeModal(modal);
    // Remove the event listener after the modal is closed
    // modal.removeEventListener("click", overlayClose);
  }
}

// document.addEventListener("click", function (evt) {
//   console.log(evt.target.classList);
// });

profileEditModal.addEventListener("click", function (evt) {
  overlayClose(evt, profileEditModalContainer);
});

addCardModal.addEventListener("click", function (evt) {
  if (!addCardModal.contains(evt.target)) {
    closeModal(modalWindow);
  }
});

previewImageModal.addEventListener("click", function (evt) {
  if (!previewImageModal.contains(evt.target)) {
    closeModal(modalWindow);
  }
});

profileFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

//add new card button
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

previewModalCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
