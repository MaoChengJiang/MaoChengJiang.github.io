// 解析 query string 拿到 ?name=xxx
const params = new URLSearchParams(location.search);
const albumName = params.get('name');

if (!albumName) {
  document.getElementById('album-title').textContent = '找不到相簿名稱';
} else {
  fetch('albums.json')
    .then(r => r.json())
    .then(albums => {
      const album = albums.find(a => a.name === albumName);
      const titleEl = document.getElementById('album-title');
      const photosEl = document.getElementById('photos-container');

      if (!album) {
        titleEl.textContent = `相簿 "${albumName}" 不存在`;
        return;
      }

      titleEl.textContent = album.name;
      album.images.forEach(src => {
        const fig = document.createElement('figure');
        fig.innerHTML = `<img src="${src}" alt="${album.name}">`;
        photosEl.appendChild(fig);
      });
    })
    .catch(err => {
      document.getElementById('album-title').textContent = '載入相簿失敗';
      console.error(err);
    });
}
