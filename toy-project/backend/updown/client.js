const axios = require("axios");

const BASE_URL = ""; // 업다운 서버 URL
const USER_NAME = "";

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
async function launch() {}

launch();
