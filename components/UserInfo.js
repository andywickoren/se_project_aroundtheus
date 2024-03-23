export default class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }

  getUserInfo() {
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(
      ".profile__description"
    ).textContent;

    return {
      name: this._profileName,
      description: this._profileDescription,
    };
  }

  setUserInfo(profileName, profileDescription) {
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
  }
}
