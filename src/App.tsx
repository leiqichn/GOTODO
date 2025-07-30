import React, { useEffect, useState } from 'react';
import { TodoItem } from './types';
import { getTodos, setTodos } from './storage';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import QuadrantView from './components/QuadrantView';

type Mode = 'overview' | 'day';

const App: React.FC = () => {
  const [todos, setTodoList] = useState<TodoItem[]>([]);
  const [mode, setMode] = useState<Mode>('overview');

  useEffect(() => {
    getTodos().then(setTodoList);
  }, []);

  const saveTodos = async (newTodos: TodoItem[]) => {
    setTodoList(newTodos);
    await setTodos(newTodos);
  };

  return (
    <div style={{ width: 400, padding: 16 }}>
      <h2>GOTODO</h2>
      <div>
        <button onClick={() => setMode('overview')}>总览模式</button>
        <button onClick={() => setMode('day')}>日模式</button>
      </div>
      <TodoForm todos={todos} onChange={saveTodos} />
      {mode === 'overview' ? (
        <TodoList todos={todos} onChange={saveTodos} />
      ) : (
        <QuadrantView todos={todos} />
      )}
    </div>
  );
};

export default App;