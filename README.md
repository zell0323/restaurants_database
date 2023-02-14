# restaurants

Alphacamp 專案作業

# 安裝所需環境

可執行git指令之終端機

# 安裝方法

1. 於終端機輸入下列指令，或直接將程式碼打包下載
```
git clone https://github.com/zell0323/restaurants_database
```
2. 進入專案資料夾

```
cd restaurants_database
```
3. 下載所需套件 
```
npm install 
```
4. 在資料夾底下新建一個.env檔案，並參考.evn.example設定各項參數
```
MONGODB_URI= （mongdb的url）
FACEBOOK_ID= （facebook登入應用程式的ID)
FACEBOOK_SECRET= （facebook登入應用程式的密鑰）
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```
5. 執行種子檔案
```
npm run seed
```
6. 執行專案，開啟虛擬伺服器
```
npm run dev
```

7. 於瀏覽器輸入網址 http://localhost:3000/ 

# 專案功能
可登入、登出、並有簡易資料庫的網頁練習

# 備註
測試帳號1
郵件 user1@example.com
密碼 12345678

測試帳號2
郵件 user2@example.com
密碼 12345678

