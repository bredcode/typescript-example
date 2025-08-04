const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const MIN = 1;
const MAX = 100;

let secretNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
let logs = {}; // 유저별 기록

console.log("🔐 정답:", secretNumber);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/guess", (req, res) => {
  const { value, user } = req.query;
  const num = parseInt(value);
  const name = user || "unknown";

  if (!value || isNaN(num)) return res.status(400).json({ error: "숫자 value가 필요합니다" });

  if (!logs[name]) {
    logs[name] = { count: 0, start: Date.now(), solved: false };
  }

  if (logs[name].solved) {
    return res.json({ result: "CORRECT", attempts: logs[name].count, time: `${logs[name].time}s` });
  }

  logs[name].count += 1;
  logs[name].time = ((Date.now() - logs[name].start) / 1000).toFixed(2);
  console.log(`UserName: ${name} Count: ${logs[name].count} Time: ${logs[name].time}`);

  if (num === secretNumber) {
    logs[name].solved = true;
    logs[name].time = ((Date.now() - logs[name].start) / 1000).toFixed(2);
    return res.json({ result: "CORRECT_ALREADY", attempts: logs[name].count, time: `${logs[name].time}s` });
  }

  return res.json({
    result: num < secretNumber ? "UP" : "DOWN",
    attempts: logs[name].count,
  });
});

// 랭킹 상태 확인
app.get("/status", (req, res) => {
  const rankings = Object.entries(logs)
    .sort((a, b) => {
      const logA = a[1];
      const logB = b[1];

      if (logA.solved !== logB.solved) {
        return logB.solved - logA.solved;
      }

      return logA.count - logB.count || logA.time - logB.time;
    })
    .map(([name, log], idx) => ({
      rank: idx + 1,
      user: `${name} - ${log.solved ? "성공" : "실패"}`,
      attempts: log.count,
      time: `${log.time}s`,
    }));

  res.render("status", { rankings });
});

app.listen(PORT, () => {
  console.log(`🚀 업다운 서버 실행 중 http://localhost:${PORT}`);
});
