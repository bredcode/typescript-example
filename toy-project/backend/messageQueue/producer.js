const { enqueue } = require("./queue");

// 클라이언트 수
const NUM_CLIENTS = 5;

// 클라이언트가 메시지를 생성하여 큐에 쓰는 함수
function simulateClient(clientId) {
  const delay = Math.floor(Math.random() * 3000 + 2000); // 2~5초 랜덤 지연

  setTimeout(() => {
    const message = {
      id: Date.now() + clientId,
      client: `client-${clientId}`,
      type: "send-email",
      payload: {
        to: `user${clientId}@example.com`,
        body: `Hello from client ${clientId}`,
      },
    };

    enqueue(message);
  }, delay);
}

// 모든 클라이언트 병렬 시뮬레이션
for (let i = 1; i <= NUM_CLIENTS; i++) {
  simulateClient(i);
}
