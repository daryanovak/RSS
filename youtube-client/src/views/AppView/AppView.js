/* eslint-disable class-methods-use-this */
import AppModel from '../../models/AppModel';

export default class AppView {
  constructor(data) {
    this.data = data;
    this.model = new AppModel();
    this.state = { input: '' };
  }

  clearBody() {
    document.body.innerHTML = '';
  }

  renderCards() {
    return this.data.map(clipObject => `
    <div class='card'>
      <a class='title' href=${clipObject.link}><img  class='image' src=${clipObject.image} style="border:none;" />
      <a class='title' href=${clipObject.link}>${clipObject.title}</a>
      <div class='description'>${clipObject.description}</div>
      <div class='author'>${clipObject.author}</div>
      <div class='data'>${clipObject.data}</div>
      <div class='view-count'>${clipObject.viewCount}</div>
    </div>
    `).join('');
  }

  render() {
    const input = document.createElement('input');
    const contentCard = document.createElement('div');
    const prevButton = document.createElement('button');
    prevButton.innerHTML = 'prev';
    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'next';
    contentCard.classList.add('card-container');
    document.body.appendChild(input);
    document.body.appendChild(prevButton);
    document.body.appendChild(nextButton);
    document.body.appendChild(contentCard);
    input.addEventListener('keydown', async (event) => {
      if (event.keyCode === 13) {
        this.state.input = event.target.value;
        this.data = await this.model.getClipInfo(this.state.input);
        contentCard.innerHTML = this.renderCards();
      }
    });
    prevButton.addEventListener('click', async () => {
      this.model.setState({ currentPageToken: this.model.state.prevPageToken });
      this.data = await this.model.getClipInfo(this.state.input);
      contentCard.innerHTML = this.renderCards();
    });
    nextButton.addEventListener('click', async () => {
      this.model.setState({ currentPageToken: this.model.state.nextPageToken });
      this.data = await this.model.getClipInfo(this.state.input);
      contentCard.innerHTML = this.renderCards();
    });
  }
}
