// 登入頁面專用邏輯
const correctPassword = "20240518"; // 密碼設定

function checkPassword() {
    const input = document.getElementById("password");
    const val = input.value;
    
    if (val === correctPassword) {
        // 登入成功：變綠色並跳轉
        input.style.borderColor = "#4CAF50";
        input.style.backgroundColor = "#e8f5e9";
        setTimeout(() => {
            window.location.href = "home.html"; 
        }, 300);
    } else {
        // 登入失敗：震動提示
        alert("哎呀！密碼錯誤，是不是忘記紀念日了？😤");
        input.value = "";
        input.focus();
        
        // 觸發 CSS 動畫
        input.style.animation = "shake 0.5s";
        setTimeout(() => input.style.animation = "", 500);
    }
}

// 支援按 Enter 鍵登入
document.getElementById("password")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});

// 產生背景泡泡
function createBubbles() {
    const container = document.getElementById("bubble-container") || document.body;
    const bubbleCount = 15;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.left = `${Math.random() * 100}%`;
        
        const size = Math.random() * 15 + 5; 
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(bubble);
    }
}
createBubbles();

// 注入震動動畫 Keyframes
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
}`;
document.head.appendChild(styleSheet);