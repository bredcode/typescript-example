const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "queue.json");

// 큐 읽기
function readQueue() {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, "utf8") || "[]";
  return JSON.parse(content);
}

// 큐 쓰기
function writeQueue(queue) {
  fs.writeFileSync(filePath, JSON.stringify(queue, null, 2), "utf8");
}

// 메시지 추가
function enqueue(message) {
  const queue = readQueue();
  queue.push(message);
  writeQueue(queue);
  console.log("[+] Enqueued:", message);
}

// 메시지 꺼내기
function dequeue() {
  const queue = readQueue();
  const message = queue.shift();
  writeQueue(queue);
  return message;
}

// 큐 비었는지 확인
function isEmpty() {
  const queue = readQueue();
  return queue.length === 0;
}

module.exports = { enqueue, dequeue, isEmpty };
