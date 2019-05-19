import AppModel from '../models/AppModel';
import AppView from '../views/AppView';


export default class App {
  constructor(value) {
    this.value = value;
  }

  async start(token) {
    const model = new AppModel(this.value);
    const pageToken = await model.getnextPageToken(token);
    const data = await model.getClipId(pageToken);
    const inform = await model.getClipInform(data);
    const view = new AppView(inform);
    view.render();

    const section = document.querySelector('.content-wrapper');
    section.onscroll = async () => {
      if (section.scrollLeft + section.offsetWidth >= section.scrollWidth) {
        const app = new App(this.value);
        app.start(pageToken);
      }
    };
  }
}
