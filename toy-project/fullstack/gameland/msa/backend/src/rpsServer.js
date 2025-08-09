const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("RPS API 요청 들어옴...");
  const choices = ["rock", "paper", "scissors"];
  const result = choices[Math.floor(Math.random() * choices.length)];
  res.status(200).json({ game: "rps", result });
});

app.listen(PORT, () => {
  console.log(`✊✋✌ RPS Service running on http://localhost:${PORT}`);
});
