import AppModel from '../models/AppModel';
import AppView from '../views/AppView';


export default class App {
  constructor(value) {
    this.state = {
      url: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCr2_jA-WrNyFu4MA06m4o9y1j1Aqssr7M&type=video&part=snippet&maxResults=15&q=${value}`,
    };
    this.value = value;
  }

  async start() {
    const model = new AppModel(this.state);
    const data = await model.getClipId();
    const inform = await model.getClipInform(data);

    console.log(await data);
    const view = new AppView(inform);
    view.render2();
  }
}
