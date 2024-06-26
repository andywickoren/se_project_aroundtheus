/*Cards should be rendered after the user information is received from the server. 
Сreate a function in Api.js and return the Promise.all() method. 
Pass the array of function calls for getting user information and the list of cards 
to Promise.all() as a parameter.*/

//GET https://around-api.en.tripleten-services.com/v1/users/me
//GET https://around-api.en.tripleten-services.com/v1/cards
//PATCH https://around-api.en.tripleten-services.com/v1/users/me

export default class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._authToken = "20e48b0c-8946-48f3-99d9-01b588193102";
    // this._authorization = authorization;
    // constructor body
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      // remember the point of this is so you have something to pass
      // when you process the error in catch
      return Promise.reject(`Error: ${res.status}`);
    });
    //   .catch((err) => {
    //     console.error(err); // log the error to the console;
    //   });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
    //   .catch((err) => {
    //     console.error(err);
  }

  /*Cards should be rendered after the user information is received from the server. 
    Сreate a function in Api.js and return the Promise.all() method. 
    Pass the array of function calls for getting user information and the list of cards 
    to Promise.all() as a parameter.*/
  renderCards() {
    return Promise.all();
  }

  //POST https://around-api.en.tripleten-services.com/v1/cards

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId

  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  //DELETE https://around-api.en.tripleten-services.com/v1/cards/5d1f0611d321eb4bdcd707dd
  //PUT https://around-api.en.tripleten-services.com/v1/cards/cardId/likes

  addLike(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  //DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes

  removeLike(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  //PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar

  changeProfilePicture(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarLink, // The request body containing the avatar property
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
