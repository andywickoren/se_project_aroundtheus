export default class Modal {
  constructor(modalSelector) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButton = this._modalElement.querySelector(".modal__close");
    this._handleModalClose = this._handleModalClose.bind(this);
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

  _handleModalClose(evt) {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close")
    ) {
      this.close();
    }
  }

  getElement() {
    return this._modalElement;
  }

  setEventListeners() {
    this._modalElement.addEventListener("mousedown", this._handleModalClose);
  }
}
