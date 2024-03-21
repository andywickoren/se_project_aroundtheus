// export default class Modal {
//   constructor(modalSelector) {
//     this._modalElement = document.querySelector(modalSelector);
//   }

//   open() {
//     console.log(this._modalElement);
//     this._modalElement.classList.add("modal__opened");
//     document.addEventListener("keydown", this._handleEscape);
//     console.log("Modal");
//   }

//   close() {
//     console.log(this._modalElement);
//     this._modalElement.classList.remove("modal__opened");
//     document.removeEventListener("keydown", this._handleEscape);
//   }

//   _handleEscape = (evt) => {
//     if (evt.key === "Escape") {
//       this.close();
//     }
//   };

//   setEventListeners() {
//     this._modalElement.addEventListener("mousedown", handleModalClose); //this should close for overlay and close button
//   }
// }

export default class Modal {
  constructor(modalSelector) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleModalClose = this._handleModalClose.bind(this); // Bind the method to the instance
  }

  open() {
    //console.log(this._modalElement);
    this._modalElement.classList.add("modal__opened");
    document.addEventListener("keydown", this._handleEscape);
    //console.log("Modal");
    this.setEventListeners();
  }

  close() {
    //console.log(this._modalElement);
    this._modalElement.classList.remove("modal__opened");
    document.removeEventListener("keydown", this._handleEscape);
    this.removeEventListeners();
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

  setEventListeners() {
    console.log(1);
    this._modalElement.addEventListener("mousedown", this._handleModalClose);
  }

  removeEventListeners() {
    console.log(2);
    this._modalElement.removeEventListener("mousedown", this._handleModalClose);
  }
}
