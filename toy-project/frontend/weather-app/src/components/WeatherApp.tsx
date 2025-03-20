import React, { useState } from "react";

type WeatherData = {
  main: { temp: number };
  weather: { description: string }[];
  name: string;
};

function WeatherApp() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "3c6fd3acb9fefb556e41579c0bbaa9b9";

  const fetchWeather = async () => {
    if (!city) {
      setError("도시 이름을 입력하세요!");
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("도시를 찾을 수 없습니다.");
      }
      const data: WeatherData = await response.json();
      console.log(data);
      setWeather(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🌤️ 날씨 조회 앱</h1>
      <input type="text" placeholder="도시 이름을 입력하세요" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={fetchWeather}>검색</button>

      {loading && <p>⏳ 로딩 중...</p>}
      {error && <p className="error">❌ {error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>📍 {weather.name}</h2>
          <p>🌡️ 온도: {weather.main.temp}°C</p>
          <p>🌥️ 날씨: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
