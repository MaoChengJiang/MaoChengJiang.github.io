// 計數器
(function calculateDays() {
    const startDate = new Date('2024-05-18');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('counter').innerText = `庭庭與誠誠已經戀愛 ${diffDays}天了喔 💕`;
    
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
