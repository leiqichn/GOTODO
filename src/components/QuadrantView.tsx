import React from 'react';
import { TodoItem } from '../types';

interface Props {
  todos: TodoItem[];
  onChange: (todos: TodoItem[]) => void;
}

const quadrantNames = ['重要紧急', '重要不紧急', '紧急不重要', '不重要不紧急'];

const QuadrantView: React.FC<Props> = ({ todos, onChange }) => {
  // 只显示今天的 TODO
  const today = new Date().toISOString().slice(0, 10);
  const todayTodos = todos.filter(t => t.deadline === today);

  const quadrants = [[], [], [], []] as TodoItem[][];
  todayTodos.forEach(todo => {
    quadrants[todo.priority - 1].push(todo);
  });

  // 切换完成状态
  const toggleCompleted = (id: string) => {
    onChange(
      todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {quadrants.map((list, idx) => (
        <div key={idx} style={{ border: '1px solid #aaa', minHeight: 80, padding: 8, borderRadius: 8, background: '#fafbfc' }}>
          <b>{quadrantNames[idx]}</b>
          <ul style={{ padding: 0, margin: 0 }}>
            {list.map(todo => (
              <li
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  margin: '8px 0',
                  opacity: todo.completed ? 0.6 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <input
                  type="checkbox"
                  checked={!!todo.completed}
                  onChange={() => toggleCompleted(todo.id)}
                  style={{ width: 18, height: 18, accentColor: '#409eff', cursor: 'pointer' }}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#aaa' : '#222',
                    fontSize: 15,
                  }}
                >
                  {todo.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuadrantView;