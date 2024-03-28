import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._name = this._modalElement.querySelector(".modal__image-label");
    this._image = this._modalElement.querySelector(".modal__preview-image");
  }

  open(name, link) {
    this._image.src = link;
    this._name.textContent = name;
    this._image.alt = `Photo of ${this._name}`;

    super.open();
  }
}
