const express = require("express");
const httpProxy = require("http-proxy");

const app = express();

// 백엔드 서버 목록
const backendServers = ["http://localhost:5001", "http://localhost:5002"];

// http-proxy 프록시 서버 생성
const proxy = httpProxy.createProxyServer();

// 모든 요청을 처리하여 랜덤하게 백엔드 서버로 포워딩
app.use((req, res) => {
  const randomIndex = Math.floor(Math.random() * backendServers.length);
  const target = backendServers[randomIndex];
  console.log(`요청을 랜덤 선택된 ${target}로 포워딩`);

  // 프록시를 통해 요청 전달
  proxy.web(req, res, { target }, (err) => {
    console.error(`프록시 요청 에러: ${err}`);
    res.status(500).send("Internal Server Error");
  });
});

// 로드 밸런서 실행 (포트 3000)
app.listen(3000, () => {
  console.log("랜덤 로드 밸런서가 포트 3000에서 실행 중입니다.");
});
