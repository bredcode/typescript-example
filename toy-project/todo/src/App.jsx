import React, { useState } from "react";

function App() {
  // 상태 관리
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // ToDo 추가
  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  // ToDo 완료 여부 토글
  const toggleTodo = (todoId) => {
    setTodos((prev) => prev.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo)));
  };

  // ToDo 삭제
  const removeTodo = (todoId) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Todo List</h1>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="할 일을 입력하세요" />
      <button onClick={addTodo}>추가</button>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
            <button onClick={() => toggleTodo(todo.id)}>토글</button>
            <button onClick={() => removeTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
