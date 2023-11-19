console.log("hello from validation.js");

//before refactor

// enabling validation by calling enableValidation()
// pass all the settings on call

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    function setEventListeners(formEl, options) {
      const { inputSelector } = options;
      const inputEls = [...formEl.querySelectorAll(inputSelector)];
      inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
          checkInputValidity(formEl, inputEl, options);
          // toggleButtonState
        });
      });
    }

    function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
      const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
      inputEl.classList.add(inputErrorClass);
      errorMessageEl.textContent = inputEl.validationMessage;
      errorMessageEl.classList.add(options.errorClass);
    }

    function checkInputValidity(formEl, inputEl, options) {
      if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, options);
        //   } else {
        //     hideInputError(formEl, inputEl, options);
        //   }
      }
    }

    setEventListeners(formEl, options);
    // checkInputValidity(formEl, inputEl, options);
    // showInputError(formEl, inputEl, { inputErrorClass, errorClass });

    // look for all inputs inside of form
    // loop through all the inputs to see if all are valid
    // if any input is invalid
    // grab the validation message
    // add error class to input
    // display error message
    // disable button
    // if all inputs are valid
    // enable button
    // reset error messages
  });
}

const configure = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(configure);
