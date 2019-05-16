async function getJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const query = 'KJ Apa';
const key = 'AIzaSyDQguvc5lVX5uZ8JknvUxfcRE7VVO3BiLA';

const channelInfo = {
  url: `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=15&q=${query}`,
};

function getVideoInfoURL(ids) {
  const urlPrefix = `https://www.googleapis.com/youtube/v3/videos?key=${key}&id=`;
  const urlPostfix = '&part=snippet,statistics';

  return `${urlPrefix}${ids}${urlPostfix}`;
}

export default class AppModel {
  constructor() {
    this.channelInfo = channelInfo;
  }

  static extractClipInfo(channelData, videoData) {
    // console.log(data);
    // const channelClipInfo = channelData.items.map(clip => ({
    //   title: clip.snippet.title,
    //   description: clip.snippet.description,
    //   data: clip.snippet.publishedAt.substr(0, 10),
    //   author: clip.snippet.channelTitle,
    //   image: clip.snippet.thumbnails.high.url,
    // }));
    console.log(channelData);
    console.log(videoData);
    const clipsObjects = [];
    for (let i = 0; i < channelData.items.length; i += 1) {
      const clip = channelData.items[i];
      const video = videoData.items[i];
      clipsObjects.push({
        title: clip.snippet.title,
        description: clip.snippet.description,
        data: clip.snippet.publishedAt.substr(0, 10),
        author: clip.snippet.channelTitle,
        image: clip.snippet.thumbnails.high.url,
        viewCount: video.statistics.viewCount,
        link: `https://www.youtube.com/watch?v=${clip.id.videoId}`,
      });
    }

    // console.log(typeof data.items);
    console.log(clipsObjects);
    return clipsObjects;
  }


  async getClipInfo() {
    const channelInfoURL = this.channelInfo.url;//
    const channelData = await getJson(channelInfoURL);

    const ids = channelData.items
      .map(info => info.id.videoId)
      .reduce((acc, curr) => `${acc},${curr}`);
    const videoInfoURL = getVideoInfoURL(ids);
    const videoData = await getJson(videoInfoURL);

    // console.log(data);

    return AppModel.extractClipInfo(channelData, videoData);
  }
}
