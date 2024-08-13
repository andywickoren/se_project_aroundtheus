import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._submitButton = this._modalElement.querySelector(
      ".modal__save-button"
    );
    this._submitButtonText = this._submitButton.textContent;
    this._inputs = this._modalForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const inputObj = {};

    this._inputs.forEach((input) => {
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

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  reset() {
    this._modalForm.reset();
  }
}
