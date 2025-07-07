// 計數器
(function(){
  const start = new Date(2024,4,18);
  const days = Math.floor((Date.now() - start) / 86400000);
  document.getElementById('counter').textContent = `第 ${days} 天 ❤️`;
})();

fetch('albums.json')
  .then(r => r.json())
  .then(albums => {
    const container = document.getElementById('albums-container');
    albums.forEach(album => {
      if (!album.images.length) return;
      const card = document.createElement('figure');
      card.className = 'cover-card';
      card.innerHTML = `
        <a href="album.html?name=${encodeURIComponent(album.name)}">
          <img src="${album.images[0]}" alt="${album.name} 封面">
          <figcaption>${album.name}</figcaption>
        </a>`;
      container.appendChild(card);
    });
  })
  .catch(console.error);
