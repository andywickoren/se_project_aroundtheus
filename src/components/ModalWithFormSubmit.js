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
    confirmDeleteElement.addEventListener("click", () => {
      this._submitCallback;
    });
  }

  //this does the close

  open() {
    this.setSubmitAction();
    super.open();
  }
}
