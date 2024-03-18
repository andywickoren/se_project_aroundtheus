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
    console.log("Modal element:", this._modalElement); // This works, so it's connected
    this._modalForm = this._modalElement.querySelector(".modal__form");
    console.log("Modal form:", this._modalForm); // This shows the corerct element
    this._handleFormSubmit = handleFormSubmit;
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
    super.setEventListeners(); // Call the parent method to retain its functionality
    this._modalForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues); // Pass input values to the provided handler
    });
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  open() {
    super.open();
    console.log("open");
  }
}
