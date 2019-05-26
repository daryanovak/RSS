/* eslint-disable class-methods-use-this */

import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

export default class App {
  async start() {
    const model = new AppModel();
    const data = await model.getClipInfo();
    const view = new AppView(data);
    view.render();
  }
}
