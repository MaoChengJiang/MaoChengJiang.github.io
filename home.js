// 1. 愛情計數器
(function calculateDays() {
    const startDate = new Date('2024-05-18');
    const today = new Date();
    
    // 歸零時間，確保天數計算準確
    startDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const counterEl = document.getElementById('counter');
    if(counterEl) {
        counterEl.innerHTML = `庭庭與誠誠已經戀愛 <span style="color:#ff6b6b; font-size:1.2em;">${diffDays}</span> 天了喔 💕`;
    }
})();

// 2. 讀取相簿列表
fetch('albums.json')
  .then(r => r.json())
  .then(albums => {
    const container = document.getElementById('albums-container');
    if(!container) return;

    albums.forEach(album => {
      // 如果相簿是空的就跳過
      if (!album.images || album.images.length === 0) return;

      const card = document.createElement('figure');
      card.className = 'cover-card';
      
      // 取第一張當封面
      const coverImage = album.images[0];

      card.innerHTML = `
        <a href="album.html?name=${encodeURIComponent(album.name)}">
          <div style="overflow:hidden; border-radius:10px; width:100%;">
            <img src="${coverImage}" alt="${album.name} 封面" loading="lazy">
          </div>
          <figcaption>${album.name}</figcaption>
        </a>`;
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("載入相簿失敗:", err);
    const container = document.getElementById('albums-container');
    if(container) container.innerHTML = "<p>相簿讀取失敗...請檢查 albums.json 格式 😢</p>";
  });

// 3. 背景泡泡
function createBubbles() {
    const container = document.getElementById("bubble-container") || document.body;
    const bubbleCount = 10;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 10 + 5;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.animationDuration = `${Math.random() * 10 + 8}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(bubble);
    }
}
createBubbles();