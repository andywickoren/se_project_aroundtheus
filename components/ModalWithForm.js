import Modal from "./Modal.js";

class ModalWithFrom extends Popup {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._modalForm.reset();
    super.close();
  }
}
