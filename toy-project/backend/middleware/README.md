### 사전 작업

```shell
mkdir middleware
cd middleware
npm init -y
npm i express
```

### 문제 1: 애플리케이션 미들웨어 - 로깅 미들웨어 만들기

#### ✅ 문제 설명

모든 요청이 들어올 때마다 HTTP 메서드와 URL을 콘솔에 출력하는 로깅 미들웨어를 만들어봅니다.  
예를 들어, `/books` 경로로 `GET` 요청을 보내면 콘솔에 `GET /books 요청이 들어왔습니다.`라는 메시지가 출력되어야 합니다.

#### ✅ 수행 단계

- Express 애플리케이션 생성: express()를 호출하여 앱 인스턴스를 만듭니다.
- 로깅 미들웨어 작성: (req, res, next) 형식의 함수를 작성하여, `${req.method} ${req.url} 요청이 들어왔습니다.` 을 출력합니다.
- 미들웨어 등록: app.use(logger)를 통해 모든 요청에 대해 미들웨어가 적용되도록 합니다.
- books라는 전역 변수를 만든 후, 다음과 같이 만들어줍니다.
  ```json
  [
    {
      "id": 1,
      "title": "NodeJS의 이해"
    },
    {
      "id": 2,
      "title": "자바스크립트 심화"
    }
  ]
  ```
- 라우트 핸들러 작성: 예제에서는 /books 경로에 대해 책 목록 정보를 JSON으로 응답합니다.
- 서버 실행: 3000번 포트에서 앱을 실행합니다.

#### ✅ 예시

http://localhost:3000/books 를 호출하면 아래 결과가 나타나야 합니다.

**[log]**

```shell
GET /books 요청이 들어왔습니다.
책 목록 요청 결과
```

**[html]**

```json
[
  { "id": 1, "title": "NodeJS의 이해" },
  { "id": 2, "title": "자바스크립트 심화" }
]
```

<details>
<summary>🔰 답안</summary>

```js
const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  {
    id: 1,
    title: "NodeJS의 이해",
  },
  {
    id: 2,
    title: "자바스크립트 심화",
  },
];

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} 요청이 들어왔습니다.`);
  next();
};

app.use(logger);

app.get("/books", (req, res) => {
  console.log("책 목록 요청 결과");
  res.json(books);
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
```

</details>

### 문제 2: /search 라우트에서 ID 숫자 유효성 검사 미들웨어

#### ✅ 문제 설명

`/search` 라우트에서 쿼리 파라미터로 전달된 id 값이 숫자인지 확인하는 미들웨어를 작성합니다.

#### ✅ 조건

- `/search?id={{id}}` 형태로 요청이 들어옵니다.
- 미들웨어는 `req.query.id` 값이 `숫자`인지 확인합니다.
- 만약 id가 없거나 숫자가 아닌 경우, HTTP 400 응답과 함께 `id는 숫자여야 합니다.`라는 에러 메시지를 반환합니다.
- id가 숫자이면 다음 미들웨어 또는 라우트 핸들러로 진행합니다.
- 라우트 핸들러에서는 주어진 id를 이용해 books 배열에서 해당 책을 찾고, 결과를 응답합니다.  
  (해당 책이 없으면 404 응답과 에러 메시지를 반환합니다.)

#### ✅ 수행 단계

- 미들웨어 작성:

  - `validateIdMiddleware`라는 이름의 미들웨어 함수를 생성합니다.
  - 이 미들웨어는 `req.query.id`를 추출하고, 숫자로 변환한 후 isNaN() 함수를 사용해 검사합니다.
  - 숫자가 아니면 `res.status(400).json({...})`를 통해 에러 메시지를 반환하고, 그렇지 않으면 `next()`를 호출합니다.

- 라우트에 미들웨어 적용:

  - `/search` 라우트에 `validateIdMiddleware`를 미들웨어 체인에 포함시킵니다.
  - 미들웨어를 통과한 후, 라우트 핸들러에서 `id` 값으로 `books` 배열을 검색하여 해당 책이 있으면 JSON 응답으로 반환하고, 없으면 404 응답을 보냅니다.

- 테스트:
  - 올바른 숫자형 id를 전달하면 책 정보가 응답됩니다.
  - id가 숫자가 아니거나 없는 경우, 에러 응답을 확인합니다.

#### ✅ 예시

1. /search?id=1 호출 시

   **[log]**

   ```shell
   GET /search?id=1 요청이 들어왔습니다.
   idValidator 동작
   ```

   **[html]**

   ```json
   { "id": 1, "title": "NodeJS의 이해" }
   ```

2. /search?id=3 호출 시

   **[log]**

   ```shell
   GET /search?id=3 요청이 들어왔습니다.
   idValidator 동작
   ```

   **[html]**

   ```json
   { "error": "해당하는 책을 찾을 수 없습니다." }
   ```

3. /search?id=abc 호출 시

   **[log]**

   ```shell
   GET /search?id=abc 요청이 들어왔습니다.
   idValidator 동작
   ```

   **[html]**

   ```json
   { "error": "id는 숫자여야 합니다." }
   ```

#### ✅ 코드 샘플

```js
const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  { id: 1, title: "NodeJS의 이해" },
  { id: 2, title: "자바스크립트 심화" },
];

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} 요청이 들어왔습니다.`);
  next();
};

app.use(logger);

// 여기 작성 //

//////////////

app.get("/books", (req, res) => {
  console.log("책 목록 요청 결과");
  res.json(books);
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
```

<details>
<summary>🔰 답안</summary>

```js
const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  { id: 1, title: "NodeJS의 이해" },
  { id: 2, title: "자바스크립트 심화" },
];

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} 요청이 들어왔습니다.`);
  next();
};

app.use(logger);

// 미들웨어: 쿼리 파라미터 id가 숫자인지 확인
const idValidator = (req, res, next) => {
  console.log("idValidator 동작");
  const { id } = req.query;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "id는 숫자여야 합니다." });
  }
  next();
};

// /search에 미들웨어 적용
app.use("/search", idValidator);
app.get("/search", (req, res) => {
  const id = Number(req.query.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "해당하는 책을 찾을 수 없습니다." });
  }

  res.json(book);
});

app.get("/books", (req, res) => {
  console.log("책 목록 요청 결과");
  res.json(books);
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
```

</details>

### 문제 3: 에러 미들웨어 - 전역 오류 처리하기

#### ✅ 문제 설명

`/search` 라우트에서 id 유효성 검사 미들웨어나 라우트 핸들러에서 발생하는 오류를 `전역 에러 미들웨어로 처리`합니다.

#### ✅ 수행 단계

- id 유효성 검사 미들웨어에서, 만약 req.query.id가 없거나 숫자가 아니라면 직접 응답하지 않고 `next(new Error("id는 숫자여야 합니다."))`를 호출하여 에러를 전달합니다.

- `/search` 라우트 핸들러에서 해당 id에 해당하는 책이 없으면 `next(new Error("해당하는 책을 찾을 수 없습니다."))`로 에러를 전달합니다.

- `전역 에러 미들웨어`는 모든 에러를 받아 콘솔에 스택을 출력한 후, HTTP 상태 코드 `500`과 `에러 메시지`를 JSON 형태로 응답합니다.
- 에러 미들웨어는 반드시 라우트 등록 이후, `마지막에 위치`시킵니다.

#### ✅ 예시

1. /search?id=1 호출 시

   **[log]**

   ```shell
   GET /search?id=1 요청이 들어왔습니다.
   idValidator 동작
   ```

   **[html]**

   ```json
   { "id": 1, "title": "NodeJS의 이해" }
   ```

2. /search?id=3 호출 시

   **[log]**

   ```shell
   GET /search?id=3 요청이 들어왔습니다.
   idValidator 동작
   에러발생
   ```

   **[html]**

   ```json
   { "error": "해당하는 책을 찾을 수 없습니다." }
   ```

3. /search?id=abc 호출 시

   **[log]**

   ```shell
   GET /search?id=abc 요청이 들어왔습니다.
   idValidator 동작
   에러발생
   ```

   **[html]**

   ```json
   { "error": "id는 숫자여야 합니다." }
   ```

#### ✅ 코드 샘플

```js
const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  { id: 1, title: "NodeJS의 이해" },
  { id: 2, title: "자바스크립트 심화" },
];

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} 요청이 들어왔습니다.`);
  next();
};

app.use(logger);

const idValidator = (req, res, next) => {
  console.log("idValidator 동작");
  const { id } = req.query;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "id는 숫자여야 합니다." });
  }
  next();
};

app.use("/search", idValidator);
app.get("/search", (req, res) => {
  const id = Number(req.query.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "해당하는 책을 찾을 수 없습니다." });
  }

  res.json(book);
});

app.get("/books", (req, res) => {
  console.log("책 목록 요청 결과");
  res.json(books);
});

// 윗 부분에서도 수정이 필요한 곳이 있다면 수정
// 여기 에러 미들웨어 작성 //

///////////////////////////

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
```

<details>
<summary>🔰 답안</summary>

```js
const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  { id: 1, title: "NodeJS의 이해" },
  { id: 2, title: "자바스크립트 심화" },
];

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} 요청이 들어왔습니다.`);
  next();
};

app.use(logger);

const idValidator = (req, res, next) => {
  console.log("idValidator 동작");
  const { id } = req.query;
  if (!id || isNaN(Number(id))) {
    return next(new Error("id는 숫자여야 합니다."));
  }
  next();
};

app.use("/search", idValidator);
app.get("/search", (req, res) => {
  const id = Number(req.query.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return next(new Error("해당하는 책을 찾을 수 없습니다."));
  }

  res.json(book);
});

app.get("/books", (req, res) => {
  console.log("책 목록 요청 결과");
  res.json(books);
});

// 전역 에러 미들웨어
const errorHandler = (err, req, res, next) => {
  console.log("에러발생");
  res.status(500).json({ error: err.message || "서버에서 오류가 발생했습니다." });
};

// 에러 미들웨어는 반드시 마지막에 등록합니다.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
```

</details>
