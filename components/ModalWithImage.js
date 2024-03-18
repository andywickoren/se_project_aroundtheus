import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor({ name, link }, modalSelector) {
    super(modalSelector); // Call the constructor of the parent class with the modalSelector
    this._name = name;
    this._link = link;
  }

  open() {
    // Set the image's src and alt
    previewImage.src = this._link;
    previewImage.alt = `Photo of ${this._name}`;
    previewImageLabel.textContent = this._name;

    // Call the open() method of the parent class
    super.open();
  }
}
