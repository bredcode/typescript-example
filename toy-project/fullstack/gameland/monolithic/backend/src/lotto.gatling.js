// npx gatling run --simulation lotto

import { simulation, scenario, exec, pause, rampUsers } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

// 서버 설정
const httpProtocol = http
  .baseUrl("http://localhost:5000") // Express 서버 주소
  .acceptHeader("application/json");

// 🎮 Lotto API 부하 테스트 시나리오
const lottoScenario = scenario("Lotto Load Test").exec(
  http("Lotto API Request").get("/lotto").check(status().is(200)), // 응답 코드 200 확인
  pause(1) // 요청 간 1초 대기
);

// 🏗 테스트 설정
export default simulation((setUp) => {
  setUp(
    lottoScenario.injectOpen(rampUsers(1000).during(10)) // 10초 동안 1000명의 유저 요청
  ).protocols(httpProtocol);
});
