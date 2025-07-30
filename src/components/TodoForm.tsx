import React, { useState } from 'react';
import { TodoItem } from '../types';

interface Props {
  todos: TodoItem[];
  onChange: (todos: TodoItem[]) => void;
}

const defaultForm = {
  name: '',
  description: '',
  priority: 1,
  deadline: '',
};

const TodoForm: React.FC<Props> = ({ todos, onChange }) => {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      name: form.name,
      description: form.description,
      priority: Number(form.priority) as 1 | 2 | 3 | 4,
      deadline: form.deadline,
      createdAt: new Date().toISOString(),
      order: todos.length,
    };
    onChange([...todos, newTodo]);
    setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '12px 0' }}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="名称" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="描述" />
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value={1}>重要紧急</option>
        <option value={2}>重要不紧急</option>
        <option value={3}>紧急不重要</option>
        <option value={4}>不重要不紧急</option>
      </select>
      <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />
      <button type="submit">添加</button>
    </form>
  );
};

export default TodoForm;