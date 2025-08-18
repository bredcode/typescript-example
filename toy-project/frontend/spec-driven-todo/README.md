## Spec Driven Todo

## Todo API 스펙

이 문서는 프론트엔드에서 호출해야 할 **Todo API**의 스펙을 설명합니다.  
베이스 URL: `http://localhost:4000/api`

---

## 1) Create Todo

- **Endpoint**: `POST /todos`
- **Headers**
  - `Content-Type: application/json`
- **Request Body**

  ```json
  {
    "title": "string (required, not empty)",
    "completed": "boolean (optional, default=false)"
  }
  ```

- **Response**  
  Created (201)

  ```json
  {
    "id": 1,
    "title": "예시",
    "completed": false,
    "createdAt": "2025-08-18T09:00:00.000Z"
  }
  ```

  Error (400)

  ```json
  {
    "error": "INVALID_TITLE",
    "message": "title은 비어있지 않은 문자열이어야 합니다."
  }
  ```

- 예시 cURL

  ```shell
  curl -X POST "http://localhost:4000/api/todos" \
  -H "Content-Type: application/json" \
  -d '{"title": "첫번째 투두"}'
  ```

## 2) Read Todos (목록 조회)

- **Endpoint**: `GET /todos`

- Response

  OK (200)

  ```json
  [
    {
      "id": 1,
      "title": "첫번째 투두",
      "completed": false,
      "createdAt": "2025-08-18T09:00:00.000Z"
    }
  ]
  ```

- 예시 cURL
  ```shell
  curl "http://localhost:4000/api/todos"
  ```

## 공통

- 모든 응답은 application/json 형식

---

## 3) 프론트엔드 (Vite + React-TS)

프로젝트 생성:

```bash
npx create-vite@latest spec-driven-todo --template react-ts
cd my-app
npm i
npm run dev
```

아래 문제(빈칸) 버전과 정답 버전의 App.tsx를 제공합니다.  
실습 시에는 문제 버전을 src/App.tsx에 붙여넣고 빈칸을 모두 채워 완성해봅니다.

`src/App.tsx`

```ts
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

const API_BASE = "http://localhost:3000/api"; // 실제 api 서버 주소는 제공 예정

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  // TODO: 1) 투두 목록을 불러오는 함수 작성 (GET /todos)
  // 함수명: fetchTodos
  // 요구사항:
  //  - fetch(`${API_BASE}/todos`)
  //  - 응답을 JSON으로 파싱하여 setTodos 호출
  //  - 에러는 console.error로 출력

  // TODO: 2) 첫 렌더링 시 목록을 불러오도록 useEffect에서 fetchTodos 호출

  // TODO: 3) 투두 생성 함수 작성 (POST /todos)
  // 함수명: createTodo
  // 요구사항:
  //  - 빈 문자열이면 return
  //  - fetch(`${API_BASE}/todos`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title }) })
  //  - 성공 시 입력창 비우고, 목록 갱신(fetchTodos 호출)
  //  - 에러는 console.error로 출력

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: 20 }}>
      <h1>Todo 실습</h1>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <input
          placeholder="할 일을 입력하세요"
          value={title}
          onChange={(e) => {
            // TODO: 4) 입력값 상태 반영
            /* setTitle( ??? ) */
          }}
          style={{ flex: 1, padding: 8 }}
        />
        <button
          onClick={() => {
            // TODO: 5) createTodo 호출
          }}
        >
          추가
        </button>
      </div>

      <section>
        <h2>목록</h2>
        <button
          onClick={() => {
            // TODO: 6) 수동 새로고침: fetchTodos 호출
          }}
          style={{ marginBottom: 12 }}
        >
          새로고침
        </button>

        <ul style={{ display: "grid", gap: 8, padding: 0 }}>
          {todos.map((t) => (
            <li
              key={t.id}
              style={{
                listStyle: "none",
                padding: 12,
                border: "1px solid #eee",
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  #{t.id} • {t.completed ? "완료" : "미완료"} • {new Date(t.createdAt).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && <p>데이터가 없습니다. 첫 할 일을 추가해보세요.</p>}
      </section>
    </div>
  );
}

export default App;
```
