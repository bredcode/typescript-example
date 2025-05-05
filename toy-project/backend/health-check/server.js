const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("LB에 의해 호출!");
  res.send(`Hello from backend server on port ${port}!`);
});

const port = process.argv[2] ? parseInt(process.argv[2]) : 5001;

app.listen(port, () => {
  console.log(`백엔드 서버가 포트 ${port}에서 실행 중입니다.`);
});
