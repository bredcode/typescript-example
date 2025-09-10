## Token을 이용한 signup & signin

### 사전 작업

- 환경 구축

  ```shell
  mkdir signup-signin
  cd signup-signin
  npm init -y
  npm install express dotenv jsonwebtoken bcryptjs
  npm install --save-dev nodemon
  ```

  - 필수

    - express : API 서버 프레임워크
    - dotenv : .env 파일 로드
    - jsonwebtoken : JWT 생성 및 검증
    - bcryptjs : 비밀번호 해싱

  - 개발용

    - nodemon : 코드 수정 시 서버 자동 재시작

  - .env 생성
    ```
    PORT=3000
    JWT_SECRET=test
    ```

### 지금부터 코딩해봅시다!

- (작성 이라고) 되어있는 부분은 직접 해보기!

```js
require("dotenv").config(); // env file load
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

// 메모리 유저 저장소 (실서비스에선 DB 사용)
const users = {}; // key: id, value: { id, name, passwordHash }

// JWT 생성 함수, 1시간 뒤 만료되는 토큰
function generateToken(item) {
  const payload = { id: item.id, name: item.name };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function extractToken(req) {
  const auth = req.headers["authorization"];
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  return null;
}

app.get("/", (req, res) => {
  res.json("hello world");
});

app.post("/signup", async (req, res) => {
  try {
    // id, password, name을 req.body에서 가져옴
    // 작성

    // id 또는 password 또는 이름이 없을 때 다음과 같이 400 에러를 전달해본다.
    if (!id || !password || !name) {
      return res.status(400).json({ message: "id, password, name은 필수입니다." });
    }

    // 위와 마찬가지로, users 오브젝트에 해당 id가 존재하면 "이미 존재하는 id입니다." 라는 400 에러를 전달한다.
    // 작성

    // 위에서 받은 password는 아래와 같이 해싱한다 (암호가 그대로 노출됨을 방지)
    const passwordHash = await bcrypt.hash(password, 10);

    // users에 key는 id, value는 id, name, passwordHash가 들어가도록 한다.
    // 작성

    // generateToken을 이용하여 토큰을 생성한다 (id와 name을 토큰 생성에 사용)
    // 작성

    // 토큰이 생성되었다면 아래처럼 회원 가입 성공 문구를 남긴다
    return res.status(201).json({ message: "회원가입 성공", token });
  } catch (err) {
    // 오류가 발생하면 다음과 같이 500 에러를 전달한다.
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

app.get("/signin", (req, res) => {
  // extractToken을 이용하여 토큰을 얻는다.
  const token = extractToken(req);

  // 토큰이 없다면 "token 파라미터가 필요합니다."를 포함한 400 에러 메시지를 전달해본다.
  // 작성

  try {
    // jwt.verify를 이용하여 토큰을 decode한다, 이때 generate할때 사용한 JWT_SECRET를 동일하게 사용.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decode된 jwt token의 정보를 출력해본다.
    const greeting = `${decoded.name}(${decoded.id})님 반갑습니다!`;
    return res.json({ message: greeting, decoded });
  } catch (err) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다.", error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
```
