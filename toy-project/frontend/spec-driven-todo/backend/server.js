const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // 개발용: 프론트 로컬 호스트에서 접근 가능하게
app.use(express.json()); // JSON 바디 파싱

// === 간단 로깅 미들웨어 ===
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  const { method, originalUrl } = req;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  console.log(`➡️  [REQ] ${method} ${originalUrl} from ${ip}`);
  if (Object.keys(req.query || {}).length) console.log("   query:", req.query);
  if (req.body && Object.keys(req.body).length) console.log("   body :", req.body);

  res.on("finish", () => {
    const durationMs = Number((process.hrtime.bigint() - start) / BigInt(1e6));
    console.log(`⬅️  [RES] ${method} ${originalUrl} -> ${res.statusCode} (${durationMs}ms)`);
  });

  next();
});

// 메모리 저장소 (실습용)
let todos = [];
let nextId = 1;

/**
 * POST /api/todos
 * Body: { title: string, completed?: boolean }
 * Response: 201 { id, title, completed, createdAt }
 */
app.post("/api/todos", (req, res) => {
  const { title, completed } = req.body || {};
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "INVALID_TITLE",
      message: "title은 비어있지 않은 문자열이어야 합니다.",
    });
  }

  const todo = {
    id: nextId++,
    title: title.trim(),
    completed: typeof completed === "boolean" ? completed : false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);

  console.log("📝 [DB] Created todo:", todo);
  return res.status(201).json(todo);
});

/**
 * GET /api/todos
 * Response: 200 [{ id, title, completed, createdAt }, ...]
 */
app.get("/api/todos", (req, res) => {
  console.log(`📚 [DB] Read todos: count=${todos.length}`);
  return res.json(todos);
});

/** 서버 시작 */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Todo API server running on http://localhost:${PORT}`);
});
