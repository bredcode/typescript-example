const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 로또 서비스 프록시 (http://localhost:5001)
app.use("/lotto", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true }));

// 가위바위보 서비스 프록시 (http://localhost:5002)
app.use("/rps", createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true }));

// 업다운 게임 서비스 프록시 (http://localhost:5003)
app.use("/updown", createProxyMiddleware({ target: "http://localhost:5003", changeOrigin: true }));

// 상태 확인 API
app.get("/status", (req, res) => {
  res.status(200).json({ status: "ok", services: ["lotto", "rps", "updown"] });
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});
