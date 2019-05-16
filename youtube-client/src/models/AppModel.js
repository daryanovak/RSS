export default class AppModel {
  constructor(state1) {
    this.state1 = state1;
  }

  static extractClipInfo(data) {
    // console.log(data);
    const clipiInfo = data.items.map(clip => ({
      title: clip.snippet.title,
      description: clip.snippet.description,
      data: clip.snippet.publishedAt.substr(0, 10),
      author: clip.snippet.channelTitle,
      image: clip.snippet.thumbnails.high.url,
    }));
    // console.log(typeof data.items);
    console.log(clipiInfo);
    return clipiInfo;
  }


  async getClipInfo() {
    const { url } = this.state1;

    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data);

    return AppModel.extractClipInfo(data);
  }
}
