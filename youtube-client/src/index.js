// const query = 'cat';
// const key = 'AIzaSyDQguvc5lVX5uZ8JknvUxfcRE7VVO3BiLA';
// const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=15&q=${query}`;

// const content = document.createElement('div');

// fetch(url)
//   .then(res => res.json())
//   .then((data) => {
//     content.innerHTML = data.items.map(item => `<div>${item.snippet.title}</div>`).join('');
//     document.body.appendChild(content);
//   });
import App from './controllers/App';

const app = new App();

app.start();
