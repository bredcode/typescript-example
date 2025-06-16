// jwtGenerator.js
require("dotenv").config(); // .env 파일 로드
const jwt = require("jsonwebtoken");

// 사용자 정보 (예: 유저 ID)
const user = {
  id: 123,
  username: "jaen",
};

// JWT 생성 함수
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h", // 1시간 동안 유효
  });

  return token;
}

// 사용 예시
const token = generateToken(user);
console.log("Generated JWT:", token);

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded JWT:", decoded);
} catch (error) {
  console.error("Invalid token:", error.message);
}

console.log(process.env.HELLO_WORLD);
