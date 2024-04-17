import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._modalForm = this._modalElement.querySelector(".modal__form");
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
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  reset() {
    this._modalForm.reset();
  }
}
