import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000";
const DEFAULT_GAMES = []; // 기본 게임 목록

const App = () => {
  const [games, setGames] = useState(DEFAULT_GAMES);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  // 서버 상태 확인 (게임 목록 가져오기)
  useEffect(() => {
    fetch(`${API_BASE}/status`)
      .then((res) => res.json())
      .then((data) => {
        if (data.services && data.services.length > 0) {
          setGames(data.services);
        } else {
          setGames(DEFAULT_GAMES); // 서버 응답이 비어도 기본 게임 유지
        }
      })
      .catch(() => {
        setGames(DEFAULT_GAMES); // 서버가 죽었어도 기본 게임 표시
      })
      .finally(() => setLoading(false));
  }, []);

  // 게임 실행 요청
  const playGame = async (game) => {
    setResult("게임 실행 중...");
    try {
      const res = await fetch(`${API_BASE}/${game}`);
      if (!res.ok) throw new Error("게임 서버 다운");

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`🚨 ${game.toUpperCase()} 서버 응답 없음`);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎮 GameLand</h1>

      {loading ? (
        <p>게임 로딩 중...</p>
      ) : games.length === 0 ? (
        <p>GameLand 서버가 동작하지 않습니다.</p>
      ) : (
        <div>
          {games.map((game) => (
            <button
              key={game}
              onClick={() => playGame(game)}
              style={{
                margin: "10px",
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {game.toUpperCase()} 실행
            </button>
          ))}
        </div>
      )}

      {result && (
        <pre
          style={{
            marginTop: "20px",
            background: "#f4f4f4",
            padding: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
};

export default App;
