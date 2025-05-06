const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

// 라우터 미들웨어 적용
// /products → http://localhost:4002/products
app.use(
  "/products",
  createProxyMiddleware({
    target: "http://localhost:4002",
    changeOrigin: true,
    pathRewrite: (path, req) => "/products" + path,
  })
);

// 라우터 미들웨어 적용
// /users → http://localhost:4001/users
app.use(
  "/users",
  createProxyMiddleware({
    target: "http://localhost:4001",
    changeOrigin: true,
    pathRewrite: (path, req) => "/users" + path,
  })
);

app.listen(3000, () => console.log("🚪 API Gateway running on http://localhost:3000"));
