const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Lotto API 요청 들어옴...");
  const start = Date.now();

  function think(n) {
    if (n <= 1) return n;
    return think(n - 1) + think(n - 2);
  }

  think(40); // CPU 부하 작업
  const lottoNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1);
  const end = Date.now();

  console.log("로또 결과:", lottoNumbers);
  res.status(200).json({ game: "lotto", numbers: lottoNumbers, time: `${end - start}ms` });
});

app.listen(PORT, () => {
  console.log(`🎲 Lotto Service running on http://localhost:${PORT}`);
});
