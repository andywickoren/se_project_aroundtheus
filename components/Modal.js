export default class Modal {
  constructor(modalSelector) {
    this._modalElement = document.querySelector(modalSelector);
  }

  open() {
    this._modalElement.classList.add("modal__opened");
    document.addEventListener("keydown", this._handleEscape);
  }

  close() {
    this._modalElement.classList.remove("modal__opened");
    document.removeEventListener("keydown", this._handleEscape);
  }

  _handleEscape = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._modalElement.addEventListener("mousedown", handleModalClose); //this should close for overlay and close button
  }
}
