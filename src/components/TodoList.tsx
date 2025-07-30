import React from 'react';
import { TodoItem } from '../types';

interface Props {
  todos: TodoItem[];
  onChange: (todos: TodoItem[]) => void;
}

// 扩展 TodoItem 类型，支持 completed 字段
interface TodoItemWithCompleted extends TodoItem {
  completed?: boolean;
}

const TodoList: React.FC<Props> = ({ todos, onChange }) => {
  const move = (idx: number, dir: -1 | 1) => {
    const newTodos = [...todos];
    if (idx + dir < 0 || idx + dir >= todos.length) return;
    [newTodos[idx], newTodos[idx + dir]] = [newTodos[idx + dir], newTodos[idx]];
    onChange(newTodos.map((t, i) => ({ ...t, order: i })));
  };

  const remove = (id: string) => {
    onChange(todos.filter(t => t.id !== id).map((t, i) => ({ ...t, order: i })));
  };

  const toggleCompleted = (id: string) => {
    onChange(
      todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <ul style={{ padding: 0, margin: 0 }}>
      {todos
        .sort((a, b) => a.order - b.order)
        .map((todo, idx) => (
          <li
            key={todo.id}
            style={{
              margin: '10px 0',
              border: '1px solid #e0e0e0',
              borderRadius: 10,
              boxShadow: '0 2px 8px #f5f7fa',
              padding: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: todo.completed ? '#f6f6f6' : '#fff',
              opacity: todo.completed ? 0.6 : 1,
              transition: 'background 0.2s, opacity 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = todo.completed ? '#f0f0f0' : '#f4f8ff')}
            onMouseOut={e => (e.currentTarget.style.background = todo.completed ? '#f6f6f6' : '#fff')}
          >
            {/* 勾选按钮 */}
            <input
              type="checkbox"
              checked={!!todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              style={{ width: 20, height: 20, accentColor: '#409eff', cursor: 'pointer' }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#aaa' : '#222',
                  marginBottom: 2,
                }}
              >
                {todo.name}
                <span style={{
                  fontWeight: 400,
                  fontSize: 13,
                  color: todo.completed ? '#bbb' : '#409eff',
                  marginLeft: 8,
                }}>
                  （{['重要紧急','重要不紧急','紧急不重要','不重要不紧急'][todo.priority-1]}）
                </span>
              </div>
              {todo.description && (
                <div
                  style={{
                    fontSize: 14,
                    color: todo.completed ? '#bbb' : '#555',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    marginBottom: 2,
                  }}
                >
                  {todo.description}
                </div>
              )}
              <div style={{ fontSize: 13, color: '#888' }}>
                截止: {todo.deadline}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button
                onClick={() => move(idx, -1)}
                style={{
                  border: 'none',
                  background: '#f0f4fa',
                  color: '#409eff',
                  borderRadius: 5,
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: 13,
                  marginBottom: 2,
                }}
              >
                上移
              </button>
              <button
                onClick={() => move(idx, 1)}
                style={{
                  border: 'none',
                  background: '#f0f4fa',
                  color: '#409eff',
                  borderRadius: 5,
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: 13,
                  marginBottom: 2,
                }}
              >
                下移
              </button>
              <button
                onClick={() => remove(todo.id)}
                style={{
                  border: 'none',
                  background: '#fff0f0',
                  color: '#ff4d4f',
                  borderRadius: 5,
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                删除
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default TodoList;