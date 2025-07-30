import React from 'react';
import { TodoItem } from '../types';

interface Props {
  todos: TodoItem[];
  onChange: (todos: TodoItem[]) => void;
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

  return (
    <ul>
      {todos
        .sort((a, b) => a.order - b.order)
        .map((todo, idx) => (
          <li key={todo.id} style={{ margin: 8, border: '1px solid #ccc', padding: 8 }}>
            <b>{todo.name}</b>（{['重要紧急','重要不紧急','紧急不重要','不重要不紧急'][todo.priority-1]}）
            <div>{todo.description}</div>
            <div>截止: {todo.deadline}</div>
            <button onClick={() => move(idx, -1)}>上移</button>
            <button onClick={() => move(idx, 1)}>下移</button>
            <button onClick={() => remove(todo.id)}>删除</button>
          </li>
        ))}
    </ul>
  );
};

export default TodoList;