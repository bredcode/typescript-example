const axios = require("axios");

const BASE_URL = "http://localhost:3000/guess";
const USER_NAME = "student001";

async function guess(value) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        value,
        user: USER_NAME,
      },
    });

    if (response.data.result === "CORRECT_ALREADY") {
      console.log(`🎉 이미 맞추셨습니다! 시도: ${response.data.attempts}, 시간: ${response.data.time}`);
      return response.data;
    }

    if (response.data.result === "CORRECT") {
      console.log(`🎉 정답! 시도: ${response.data.attempts}, 시간: ${response.data.time}`);
      return response.data;
    }

    console.log(`[${value}] → ${response.data.result}`);

    return response.data;
  } catch (err) {
    console.error("요청 실패:", err.message);
  }
}

async function launch() {
  await guess("4936");
  await guess("0126");

  // 또는 로직
}

launch();
