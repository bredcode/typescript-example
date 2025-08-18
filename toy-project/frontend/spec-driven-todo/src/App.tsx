import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

const API_BASE = "http://localhost:3000/api";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  // 1) 목록 조회
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/todos`);
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  };

  // 2) 첫 렌더링 시 조회
  useEffect(() => {
    fetchTodos();
  }, []);

  // 3) 생성
  const createTodo = async () => {
    try {
      if (!title.trim()) return;
      await fetch(`${API_BASE}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });
      setTitle("");
      await fetchTodos();
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  };

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
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button
          onClick={() => {
            createTodo();
          }}
        >
          추가
        </button>
      </div>

      <section>
        <h2>목록</h2>
        <button
          onClick={() => {
            fetchTodos();
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
