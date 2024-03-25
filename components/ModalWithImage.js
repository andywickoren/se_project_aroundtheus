import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  // constructor({ name, link }, modalSelector) {
  constructor(modalSelector) {
    super(modalSelector); // Call the constructor of the parent class with the modalSelector
    this._name = this._modalElement.querySelector(".modal__image-label");
    this._image = this._modalElement.querySelector(".modal__preview-image");
  }

  open(name, link) {
    // Set the image's src and alt
    this._image.src = link;
    this._name.textContent = name;
    this._image.alt = `Photo of ${this._name}`;

    // Call the open() method of the parent class
    super.open();
  }
}
