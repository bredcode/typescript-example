import { useState } from "react";

type Operator = "+" | "-" | "*" | "/";

function toNumber(value: string): number {
  const n = Number(value.trim());
  if (Number.isNaN(n)) {
    throw new Error(`Invalid number: "${value}"`);
  }
  return n;
}

export default function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [op, setOp] = useState<Operator>("+");
  const [result, setResult] = useState("");

  const calc = () => {
    try {
      const na = toNumber(a);
      const nb = toNumber(b);

      if (op === "/" && nb === 0) {
        throw new Error("Cannot divide by zero");
      }

      let result: number;
      switch (op) {
        case "+":
          result = na + nb;
          break;
        case "-":
          result = na - nb;
          break;
        case "*":
          result = na * nb;
          break;
        case "/":
          result = na / nb;
          break;
      }
      setResult(String(result));
    } catch (err) {
      setResult("Unknown error" + err);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <input value={a} onChange={(e) => setA(e.target.value)} placeholder="첫 번째 수" />
      <select value={op} onChange={(e) => setOp(e.target.value as Operator)}>
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
