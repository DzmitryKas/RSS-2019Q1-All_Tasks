import AppModel from '../models/AppModel';
import AppView from '../views/AppView';


export default class App {
  constructor(value) {
    // this.state = {
    //   url: ,
    // };
    this.value = value;
  }

  async start() {
    const model = new AppModel(this.value);
    const data = await model.getClipId();
    const inform = await model.getClipInform(data);
    console.log('data3', await data);
    const view = new AppView(inform);
    view.render2();
    // const width = document.getElementsByClassName('content-wrappe').offsetWidth;
    // console.log('window.innerWidth', window.innerWidth);
    // console.log('document.clientWidth', width);
  }

  start2() {
    const width = document.getElementsByClassName('content-wrappe').offsetWidth;
    console.log('window.innerWidth', window.innerWidth);
    console.log('document.clientWidth', width);
  }
}
