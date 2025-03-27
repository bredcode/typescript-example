### 사전 작업

```shell
mkdir strike-and-ball
cd strike-and-ball
npm init -y
npm i express axios
```

### 문제

숫자야구 게임이 구성된 서버가 있습니다.
이 서버에서 상위 랭크에 등극할 수 있게 다양한 방법으로 로직을 구성하고, 게임에 참여해보세요!

```js
const axios = require("axios");

const BASE_URL = ""; // 숫자야구 서버 URL
const USER_NAME = ""; // 유저 이름 (ex: student001)

async function guess(value) {
  try {
    const response = await axios.get(`${BASE_URL}/guess`, {
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

  // 또는 로직을 작성해주세요
}

launch();
```
