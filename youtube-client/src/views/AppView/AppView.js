export default class AppView {
  constructor(arrDataObject) {
    this.arrDataObject = arrDataObject;
  }

  render() {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.addEventListener('input', (event) => {
      event.target.value;
    });
    const contentCard = document.createElement('div');
    contentCard.classList.add('card-container');
    contentCard.innerHTML = this.arrDataObject.map(clipObject => `
    <div class='card'>
      <a class='title' href=${clipObject.link}><img  class='image' src=${clipObject.image} style="border:none;" />
      <a class='title' href=${clipObject.link}>${clipObject.title}</a>
      <div class='description'>${clipObject.description}</div>
      <div class='author'>${clipObject.author}</div>
      <div class='data'>${clipObject.data}</div>
      <div class='view-count'>${clipObject.viewCount}</div>
    </div>
    `).join('');
  // eslint-disable-next-line max-len  <image class='image' src=${clipObject.image}>${clipObject.data}</image>
    // contentCard.innerHTML = this.arrDataObject.map(clipObject => `<div class='description'>${clipObject.description}</div>`).join('');
    document.body.appendChild(contentCard);
  }
}
