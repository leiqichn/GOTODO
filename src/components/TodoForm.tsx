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
    const deadline = form.deadline || new Date().toISOString().slice(0, 10);
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      name: form.name,
      description: form.description,
      priority: Number(form.priority) as 1 | 2 | 3 | 4,
      deadline, // 用修正后的 deadline
      createdAt: new Date().toISOString(),
      order: todos.length,
    };
    onChange([...todos, newTodo]);
    setForm(defaultForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: '12px 0',
        background: '#f8f9fa',
        padding: 12,
        borderRadius: 10,
        boxShadow: '0 2px 8px #eee',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="名称"
          required
          style={{
            flex: 1,
            height: 36,
            border: '1px solid #ddd',
            borderRadius: 6,
            padding: '0 10px',
            fontSize: 15,
            outline: 'none',
            background: '#fff',
            color: '#222',
          }}
          onFocus={e => (e.target.style.border = '1.5px solid #409eff')}
          onBlur={e => (e.target.style.border = '1px solid #ddd')}
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="描述"
          style={{
            flex: 1,
            height: 36,
            border: '1px solid #ddd',
            borderRadius: 6,
            padding: '0 10px',
            fontSize: 15,
            outline: 'none',
            background: '#fff',
            color: '#555',
            transition: 'border 0.2s',
          }}
          onFocus={e => (e.target.style.border = '1.5px solid #409eff')}
          onBlur={e => (e.target.style.border = '1px solid #ddd')}
        />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          style={{
            flex: 1,
            height: 36,
            border: '1px solid #ddd',
            borderRadius: 6,
            padding: '0 8px',
            fontSize: 15,
            background: '#fff',
            color: '#333',
            outline: 'none',
            transition: 'border 0.2s',
          }}
          onFocus={e => (e.target.style.border = '1.5px solid #409eff')}
          onBlur={e => (e.target.style.border = '1px solid #ddd')}
        >
          <option value={1}>重要紧急</option>
          <option value={2}>重要不紧急</option>
          <option value={3}>紧急不重要</option>
          <option value={4}>不重要不紧急</option>
        </select>
        <input
          name="deadline"
          type="date"
          value={form.deadline || new Date().toISOString().slice(0, 10)}
          onChange={handleChange}
          style={{
            flex: 1,
            height: 36,
            border: '1px solid #ddd',
            borderRadius: 6,
            padding: '0 8px',
            fontSize: 15,
            background: '#fff',
            color: '#333',
            outline: 'none',
            minWidth: 120,
            transition: 'border 0.2s',
          }}
          onFocus={e => (e.target.style.border = '1.5px solid #409eff')}
          onBlur={e => (e.target.style.border = '1px solid #ddd')}
        />
        <button
          type="submit"
          style={{
            height: 36,
            border: 'none',
            borderRadius: 6,
            background: 'linear-gradient(90deg, #409eff 60%, #66b1ff 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
            padding: '0 18px',
            cursor: 'pointer',
            boxShadow: '0 1px 4px #e0e0e0',
            transition: 'background 0.2s',
            minWidth: 70,
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#66b1ff')}
          onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #409eff 60%, #66b1ff 100%)')}
        >
          添加
        </button>
      </div>
    </form>
  );
};

export default TodoForm;