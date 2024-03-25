export default class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo({ profileName, profileDescription }) {
    /*
    const profileNameInput = profileFormElement.querySelector(
      ".modal__input_type_name"
    );
    const profileDescriptionInput = profileFormElement.querySelector(
      ".modal__input_type_description"
    );
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
    profileFormValidator.resetValidation();
    */
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }
}
