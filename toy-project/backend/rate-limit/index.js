const express = require("express");
const rateLimiter = require("./rateLimiter");

const app = express();

app.use(rateLimiter());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
