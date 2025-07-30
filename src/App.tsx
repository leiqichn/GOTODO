import React, { useEffect, useState } from 'react';
import { TodoItem } from './types';
import { getTodos, setTodos } from './storage';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import QuadrantView from './components/QuadrantView';
import './App.css';

type Mode = 'overview' | 'day';

const App: React.FC = () => {
  const [todos, setTodoList] = useState<TodoItem[]>([]);
  const [mode, setMode] = useState<Mode>('overview');
  const [hover, setHover] = useState(false);

  useEffect(() => {
    getTodos().then(setTodoList);
  }, []);

  const saveTodos = async (newTodos: TodoItem[]) => {
    setTodoList(newTodos);
    await setTodos(newTodos);
  };

  return (
    <div style={{ width: 400, padding: 16 }}>
      <h2 style={{ marginBottom: 0 }}>GOTODO</h2>
      <div
        className={`subtitle${hover ? ' subtitle-large' : ''}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setHover(h => !h)}
      >
        Eisenhower Matrix TODO Chrome Extension | 四象限法待办插件
      </div>
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