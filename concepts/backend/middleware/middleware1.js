const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  { id: 1, title: "NodeJS의 이해" },
  { id: 2, title: "자바스크립트 심화" },
];

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} 요청이 들어왔습니다.`);
  next();
};

app.use(logger);

const idValidator = (req, res, next) => {
  console.log("idValidator 동작");
  const { id } = req.query;
  if (!id || isNaN(Number(id))) {
    return next(new Error("id는 숫자여야 합니다."));
  }
  next();
};

app.use("/search", idValidator);
app.get("/search", (req, res) => {
  const id = Number(req.query.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return next(new Error("해당하는 책을 찾을 수 없습니다."));
  }

  res.json(book);
});

app.get("/books", (req, res) => {
  console.log("책 목록 요청 결과");
  res.json(books);
});

// 전역 에러 미들웨어
const errorHandler = (err, req, res, next) => {
  console.log("에러발생");
  res.status(500).json({ error: err.message || "서버에서 오류가 발생했습니다." });
};

// 에러 미들웨어는 반드시 마지막에 등록합니다.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
