## mirror input component 예제

이때 아래처럼 구현의 일부분만 주어질 때, 내가 입력한대로 출력되는 mirror input 예제를 구현 해보고자합니다.

구성은 다음과 같이 합니다.

App.tsx

```tsx
import "./App.css";
import Tab from "./components/MirrorInput";

function App() {
  return (
    <>
      <MirrorInput />
    </>
  );
}

export default App;
```

src/components/MirrorInput.tsx

```tsx
import React, { useState, type ChangeEvent } from "react";

function MirrorInput() {
  const [text, setText] = useState(""); // useState type 선언하기

  const handleChange = (
    e: any /** ChangeEvent<HTMLInputElement> 타입 선언하기 */
  ) => {
    setText(e.target.value);
  };

  return (
    <div>
      {/* 입력한 내용 입력/출력되게 완성하기 */}
      <input type="text" />
      <p>입력한 내용:</p>
    </div>
  );
}

export default MirrorInput;
```
