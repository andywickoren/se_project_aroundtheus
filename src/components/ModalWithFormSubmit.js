import Modal from "./Modal.js";

export default class ModalWithFormSubmit extends Modal {
  _setSubmitAction(submitCallback) {
    this._submitCallback = submitCallback;
    this._submitButton = document.querySelector("#modal__confirm-card-delete");
    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    const form = this._modalElement.querySelector(".modal__form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._submitCallback) {
        this._submitCallback();
      }
    });
  }

  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  resetButtonText() {
    this._submitButton.textContent = "Yes";
  }

  open(submitCallback) {
    this._setSubmitAction(submitCallback);
    super.open();
  }
}
