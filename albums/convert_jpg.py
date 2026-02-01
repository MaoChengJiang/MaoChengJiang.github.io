import os
import sys
from PIL import Image
from pillow_heif import register_heif_opener

# 註冊 HEIF 解碼器
register_heif_opener()

def convert_all_heic_recursively(root_path):
    if not os.path.exists(root_path):
        print(f"路徑不存在: {root_path}")
        return

    print(f"開始掃描路徑: {root_path} ...")
    
    count = 0
    # os.walk 會遍歷所有子資料夾
    for dirpath, dirnames, filenames in os.walk(root_path):
        for filename in filenames:
            if filename.lower().endswith(".heic"):
                heic_path = os.path.join(dirpath, filename)
                # 建立輸出路徑 (同資料夾，換副檔名)
                jpg_path = os.path.splitext(heic_path)[0] + ".jpg"
                
                try:
                    image = Image.open(heic_path)
                    # 確保轉換為 RGB 模式以儲存為 JPG
                    image.convert("RGB").save(jpg_path, "JPEG", quality=95)
                    print(f"已轉換: {heic_path}")
                    count += 1
                except Exception as e:
                    print(f"轉換失敗 {heic_path}: {e}")

    print(f"\n任務完成！共轉換了 {count} 張照片。")

if __name__ == "__main__":
    # 如果沒給參數，預設搜尋當前目錄 (.)
    target_path = sys.argv[1] if len(sys.argv) > 1 else "."
    convert_all_heic_recursively(target_path)