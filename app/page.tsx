"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // Load todos from local storage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          SityakaTyatodo
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="flex mb-4">
            <input
              type="text"
              className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="新しいToDoを追加..."
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 flex items-center"
            >
              <FaPlus />
            </button>
          </div>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-3 mb-2 rounded-lg transition-colors ${todo.completed
                  ? "bg-green-100 dark:bg-green-900/50 text-gray-500 line-through"
                  : "bg-gray-200 dark:bg-gray-700"
                  }`}
              >
                <span
                  className="flex-grow cursor-pointer"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
          © 2023 SityakaTyatodo. All rights reserved.
        </p>
      </div>
    </div>
  );
}
