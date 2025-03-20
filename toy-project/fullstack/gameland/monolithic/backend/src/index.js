const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 로또 생성기 API
// app.get("/lotto", (req, res) => {
//   console.log("lotto!");
//   setTimeout(() => {
//     const lottoNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1);
//     res.status(200).json({ game: "lotto", numbers: lottoNumbers });
//   }, 3000); // 일부러 3초 지연
// });

// 강제적인 CPU 부하가 추가된 로또 생성기 API
app.get("/lotto", (req, res) => {
  console.log("Lotto API 요청 들어옴...");
  const start = Date.now();

  // 🔥 무거운 연산 추가 (비효율적인 임의 연산)
  function think(n) {
    if (n <= 1) return n;
    return think(n - 1) + think(n - 2);
  }

  think(40); // 매우 비효율적인 연산 (시간 소모)
  const lottoNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1);
  const end = Date.now();

  console.log("결과: ", lottoNumbers);
  res.status(200).json({ game: "lotto", number: lottoNumbers, time: `${end - start}ms` });
});

// 가위바위보 API
app.get("/rps", (req, res) => {
  const choices = ["rock", "paper", "scissors"];
  const result = choices[Math.floor(Math.random() * choices.length)];
  res.status(200).json({ game: "rps", result });
});

// 업다운 게임 API
app.get("/updown", (req, res) => {
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  res.status(200).json({ game: "updown", number: secretNumber });
});

// 서버 상태 확인 API
app.get("/status", (req, res) => {
  res.status(200).json({ status: "ok", games: ["lotto", "rps", "updown"] });
});

app.listen(PORT, () => {
  console.log(`🎮 GameLand Server is running on http://localhost:${PORT}`);
});
