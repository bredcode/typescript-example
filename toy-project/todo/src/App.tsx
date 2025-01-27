import React, { useState, ChangeEvent } from "react";

// Todo 아이템 구조 정의
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // 상태 관리
  // todos 배열은 Todo 타입의 요소만 가질 수 있음
  const [todos, setTodos] = useState<Todo[]>([]);
  // input은 문자열만 가능
  const [input, setInput] = useState<string>("");

  // ToDo 추가
  const addTodo = (): void => {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  // ToDo 완료 여부 토글
  // todoId는 number 타입이어야만 함
  const toggleTodo = (todoId: number): void => {
    setTodos((prev) => prev.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo)));
  };

  // ToDo 삭제
  const removeTodo = (todoId: number): void => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  // onChange 핸들러 타입 정의
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Todo List (TS)</h1>
      <input type="text" value={input} onChange={handleChange} placeholder="할 일을 입력하세요" />
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
