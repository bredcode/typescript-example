require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

/* ───────────────────── 글로벌 미들웨어 ───────────────────── */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

/* ───────────────────── 토큰 유틸 ───────────────────── */
const signAccessToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
const signRefreshToken = (id) => jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

/* ───────────────────── 메모리 스토어 ───────────────────── */
const refreshStore = new Map();

/* ───────────────────── 액세스 토큰 검증 미들웨어 ───────────────────── */
function verifyAccessToken(req, res, next) {
  let token;

  // ① Authorization 헤더
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) token = auth.split(" ")[1];

  // ② accessToken 쿠키(Non-HttpOnly)
  if (!token && req.cookies?.accessToken) token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ message: "No access token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Access token expired" });
    req.user = decoded;
    next();
  });
}

/* ───────────────────── 1) 로그인 ───────────────────── */
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // 데모 계정: demo@google.com / 1234
  if (email !== "demo@google.com" || password !== "1234")
    return res.status(401).json({ message: "Invalid credentials" });

  const userId = 1;
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId);
  refreshStore.set(refreshToken, userId);

  // refreshToken ─ HttpOnly
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // js(document.cookie)가 이 쿠키를 읽거나 수정하지 못하도록 차단
    secure: process.env.NODE_ENV === "production", // HTTPS(SSL/TLS) 연결에서 만 쿠키를 전송하게 만듦
    sameSite: "strict", // 	cross-site 요청(다른 도메인에서 오는 요청)에는 이 쿠키를 자동 전송하지 않게 함
    maxAge: 7 * 24 * 60 * 60 * 1_000, // 7일
  });

  // accessToken ─ JS 접근 허용
  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1_000, // 15분
  });

  res.json({ message: "login success" });
});

/* ───────────────────── 2) 토큰 재발급 ───────────────────── */
app.post("/auth/refresh", (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken || !refreshStore.has(refreshToken))
    return res.status(401).json({ message: "Refresh token invalid" });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Refresh expired" });

    const newAccess = signAccessToken(decoded.id);
    res.cookie("accessToken", newAccess, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1_000,
    });
    res.json({ message: "access refreshed" });
  });
});

/* ───────────────────── 3) 로그아웃 ───────────────────── */
app.post("/auth/logout", (req, res) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) refreshStore.delete(refreshToken);

  res.clearCookie("refreshToken").clearCookie("accessToken").json({ message: "logged out" });
});

/* ───────────────────── 보호된 API 예시 ───────────────────── */
app.get("/profile", verifyAccessToken, (req, res) => {
  res.json({ userId: req.user.id, message: "프로필 조회 성공" });
});

/* ───────────────────── 서버 기동 ───────────────────── */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀  API server running → http://localhost:${PORT}`);
});
