const axios = require("axios");

const BASE_URL = ``; // 업다운 서버 URL
const USER_NAME = "student001";

async function guess(value) {
  try {
    const response = await axios.get(`${BASE_URL}/guess`, {
      params: {
        value,
        user: USER_NAME,
      },
    });
    console.log(`[${value}] → ${response.data.result}`);
    return response.data;
  } catch (err) {
    console.error("요청 실패:", err.message);
    throw err;
  }
}

// 알고리즘 작성
async function launch() {
  let low = 1;
  let high = 100;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const response = await guess(mid);

    if (response.result === "CORRECT_ALREADY") {
      console.log(`🎉 이미 맞추셨습니다! 시도: ${response.attempts}, 시간: ${response.time}`);
      break;
    }

    if (response.result === "CORRECT") {
      console.log(`🎉 정답! 시도: ${response.attempts}, 시간: ${response.time}`);
      break;
    }

    if (response.result === "UP") {
      low = mid + 1;
    } else if (response.result === "DOWN") {
      high = mid - 1;
    }
  }
}

launch();
