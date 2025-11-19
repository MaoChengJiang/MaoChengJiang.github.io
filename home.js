
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

fetch('albums.json')
  .then(response => {
    // 檢查檔案是否真的存在
    if (!response.ok) {
        throw new Error(`找不到檔案 (Status: ${response.status})`);
    }
    return response.text(); // 先讀成純文字，方便除錯
  })
  .then(text => {
      try {
          return JSON.parse(text); // 嘗試轉換成 JSON
      } catch (e) {
          console.error("JSON 解析錯誤:", e);
          console.log("收到的內容:", text); // 在 Console 顯示內容方便檢查
          throw new Error("albums.json 格式內容有誤，請檢查是否有多餘的逗號或括號");
      }
  })
  .then(albums => {
    const container = document.getElementById('albums-container');
    if(!container) return;

    // 清空容器，避免重複
    container.innerHTML = '';

    // 檢查 albums 是否為陣列
    if (!Array.isArray(albums)) {
        throw new Error("資料格式錯誤：albums 應該是一個列表 (Array)");
    }

    let hasContent = false;
    albums.forEach(album => {
      // 如果相簿是空的或沒有圖片，就跳過
      if (!album.images || album.images.length === 0) return;

      hasContent = true;
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

    if (!hasContent) {
        container.innerHTML = "<p>目前還沒有相簿喔，快去新增回憶吧！📸</p>";
    }
  })
  .catch(err => {
    console.error("載入相簿失敗:", err);
    const container = document.getElementById('albums-container');
    if(container) {
        // 顯示具體的錯誤原因，方便除錯
        container.innerHTML = `<p style="color: #d9534f; padding: 20px;">
            讀取回憶失敗了 😢<br>
            <small>錯誤原因：${err.message}</small>
        </p>`;
    }
  });

