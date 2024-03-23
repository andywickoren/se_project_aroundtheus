import Modal from "./Modal.js";

// export default class ModalWithForm extends Modal {
//   constructor({ modalSelector, handleFormSubmit }) {
//     super({ modalSelector });
//     this._modalForm = this._modalElement.querySelector(".modal__form");
//     this._handleFormSubmit = handleFormSubmit;
//   }

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    // console.log("Modal element:", this._modalElement); // This works, so it's connected
    this._modalForm = this._modalElement.querySelector(".modal__form");
    // console.log("Modal form:", this._modalForm); // This shows the corerct element
    // this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = this._modalForm.querySelectorAll(".modal__input");
    const inputObj = {};

    inputs.forEach((input) => {
      inputObj[input.name] = input.value;
    });

    return inputObj;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (event) => {
      console.log(3);
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this._modalForm.removeEventListener("submit", this._handleFormSubmit);
    });
  }

  close() {
    this._modalForm.reset();
    this._modalElement.removeEventListener("mousedown", this._handleModalClose);
    super.close();
  }

  open() {
    super.open();
    console.log("open");
  }
}
