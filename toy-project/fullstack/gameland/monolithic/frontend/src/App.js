import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000";

const App = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  // 서버 상태 확인
  useEffect(() => {
    fetch(`${API_BASE}/status`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games);
        setLoading(false);
      })
      .catch(() => {
        setGames([]);
        setLoading(false);
      });
  }, []);

  // 게임 실행 요청
  const playGame = async (game) => {
    setResult("게임 실행 중...");
    try {
      const res = await fetch(`${API_BASE}/${game}`);
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("게임 실행 실패");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎮 GameLand</h1>

      {loading ? (
        <p>게임 로딩 중...</p>
      ) : (
        <>
          {games.length > 0 ? (
            <div>
              {games.map((game) => (
                <button key={game} onClick={() => playGame(game)} style={{ margin: "10px", padding: "10px" }}>
                  {game.toUpperCase()} 실행
                </button>
              ))}
            </div>
          ) : (
            <p>서버 오류: 게임을 불러올 수 없습니다.</p>
          )}
        </>
      )}

      {result && <pre style={{ marginTop: "20px", background: "#f4f4f4", padding: "10px" }}>{result}</pre>}
    </div>
  );
};

export default App;
