const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("파일 업로드 서버");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
