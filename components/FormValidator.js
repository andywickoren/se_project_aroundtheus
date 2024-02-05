export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputElements = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    this._submitButton = formElement.querySelector(
      settings.submitButtonSelector
    );

    this._setEventListeners();
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputElements.some(
      (inputElement) => !inputElement.validity.valid
    );
    this._submitButton.disabled = hasInvalidInput;
    this._submitButton.classList.toggle(
      this._settings.inactiveButtonClass,
      hasInvalidInput
    );
  }

  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._toggleButtonState();
  }

  resetValidation() {
    this._inputElements.forEach((inputElement) =>
      this._hideInputError(inputElement)
    );
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
  }
}
