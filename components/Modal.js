export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
  }

  open() {}

  close() {}

  _handleEscapeClose() {}

  setEventListeners() {}
}
