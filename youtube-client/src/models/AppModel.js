export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipId(data) {
    const arrVideoId = [];
    for (let i = 0; i < data.items.length; i += 1) {
      arrVideoId.push(data.items[i].id.videoId);
    }
    return arrVideoId;
  }

  async getClipId(pageToken) {
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCr2_jA-WrNyFu4MA06m4o9y1j1Aqssr7M&type=video&part=snippet&maxResults=15&${pageToken}&q=${this.state}`;
    const responce = await fetch(url);
    const data = await responce.json();
    const clipsID = AppModel.extractClipId(data);
    return clipsID;
  }

  async getnextPageToken(pageToke) {
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCr2_jA-WrNyFu4MA06m4o9y1j1Aqssr7M&type=video&part=snippet&maxResults=15&${pageToke}&q=${this.state}`;
    const responce = await fetch(url);
    const data = await responce.json();
    const token = `pageToken=${data.nextPageToken}`;
    return token;
  }

  static extractClipInform(data2) {
    return data2.items;
  }

  // eslint-disable-next-line class-methods-use-this
  async getClipInform(arrVideoId) {
    const strVideoId = arrVideoId.join(',');
    const url2 = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCr2_jA-WrNyFu4MA06m4o9y1j1Aqssr7M&id=${strVideoId}&part=snippet,statistics`;
    const responce = await fetch(url2);
    const data2 = await responce.json();
    return AppModel.extractClipInform(data2);
  }
}
