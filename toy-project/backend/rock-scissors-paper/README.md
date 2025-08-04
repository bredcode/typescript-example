### 사전 작업

```shell
mkdir rock-sissors-paper
cd rock-sissors-paper
npm init -y
npm i express ejs
```

### 문제

당신은 가위바위보를 할 수 있는 서버를 만들어야합니다.
이미 웹에서 가위바위보를 할 수 있는 뷰는 모두 그려진 상태입니다.
서버의 로직을 마저 완성하여 가위바위보 서버를 사용자들에게 제공해보세요!

```js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

const choices = ["rock", "paper", "scissors"];

app.get("/", (req, res) => {
  res.render("status", { result: null });
});

app.get("/play", (req, res) => {
  const userChoice = req.query.choice;
  if (!choices.includes(userChoice)) {
    return res.status(400).send("잘못된 선택입니다.");
  }
  // 주석 공간 사이에서만 코드를 작성하시면 됩니다.

  /**
   * 로직 구성
   */

  // 주석 공간 사이에서만 코드를 작성하시면 됩니다.
  res.render("status", {
    result: {
      user: userChoice,
      server: serverChoice,
      outcome: result,
    },
  });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
```
