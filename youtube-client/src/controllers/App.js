export default class App {
  constructor() {
    this.state = {
      url: ''
    };

    async start() {
      const model = new Appmodel(this.state);
      const data = await model.gitClipNames();

    }
  }
}
