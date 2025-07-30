import React from 'react';
import { TodoItem } from '../types';

interface Props {
  todos: TodoItem[];
}

const quadrantNames = ['重要紧急', '重要不紧急', '紧急不重要', '不重要不紧急'];

const QuadrantView: React.FC<Props> = ({ todos }) => {
  // 只显示今天的 TODO
  const today = new Date().toISOString().slice(0, 10);
  const todayTodos = todos.filter(t => t.deadline === today);

  const quadrants = [[], [], [], []] as TodoItem[][];

  todayTodos.forEach(todo => {
    quadrants[todo.priority - 1].push(todo);
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {quadrants.map((list, idx) => (
        <div key={idx} style={{ border: '1px solid #aaa', minHeight: 80, padding: 8 }}>
          <b>{quadrantNames[idx]}</b>
          <ul>
            {list.map(todo => (
              <li key={todo.id}>{todo.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuadrantView;