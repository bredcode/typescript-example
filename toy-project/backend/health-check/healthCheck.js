const express = require("express");
const httpProxy = require("http-proxy");
const axios = require("axios");

const app = express();

// 백엔드 서버 목록
const backendServers = [
  { url: "http://localhost:5001", healthy: true },
  { url: "http://localhost:5002", healthy: true },
];

// 라운드 로빈을 위한 현재 인덱스
let currentIndex = 0;

// 프록시 서버 생성
const proxy = httpProxy.createProxyServer();

// 헬스 체크 간격 (밀리초 단위, 예: 5초)
const healthCheckInterval = 5000;

// 헬스 체크 함수: 각 서버의 "/" 엔드포인트에 GET 요청을 보내 상태를 확인합니다.
async function checkHealth() {
  for (let server of backendServers) {
    try {
      const response = await axios.get(server.url, { timeout: 2000 }); // 타임아웃 2초
      // 응답이 200이면 서버를 건강하다고 표시
      server.healthy = response.status === 200;
    } catch (error) {
      // 에러 발생 시 해당 서버를 unhealthy로 표시
      server.healthy = false;
    }
    console.log(`${server.url} is ${server.healthy ? "healthy" : "unhealthy"}`);
  }
}

// 주기적으로 헬스 체크 실행
setInterval(checkHealth, healthCheckInterval);
checkHealth(); // 서버 시작 시 한 번 실행

// healthy한 서버 중 하나를 라운드 로빈 방식으로 선택하여 프록시 요청을 보냅니다.
app.use((req, res) => {
  // healthy한 서버 목록 필터링
  const healthyServers = backendServers.filter((server) => server.healthy);
  if (healthyServers.length === 0) {
    res.status(503).send("No backend servers are healthy");
    return;
  }

  // 라운드 로빈 방식으로 healthy한 서버 선택
  const target = healthyServers[currentIndex % healthyServers.length].url;
  currentIndex++;

  console.log(`Forwarding request to ${target}`);
  proxy.web(req, res, { target }, (err) => {
    console.error(`프록시 요청 에러: ${err}`);
    res.status(500).send("Internal Server Error");
  });
});

// Health checker 실행 (포트 3000)
app.listen(3000, () => {
  console.log("HealthChecker가 포트 3000에서 실행 중입니다.");
});
