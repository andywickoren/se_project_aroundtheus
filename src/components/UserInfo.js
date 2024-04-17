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

  setUserInfo({ title, description }) {
    this._profileName.textContent = title;
    this._profileDescription.textContent = description;
  }
}
