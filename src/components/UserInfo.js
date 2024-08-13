export default class UserInfo {
  constructor({ profileName, profileDescription, avatarImage }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    this._avatarImage = avatarImage;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._profileName.textContent = title;
    this._profileDescription.textContent = description;
  }

  setAvatar(url) {
    this._avatarImage.src = url;
  }
}
