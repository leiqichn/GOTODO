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

  useEffect(() => {
    getTodos().then(setTodoList);
  }, []);

  const saveTodos = async (newTodos: TodoItem[]) => {
    setTodoList(newTodos);
    await setTodos(newTodos);
  };

  return (
    <div style={{ width: 400, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h2 style={{ margin: 0 }}>GOTODO</h2>
        <a
          href="https://github.com/leiqichn"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#f0f0f0',
            color: '#333',
            textDecoration: 'none',
            transition: 'all 0.2s',
            fontSize: 18,
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#333';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#f0f0f0';
            e.currentTarget.style.color = '#333';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="关注我GitHub"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{ display: 'block' }}
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </div>
      <div
        style={{
          fontSize: 14,
          color: '#888',
          marginBottom: 16,
          textAlign: 'center',
        }}
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
        <QuadrantView todos={todos} onChange={saveTodos} />
      )}
    </div>
  );
};

export default App;