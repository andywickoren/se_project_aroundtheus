export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
}

// index.js
// const cardsList = new Section({
//     items: intialCards,
//     renderer: () => {
//         //logic
//     }
// });
