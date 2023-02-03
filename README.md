<h1>Expense-Tracker</h1>

![npm version](https://img.shields.io/badge/npm-v8.11.0-blue?style=flat 'npm')
![node version](https://img.shields.io/badge/node-v16.15.1-impotent?style=flat 'node')
![React version](https://img.shields.io/badge/React-v18.2.0-brightgreen?style=flat 'React')

## 基於 RCA 開發的記帳簿

#### 此專案目前功能有:

使用者

- 登入 / 註冊 / 登出
- Line 第三方登入
- 修改登入帳號及密碼
- 新增 / 瀏覽 / 修改 / 刪除個人記錄
- 瀏覽近十筆出貨、存貨及銷售記錄趨勢圖

管理員權限

- 瀏覽使用者清單 / 刪除使用者
- 瀏覽 / 刪除所有使用者記錄
- 新增 / 修改 / 刪除產品清單
- 新增 / 修改 / 刪除地點清單

# 使用技術

```
React / Zustand / TailwindCSS / axios / react-router-dom / react-hook-form / sweetalert / Chart.js
```

# Get Started

#### 1. 下載專案

```
git clone https://github.com/Tommy1023/expense-tracker.git
```

#### 2. 初始化

```
npm install
```

#### 3. 設置環境變數

```
REACT_APP_API_URL = 'http://http://localhost:3000/api' (backend api base url)
```

#### 4. 啟動專案

```
npm start
```

### Demo

[https://expense-tracker.up.railway.app](http://bit.ly/3JDwVHZ)

admin 測試帳號

帳號：root@example.com, 密碼：00000000

user 測試帳號

帳號：user1@example.com, 密碼：11111111

帳號：user2@example.com, 密碼：22222222

<img src="./src/assets/images/login.jpeg" alt="drawing" width="600"/>
<img src="./src/assets/images/register.jpeg" alt="drawing" width="600"/>
<img src="./src/assets/images/records.jpeg" alt="drawing" width="600"/>
<img src="./src/assets/images/record.jpeg" alt="drawing" width="600"/>
<img src="./src/assets/images/newRecord.png" alt="drawing" width="600"/>
<img src="./src/assets/images/profile.jpeg" alt="drawing" width="600"/>
<img src="./src/assets/images/users.png" alt="drawing" width="600"/>
<img src="./src/assets/images/products.png" alt="drawing" width="600"/>
