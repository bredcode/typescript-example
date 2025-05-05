const { dequeue, isEmpty } = require("./queue");

function processMessage(msg) {
  console.log("[x] Processing:", msg);
  setTimeout(() => {
    console.log(`[✓] Task done for user ${msg.userId}`);
  }, 1000);
}

function pollQueue() {
  setInterval(() => {
    if (!isEmpty()) {
      const msg = dequeue();
      processMessage(msg);
    }
  }, 2000); // 2초마다 큐 확인
}

pollQueue();
