import setState from '../helpers';

/* eslint-disable class-methods-use-this */
async function getJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const key = 'AIzaSyBigxZnwbcB3_Ih6ikcxUXP3InOiDAsOoU';


function getVideoInfoURL(ids) {
  const urlPrefix = `https://www.googleapis.com/youtube/v3/videos?key=${key}&id=`;
  const urlPostfix = '&part=snippet,statistics';

  return `${urlPrefix}${ids}${urlPostfix}`;
}

export default class AppModel {
  constructor() {
    this.setState = setState.bind(this);
    this.state = {
      nextPageToken: '',
      prevPageToken: '',
      currentPageToken: '',
    };
  }

  setCurrentPageToken(pageToken) {
    this.setState({ currentPageToken: pageToken });
  }

  getSearchUrl(query) { return `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&pageToken=${this.state.currentPageToken || ''}&maxResults=15&q=${query || ''}`; }

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


  async getClipInfo(query) {
    const channelInfoURL = this.getSearchUrl(query);//
    const { nextPageToken, prevPageToken, ...channelData } = await getJson(channelInfoURL);
    this.setState({
      nextPageToken,
      prevPageToken,
    });

    const ids = channelData.items
      .map(info => info.id.videoId)
      .reduce((acc, curr) => `${acc},${curr}`);
    const videoInfoURL = getVideoInfoURL(ids);
    const videoData = await getJson(videoInfoURL);

    // console.log(data);

    return AppModel.extractClipInfo(channelData, videoData);
  }
}
