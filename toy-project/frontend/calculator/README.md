# 계산기 단계형 실습 문제

## 학습 목표

- JavaScript에서 예상할 수 없는 타입 오류를 직접 경험해본다.
- TypeScript로 마이그레이션하며 **타입**으로 문제를 예방/해결한다.

---

## 사전 준비

프로젝트 초기화:

```
npx create-vite@latest calculator --template react-ts
cd calculator
npm install
npm run dev
```

폴더 구조(주요):

```
calculator/
  ├─ src/
  │   ├─ App.tsx (ts 용)
  │   ├─ App.jsx (js 용)
  │   ├─ main.tsx
  │   └─ ...
  └─ index.html
```

---

## 1단계: JS를 이용한 계산기 만들기

`src/App.tsx`는 그대로 두고 `src/App.jsx`를 하나 추가로 만들어 작성:  
(이때, main.tsx에서 `import App from "./App.tsx";` -> `import App from "./App.jsx";`로 변경)

```tsx
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
```

**체크포인트**

- 계산기 동작을 시키기 전, 코드상 어떤 문제가 있을지 확인해본다.
- 다양한 연산을 동작시켜보고 실제로 런타임 시 문제가 있는지 확인해본다.
- 런타임 시 문제 -> 서비스 배포 후 실제 사용자들이 사용하는 과정에서 문제가 발생한 것과 동일
  - 이는 실제 서비스 운영 시 아주 크리티컬한 상황으로 이어질 수 있다.

**질문**

1. 왜 `+`에서만 버그처럼 보이는 현상이 나타날까?
2. 이런 버그를 **타입**으로 사전에 예방하려면 어떻게 변경해야할까?

---

## 2단계: TS로 타입 안정성 도입하기

지금부터 직접 `App.jsx` -> `App.tsx`로 수정하고 type을 도입하여 순차적 마이그레이션을 진행, 코드의 오류를 제거하는 시간을 가져봅시다.

`src/App.tsx`를 수정:
(이때, main.tsx에서 `import App from "./App.jsx";` -> `import App from "./App.tsx";`로 변경)

<details>
<summary>🎯 정답 확인 (스스로 풀어보고 확인해주세요)</summary>

```tsx
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
```

**핵심 포인트**

- `toNumber`로 **명시적 변환**을 강제 → 문자열 결합 불가.
- `Operator` 유니온 타입으로 연산자 오타를 컴파일 타임에 차단.
- 0으로 나누기 같은 런타임 예외 처리.
</details>
