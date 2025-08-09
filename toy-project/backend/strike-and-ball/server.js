const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let answer = generateAnswer();
let logs = {}; // user별 기록 저장

console.log("🔐 정답:", answer.join(""));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// 정답 생성 (서로 다른 4자리 숫자)
function generateAnswer() {
  const digits = [];
  while (digits.length < 4) {
    const rand = Math.floor(Math.random() * 10);
    if (!digits.includes(rand)) digits.push(rand);
  }
  return digits;
}

function getResult(guess, answer) {
  let strike = 0;
  let ball = 0;

  guess.forEach((digit, idx) => {
    if (digit === answer[idx]) {
      strike++;
    } else if (answer.includes(digit)) {
      ball++;
    }
  });

  return { strike, ball };
}

app.get("/guess", (req, res) => {
  const { value, user } = req.query;
  const num = parseInt(value);
  const name = user || "unknown";

  if (!value || isNaN(num)) return res.status(400).json({ error: "숫자 value가 필요합니다" });

  const digits = value.split("").map(Number);

  if (!logs[name]) {
    logs[name] = { count: 0, start: Date.now(), solved: false };
  }

  if (logs[name].solved) {
    return res.json({ result: "CORRECT_ALREADY", attempts: logs[name].count, time: `${logs[name].time}s` });
  }

  logs[name].count++;
  logs[name].time = ((Date.now() - logs[name].start) / 1000).toFixed(2);
  console.log(`UserName: ${name} Count: ${logs[name].count} Time: ${logs[name].time}`);

  const result = getResult(digits, answer);

  if (result.strike === 4) {
    logs[name].solved = true;
    return res.json({ result: "CORRECT", attempts: logs[name].count, time: `${logs[name].time}s` });
  }

  return res.json({ result: `${result.strike}S ${result.ball}B`, attempts: logs[name].count });
});

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
  console.log(`🚀 숫자야구 서버 실행 중! http://localhost:${PORT}`);
});
