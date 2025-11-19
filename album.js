const params = new URLSearchParams(location.search);
const albumName = params.get('name');

const titleEl = document.getElementById('album-title');
const photosEl = document.getElementById('photos-container');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

if (!albumName) {
  titleEl.textContent = '找不到相簿名稱';
} else {
  fetch('albums.json')
    .then(r => r.json())
    .then(albums => {
      const album = albums.find(a => a.name === albumName);

      if (!album) {
        titleEl.textContent = `相簿 "${albumName}" 不存在`;
        return;
      }

      titleEl.textContent = album.name;
      document.title = `${album.name} - 甜蜜回憶`;

      album.images.forEach(src => {
        const fig = document.createElement('figure');
        // loading="lazy" 可以讓網頁載入更快
        fig.innerHTML = `<img src="${src}" alt="${album.name}" loading="lazy">`;
        
        // 監聽點擊事件：打開燈箱
        fig.addEventListener('click', () => {
            openLightbox(src);
        });

        photosEl.appendChild(fig);
      });
    })
    .catch(err => {
      titleEl.textContent = '載入相簿失敗';
      console.error(err);
    });
}

// 打開燈箱
function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // 禁止背景捲動
}

// 關閉燈箱 (點擊背景)
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // 恢復背景捲動
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }
});