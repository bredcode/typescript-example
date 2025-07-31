### 사전 작업

```shell
mkdir file-server
cd file-server
npm init -y
npm i express
```

### 1단계: 간단한 API 만들기

목표: Node.js와 Express.js를 사용하여 기본적인 API 서버를 설정합니다.

- express를 이용하여 3000번 포트를 통해 서버를 열어주세요.
  - 서버가 실행될 때는 `서버가 http://localhost:${port} 에서 실행 중입니다.`가 출력되어야합니다.
- "/" get 함수 하나를 만듭니다.
  http://localhost:3000/ 으로 호출했을 때, `파일 업로드 서버`라는 값을 리턴하도록 합니다.

<details>
<summary>답안</summary>

```js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("파일 업로드 서버");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
```

</details>

### 2단계: 파일 업로드 시스템 만들기

목표: multer 라이브러리를 사용하여 파일 업로드 기능을 함께 작성해봅니다.

[사전 설치]

```shell
npm i multer
```

[코드]

- file upload시, fieldname을 이용한 예시

```js
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// 파일 저장 경로 및 이름 설정
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 파일 업로드 라우트
// upload.any(): multer 미들웨어를 사용하여 어떤 이름이든 허용
app.post("/upload", upload.any(), (req, res) => {
  res.send("파일 업로드 성공");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
```

- file upload시, originalname을 이용한 예시

```js
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// 파일 저장 경로 및 이름 설정
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 파일 업로드 라우트
// upload.any(): multer 미들웨어를 사용하여 어떤 이름이든 허용
app.post("/upload", upload.any(), (req, res) => {
  res.send("파일 업로드 성공");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
```

### Postman 사용법

**요청 방식**: POST

**URL**: http://localhost:3000/upload

**Body**: form-data

**Key**: file (서버 코드에서 upload.single('file')로 설정했으므로 file이라는 키를 사용해야 합니다.)

**Value**: File 선택 후 업로드할 파일 선택

**Headers**: Content-Type은 form-data를 선택하면 자동으로 설정되므로 직접 설정할 필요가 없습니다.

---

### 퀴즈

위 처럼하면 아래와 같이 originmalname에 확장자가 함께 나옴을 알 수 있다.

`ex: 11.PNG-1750983112306.PNG`

어떻게해야 `11-{timestamp}.{ext}`형태로 나타나게 할 수 있을까?

<details>
<summary>답안</summary>

```js
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// 파일 저장 경로 및 이름 설정
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    // 파일명에서 확장자 제외
    // const filenameWithoutExt = file.originalname.split(".").slice(0, -1).join(".");
    // cb(null, filenameWithoutExt + "-" + Date.now() + path.extname(file.originalname));

    const fileName = file.originalname.split(".").slice(0, -1).join(".");
    const fileExt = file.originalname.split(".").slice(-1);
    cb(null, `${fileName}-${Date.now()}.${fileExt}`);
  },
});

const upload = multer({ storage: storage });

// 파일 업로드 라우트
// upload.any(): multer 미들웨어를 사용하여 어떤 이름이든 허용
app.post("/upload", upload.any(), (req, res) => {
  res.send("파일 업로드 성공");
});

// 정적 파일 제공 미들웨어
// express.static('uploads'): express.static은 정적 파일을 제공하는 Express.js의 내장 미들웨어
// uploads 폴더의 파일을 정적 파일로 제공
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
```

</details>
