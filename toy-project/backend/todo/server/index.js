// 처음부터 만들어보기

const express = require("express");
const app = express();
const PORT = 3000;

// JSON 요청을 파싱하기 위한 미들웨어 설정
app.use(express.json());

// 임시 데이터 저장소 (메모리상 배열 사용)
let todos = [];
let idCounter = 1;

// 전체 할 일 목록 조회 (GET /todos)
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 특정 할 일 조회 (GET /todos/:id)
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((item) => item.id === id);
  if (!todo) {
    return res.status(404).json({ message: "할 일을 찾을 수 없습니다." });
  }
  res.json(todo);
});

// 새 할 일 추가 (POST /todos)
app.post("/todos", (req, res) => {
  const { title, completed } = req.body;
  console.log("title: ", title, "completed: ", completed);
  if (!title) {
    return res.status(400).json({ message: "제목을 입력해주세요." });
  }
  const newTodo = {
    id: idCounter++,
    title,
    completed: completed || false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 할 일 수정 (PUT /todos/:id)
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todo = todos.find((item) => item.id === id);
  if (!todo) {
    return res.status(404).json({ message: "할 일을 찾을 수 없습니다." });
  }
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// 할 일 삭제 (DELETE /todos/:id)
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "할 일을 찾을 수 없습니다." });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
