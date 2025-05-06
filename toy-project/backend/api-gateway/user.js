const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  console.log("users call");
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

app.listen(4001, () => {
  console.log("👤 User Service running on http://localhost:4001");
});
