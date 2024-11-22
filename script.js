const correctPassword = "19941128"; // 設定密碼

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
    document.getElementById('counter').innerText = `依庭與茂誠已經戀愛 ${diffDays}天了喔 💕`;
}

// 如果在主頁，初始化天數計算
if (document.getElementById('counter')) {
    calculateDays();
}
