import { useState } from "react";

export default function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [op, setOp] = useState("+");
  const [result, setResult] = useState("");

  const calc = () => {
    let result;
    switch (op) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = a / b;
        break;
      default:
        break;
    }
    setResult(result);
  };

  return (
    <div style={{ padding: 24 }}>
      <input value={a} onChange={(e) => setA(e.target.value)} placeholder="첫 번째 수" />
      <select value={op} onChange={(e) => setOp(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input value={b} onChange={(e) => setB(e.target.value)} placeholder="두 번째 수" />
      <button onClick={calc}>=</button>
      <div style={{ marginTop: 12, fontWeight: "bold" }}>{result}</div>
    </div>
  );
}
