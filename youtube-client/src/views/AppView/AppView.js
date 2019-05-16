export default class AppView {
  constructor(arrDataObject) {
    this.arrDataObject = arrDataObject;
  }

  render() {
    const contentCard = document.createElement('div');
    contentCard.classList.add('card');
    contentCard.innerHTML = this.arrDataObject.map(clipObject => `<a class='title'>${clipObject.title}</a>
    <div class='description'>${clipObject.description}</div><div class='author'>${clipObject.author}</div>
    <div class='data'>${clipObject.data}</div><image class='image' src=${clipObject.image}>${clipObject.data}</image>`).join('');
    // eslint-disable-next-line max-len
    // contentCard.innerHTML = this.arrDataObject.map(clipObject => `<div class='description'>${clipObject.description}</div>`).join('');
    document.body.appendChild(contentCard);
  }
}
