import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const API_URL = "http://localhost:3000";

  // 컴포넌트 마운트 시 백엔드에서 Todo 목록 불러오기
  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // 새 Todo 추가: 백엔드에 POST 요청
  const addTodo = () => {
    if (input.trim() === "") return;
    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setTodos((prev) => [...prev, newTodo]);
        setInput("");
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  // Todo 완료 상태 토글: 백엔드에 PUT 요청
  const toggleTodo = (todoId) => {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;
    fetch(`${API_URL}/todos/${todoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => setTodos((prev) => prev.map((t) => (t.id === todoId ? updatedTodo : t))))
      .catch((err) => console.error("Error toggling todo:", err));
  };

  // Todo 삭제: 백엔드에 DELETE 요청
  const removeTodo = (todoId) => {
    fetch(`${API_URL}/todos/${todoId}`, {
      method: "DELETE",
    })
      .then(() => setTodos((prev) => prev.filter((t) => t.id !== todoId)))
      .catch((err) => console.error("Error deleting todo:", err));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="할 일을 입력하세요" />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span className={`todo-text ${todo.completed ? "completed" : ""}`}>{todo.title}</span>
            <div className="todo-actions">
              <button onClick={() => toggleTodo(todo.id)}>토글</button>
              <button onClick={() => removeTodo(todo.id)}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
