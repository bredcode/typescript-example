### 날씨 API 조회해보기 with ts

### API docs를 보면서 함께 날씨 조회 API를 만들어봅니다.

- docs: https://openweathermap.org/current
- api key: https://home.openweathermap.org/api_keys
- 해당 API 사용: Built-in API request by city name
  `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`

### 실습

- appId={API key}에 넣어야 할 API key 발급을 받아보세요.
- 위 API document에서 response를 찾고, 해당 response에 맞게 WeatherData 타입을 만들어보세요.
