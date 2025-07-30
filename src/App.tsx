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
      <div style={{ display: 'flex', gap: 10, margin: '10px 0 18px 0' }}>
        <button
          onClick={() => setMode('overview')}
          style={{
            flex: 1,
            height: 36,
            border: 'none',
            borderRadius: 6,
            background: mode === 'overview'
              ? 'linear-gradient(90deg, #409eff 60%, #66b1ff 100%)'
              : '#f0f0f0',
            color: mode === 'overview' ? '#fff' : '#409eff',
            fontWeight: 600,
            fontSize: 15,
            boxShadow: mode === 'overview' ? '0 1px 4px #e0e0e0' : 'none',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseOver={e => {
            if (mode !== 'overview') e.currentTarget.style.background = '#e6f0fa';
          }}
          onMouseOut={e => {
            if (mode !== 'overview') e.currentTarget.style.background = '#f0f0f0';
          }}
        >
          总览模式
        </button>
        <button
          onClick={() => setMode('day')}
          style={{
            flex: 1,
            height: 36,
            border: 'none',
            borderRadius: 6,
            background: mode === 'day'
              ? 'linear-gradient(90deg, #409eff 60%, #66b1ff 100%)'
              : '#f0f0f0',
            color: mode === 'day' ? '#fff' : '#409eff',
            fontWeight: 600,
            fontSize: 15,
            boxShadow: mode === 'day' ? '0 1px 4px #e0e0e0' : 'none',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseOver={e => {
            if (mode !== 'day') e.currentTarget.style.background = '#e6f0fa';
          }}
          onMouseOut={e => {
            if (mode !== 'day') e.currentTarget.style.background = '#f0f0f0';
          }}
        >
          日模式
        </button>
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