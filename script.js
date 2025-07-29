const correctPassword = "20240518"; // 設定密碼

function checkPassword() {
    const input = document.getElementById("password").value;
    if (input === correctPassword) {
        window.location.href = "home.html"; // 跳轉到主頁
    } else {
        alert("輸入錯誤，請再輸入一次.");
    }
}

function calculateDays() {
    const startDate = new Date('2024-05-18');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('counter').innerText = `庭庭與誠誠已經戀愛 ${diffDays}天了喔 💕`;
}

// 如果在主頁，初始化天數計算
if (document.getElementById('counter')) {
    calculateDays();
}
const container = document.getElementById("bubble-container");

for (let i = 0; i < 5; i++) { // 生成 10 個氣泡
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    // 隨機位置
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.top = `${Math.random() * 100}%`;

    // 隨機大小
    const size = Math.random() * 20 + 5; // 大小範圍 20px ~ 70px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // 隨機動畫時長和延遲
    bubble.style.animationDuration = `${Math.random() * 15 + 7}s`;
    bubble.style.animationDelay = `${Math.random() * 2}s`;

    container.appendChild(bubble);
}
// 動態加載相簿
fetch('albums.json')
  .then(res => res.json())
  .then(albums => {
    const container = document.getElementById('albums-container');
    albums.forEach(album => {
      // 相簿標題
      const section = document.createElement('section');
      section.className = 'album';

      const title = document.createElement('h2');
      title.textContent = album.name;
      section.appendChild(title);

      // 圖庫
      const gallery = document.createElement('div');
      gallery.className = 'gallery';
      album.images.forEach(src => {
        const fig = document.createElement('figure');
        const img = document.createElement('img');
        img.src = src;
        img.alt = album.name;
        fig.appendChild(img);
        gallery.appendChild(fig);
      });
      section.appendChild(gallery);
      container.appendChild(section);
    });
  })
  .catch(err => console.error('載入相簿失敗：', err));