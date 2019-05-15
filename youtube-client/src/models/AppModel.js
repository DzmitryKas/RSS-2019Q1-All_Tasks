export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipNames(data) {
    return data.items;
    // return data.items.map(clip => clip.snippet.title);
  }

  async getClipNames() {
    const { url } = this.state;
    console.log('url', url);
    const responce = await fetch(url);
    const data = await responce.json();
    console.log('data', data);

    return AppModel.extractClipNames(data);
  }
}
