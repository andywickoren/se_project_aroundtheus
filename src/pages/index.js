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
  // headers: {
  //   authorization: "20e48b0c-8946-48f3-99d9-01b588193102",
  //   "Content-Type": "application/json",
  // },
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

/* This is important because this is where handleAddCardFormSubmit is passed into a different file
And that file is actually where the inputValues parameter becomes a definitive argument.  Index.js you
only have handleAddCardFormSubmit declared with a param and passed as a callback.  You don't know the 
value of the argument until you go to the module where the callback was passed.  You "follow the function
into the class", then the syntax highlighting
is helpful, eventually you see this._handleAddCardFormSubmit(inputValues); which is actually returned from
the private method
_getInputValues().  
So the answer for what is the value of the argument for handleAddCardForm submit
It is the object returned by getInputValues prviate method during the submit event, when the card is submitted.
getInputValues selects all the inputs, makes an object, and sets the name property equal
to the value of whatever was typed in, so you end up with just an object with name : value.   */

const addCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
const deleteCardModal = new ModalWithFormSubmit("#delete-card-modal");

/* Alright bro so now we create a new Section which has basically nothing defined except the callback
function and the selector.  We took items out of the constructor and placed it as a param of the 
renderItems method so that cardsList can be instantiated without needing this data from the API, therefore
new Section can be instantiated without being limited to a scope within 
api.getInitialCards().then(cards) => {} */

const cardsList = new Section(
  {
    renderer: (card) => {
      const cardElement = createCard(card);
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

/* This api mmethod fetches data from the server, at a specified URL, then we call renderItems with 
this data. Simple */

api
  .getInitialCards()
  .then((cards) => {
    cardsList.renderItems(cards);
  }) //should we be catching it here or in the class?  Here
  .catch((err) => {
    console.error(err); // log the error to the console
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

// now this is being passed to the setSubmitAction method of the setSubmitAction
// ModalWithFormSubmit
const modalElement = deleteCardModal.getElement();

function handleDeleteClick() {
  const id = this.getID();
  deleteCardModal.open();
  console.log(modalElement);
  const confirmDeleteElement = modalElement.querySelector(
    "#modal__confirm-card-delete"
  );
  console.log(confirmDeleteElement);
  confirmDeleteElement.addEventListener("click", () => {
    api.removeCard(id).then(() => {
      this.handleDeleteCard();
    });
  });
}

const confirmDeleteElement = modalElement.querySelector(
  "#modal__confirm-card-delete"
);

confirmDeleteElement.addEventListener("click", () => {
  api.removeCard(id).then(() => {
    this.handleDeleteCard();
  });
});

deleteCardModal.setSubmitAction(handleDeleteClick);

// function handleAddLike() {
//   const id = this.getID();
//   api.addLike(id).then(() => {
//     this.handleLikeIcon();
//   });
// }

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

// function handleRemoveLike() {
//   const id = this.getID();
//   api.removeLike(id).then(() => {
//     this.handleLikeIcon();
//   });
// }

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

function handleProfileEditSubmit(inputValues) {
  // userInfo.setUserInfo(inputValues);
  /*api
    .getUserInfo()
    .then((userData) => {
      userInfo.setUserInfo({
        title: userData.name,
        description: userData.about,
      });
    })
    .catch((err) => {
      console.error(err);
    });*/
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
