export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleAddLike,
    handleRemoveLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id; //you added this underscore based on the brief
    this._isLiked = data.isLiked || false;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    // this._deleteCardModal = deleteCardModal;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  getID() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  setLiked(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle("card__like-button_active", isLiked);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this.isLiked()) {
        this._handleRemoveLike(this);
      } else {
        this._handleAddLike(this);
      }
    });
    // });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this.setLiked(this._isLiked);

    this._setEventListeners();
    return this._cardElement;
  }
}
