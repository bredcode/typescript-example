import React, { useState } from "react";

type Choice = "rock" | "paper" | "scissors"; // 선택지 타입 정의
type Result = "win" | "lose" | "draw"; // 결과 타입 정의
type Score = {
  user: number;
  computer: number;
}; // 점수 타입 정의

function App() {
  // 상태 관리
  const [userChoice, setUserChoice] = useState<Choice | "">(""); // 사용자의 선택
  const [computerChoice, setComputerChoice] = useState<Choice | "">(""); // 컴퓨터의 선택
  const [result, setResult] = useState<Result | "">(""); // 결과 상태
  const [score, setScore] = useState<Score>({ user: 0, computer: 0 }); // 점수 상태

  // 가위바위보 선택지 배열
  const choices: Choice[] = ["rock", "paper", "scissors"];

  // 승패 판별 함수
  const determineWinner = (user: Choice, computer: Choice): Result => {
    if (user === computer) return "draw";
    if (
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock") ||
      (user === "scissors" && computer === "paper")
    ) {
      return "win";
    }
    return "lose";
  };

  // 사용자가 선택했을 때 실행되는 함수
  const handleUserChoice = (choice: Choice) => {
    const computerRandomChoice: Choice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(computerRandomChoice);

    const gameResult: Result = determineWinner(choice, computerRandomChoice);
    setResult(gameResult);

    // 점수 업데이트
    if (gameResult === "win") {
      setScore((prev) => ({ ...prev, user: prev.user + 1 }));
    } else if (gameResult === "lose") {
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  // 초기화 함수
  const resetGame = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>가위바위보 게임</h1>
      {!result && (
        <div>
          <h2>당신의 선택은?</h2>
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleUserChoice(choice)}
              style={{ margin: "5px", padding: "10px 20px", fontSize: "16px" }}
            >
              {choice}
            </button>
          ))}
        </div>
      )}
      {userChoice && computerChoice && result && (
        <div style={{ marginTop: "20px" }}>
          <h3>결과</h3>
          <p>당신: {userChoice}</p>
          <p>컴퓨터: {computerChoice}</p>
          <h2>{result === "win" ? "🎉 승리!" : result === "lose" ? "😭 패배" : "😐 무승부"}</h2>
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <h3>점수판</h3>
        <p>당신: {score.user}</p>
        <p>컴퓨터: {score.computer}</p>
      </div>
      {result && (
        <button onClick={resetGame} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
          다시 하기
        </button>
      )}
    </div>
  );
}

export default App;
