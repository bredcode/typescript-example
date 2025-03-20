const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  res.status(200).json({ game: "updown", number: secretNumber });
});

app.listen(PORT, () => {
  console.log(`📈📉 UpDown Service running on http://localhost:${PORT}`);
});
