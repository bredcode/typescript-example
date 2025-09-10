require("dotenv").config(); // env file load
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

// 메모리 유저 저장소 (실서비스에선 DB 사용)
const users = {}; // key: id, value: { id, name, passwordHash }

// JWT 생성 함수, 1시간 뒤 만료되는 토큰
function generateToken({ id, name }) {
  const payload = { id, name };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

app.get("/", (req, res) => {
  res.json("hello world");
});

app.post("/signup", async (req, res) => {
  try {
    const { id, password, name } = req.body || {};
    if (!id || !password || !name) {
      return res.status(400).json({ message: "id, password, name은 필수입니다." });
    }
    if (users[id]) {
      return res.status(409).json({ message: "이미 존재하는 id입니다." });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    users[id] = { id, name, passwordHash };

    const token = generateToken({ id, name });
    return res.status(201).json({ message: "회원가입 성공", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  }
});

app.get("/signin", (req, res) => {
  const token = extractToken(req);
  if (!token) {
    return res.status(400).json({ message: "token 파라미터가 필요합니다." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const greeting = `${decoded.name}(${decoded.id})님 반갑습니다!`;
    return res.json({ message: greeting, decoded });
  } catch (err) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다.", error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

function extractToken(req) {
  const auth = req.headers["authorization"];
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  return null;
}
