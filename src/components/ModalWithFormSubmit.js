// export default class ModalWithFormSubmit extends Modal {
//   setSubmitAction(action) {
//     //action is the callback
//   }

//   setEventListeners() {}
// }

import Modal from "./Modal.js";

export default class ModalWithFormSubmit extends Modal {
  setSubmitAction(submitCallback) {
    this._submitCallback = submitCallback;
    // api.removeCard(id).then(() => {
    //     this.handleDeleteCard();
  }

  setEventListeners() {
    super.setEventListeners();
    const confirmDeleteElement = this._modalElement.querySelector(
      "#modal__confirm-card-delete"
    );
    const form = this._modalElement.querySelector(".modal__form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._submitCallback) {
        this._submitCallback();
      }
    });
  }

  //this does the close

  open(submitCallback) {
    this.setSubmitAction(submitCallback);
    super.open();
  }
}
