/* eslint-disable class-methods-use-this */
import AppModel from '../../models/AppModel';

export default class AppView {
  constructor(data) {
    this.data = data;
    this.model = new AppModel();
    this.state = {
      input: '',
      currentPage: 1,
    };
  }

  clearBody() {
    document.body.innerHTML = '';
  }

  renderCards() {
    return this.data.map(clipObject => `
    <div class='card'>
     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
      <img  class='image' src=${clipObject.image} style="border:none;" />
      <a class='title' href=${clipObject.link}>${clipObject.title}</a>
      <div class='info-container'>
        <div class='author'>${clipObject.author}</div>
        <div class='data'>
          <i class="far fa-calendar-alt"></i>
          ${clipObject.data}
        </div>
        <div class='view-count'>
          <i class="far fa-eye"></i>
          ${clipObject.viewCount}
        </div>
        <div class='description'>${clipObject.description}</div>
      </div>
    </div>
    `).join('');
  }

  render() {
    const input = document.createElement('input');
    input.className = 'input';
    const contentCard = document.createElement('div');
    const prevButton = document.createElement('button');
    const currentButton = document.createElement('button');
    currentButton.innerHTML = `${this.state.currentPage}`;
    const nextButton = document.createElement('button');
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'button-container';
    contentCard.classList.add('card-container');
    buttonsContainer.appendChild(prevButton);
    buttonsContainer.append(currentButton);
    buttonsContainer.appendChild(nextButton);
    document.body.appendChild(input);
    document.body.appendChild(contentCard);

    input.addEventListener('keydown', async (event) => {
      if (event.keyCode === 13) {
        this.state.input = event.target.value;
        this.state.currentPage = 1;
        if (this.data) {
          document.body.appendChild(buttonsContainer);
        }
        currentButton.innerHTML = `${this.state.currentPage}`;
        this.data = await this.model.getClipInfo(this.state.input);
        contentCard.innerHTML = this.renderCards();
      }
    });
    prevButton.addEventListener('click', async () => {
      this.model.setState({ currentPageToken: this.model.state.prevPageToken });
      this.data = await this.model.getClipInfo(this.state.input);
      contentCard.innerHTML = this.renderCards();
      this.state.currentPage -= 1;
      currentButton.innerHTML = `${this.state.currentPage}`;
    });
    nextButton.addEventListener('click', async () => {
      this.model.setState({ currentPageToken: this.model.state.nextPageToken });
      this.data = await this.model.getClipInfo(this.state.input);
      contentCard.innerHTML = this.renderCards();
      this.state.currentPage += 1;
      currentButton.innerHTML = `${this.state.currentPage}`;
    });

    const slider = document.querySelector('.card-container');

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    });
  }
}
