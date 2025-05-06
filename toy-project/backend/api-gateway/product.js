const express = require("express");
const app = express();

app.get("/products", (req, res) => {
  console.log("products call");
  res.json([
    { id: 101, name: "Keyboard" },
    { id: 102, name: "Monitor" },
  ]);
});

app.listen(4002, () => {
  console.log("📦 Product Service running on http://localhost:4002");
});
