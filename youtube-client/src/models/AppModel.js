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
    // if (pageToken = undefined) {
    //   pageToken = '';
    // }
    console.log('pageToken', pageToken);
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC0-yuh1AFEKG05z2y7GXivfYvv1kjzTc0&type=video&part=snippet&maxResults=15&${pageToken}&q=${this.state}`;
    console.log('url', url);
    const responce = await fetch(url);
    const data = await responce.json();
    // const pageToken1 = `pageToken=${data.nextPageToken}`;
    console.log('data', data);
    const clipsID = AppModel.extractClipId(data);
    return clipsID;
  }

  async getnextPageToken(pageToke) {
    console.log('Token1111111DOOOOOOO', pageToke);
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC0-yuh1AFEKG05z2y7GXivfYvv1kjzTc0&type=video&part=snippet&maxResults=15&${pageToke}&q=${this.state}`;
    console.log('url', url);
    const responce = await fetch(url);
    const data = await responce.json();
    const token = `pageToken=${data.nextPageToken}`;
    console.log('Token1111111POOOOSSSSLLLEEE', token);
    return token;
  }

  static extractClipInform(data2) {
    console.log('data2.items', data2.items);
    return data2.items;
  }

  async getClipInform(arrVideoId) {
    const strVideoId = arrVideoId.join(',');
    const url2 = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyC0-yuh1AFEKG05z2y7GXivfYvv1kjzTc0&id=${strVideoId}&part=snippet,statistics`;
    // const { url } = this.state;
    console.log('strVideoId', strVideoId);
    const responce = await fetch(url2);
    const data2 = await responce.json();
    console.log('data2', data2);
    return AppModel.extractClipInform(data2);
  }
}
