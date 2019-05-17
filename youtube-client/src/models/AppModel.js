export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipId(data) {
    const arrVideoId = [];
    for (let i = 0; i < data.items.length; i += 1) {
      arrVideoId.push(data.items[i].id.videoId);
    }
    console.log('arrVideoId', arrVideoId);
    return arrVideoId;
    // return data.items;
  }

  async getClipId(pageToken) {
    if (pageToken = undefined) {
      pageToken = '';
    }
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCr2_jA-WrNyFu4MA06m4o9y1j1Aqssr7M&type=video&part=snippet&maxResults=15&${pageToken}&q=${this.state}`;
    console.log('url', url);
    const responce = await fetch(url);
    const data = await responce.json();
    // console.log('pageToken', pageToken);
    const clipsID = AppModel.extractClipId(data);
    return clipsID;
  }

  async getnextPageToken() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCr2_jA-WrNyFu4MA06m4o9y1j1Aqssr7M&type=video&part=snippet&maxResults=15&q=${this.state}`;
    console.log('url', url);
    const responce = await fetch(url);
    const data = await responce.json();
    return data.nextPageToken;
  }

  static extractClipInform(data2) {
    console.log('data2.items', data2.items);
    return data2.items;
  }

  async getClipInform(arrVideoId) {
    const strVideoId = arrVideoId.join(',');
    const url2 = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCr2_jA-WrNyFu4MA06m4o9y1j1Aqssr7M&id=${strVideoId}&part=snippet,statistics`;
    // const { url } = this.state;
    console.log('strVideoId', strVideoId);
    const responce = await fetch(url2);
    const data2 = await responce.json();
    console.log('data2', data2);
    return AppModel.extractClipInform(data2);
  }
}
