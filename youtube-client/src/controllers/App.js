
import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

const query = 'KJ Apa';
const key = 'AIzaSyDQguvc5lVX5uZ8JknvUxfcRE7VVO3BiLA';

export default class App {
  constructor() {
    this.state1 = {
      url: `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=15&q=${query}`,
    };
  }

  async start() {
    const model = new AppModel(this.state1);
    const data = await model.getClipInfo();
    const view = new AppView(data);

    view.render();
  }
}
