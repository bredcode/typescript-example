const express = require("express");
const httpProxy = require("http-proxy");

const app = express();

// 백엔드 서버 목록: 5001과 5002 포트에서 실행 중인 서버
const backendServers = ["http://localhost:5001", "http://localhost:5002"];

// 라운드 로빈을 위한 인덱스 초기화
let currentIndex = 0;

// 프록시 서버 생성
const proxy = httpProxy.createProxyServer();

// 모든 요청을 처리하여 백엔드 서버로 포워딩
app.use((req, res) => {
  // 현재 인덱스에 해당하는 서버 선택
  const target = backendServers[currentIndex];
  console.log(`요청을 ${target}로 포워딩`);

  // 다음 요청을 위해 인덱스 업데이트
  currentIndex = (currentIndex + 1) % backendServers.length;

  // 프록시를 통해 요청 전달
  proxy.web(req, res, { target }, (err) => {
    console.error(`프록시 요청 에러: ${err}`);
    res.status(500).send("Internal Server Error");
  });
});

// 로드 밸런서 실행 (포트 3000)
app.listen(3000, () => {
  console.log("로드 밸런서가 포트 3000에서 실행 중입니다.");
});
