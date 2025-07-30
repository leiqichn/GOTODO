import { TodoItem } from './types';

const STORAGE_KEY = 'gotodo_items';

export async function getTodos(): Promise<TodoItem[]> {
  return new Promise(resolve => {
    chrome.storage.local.get([STORAGE_KEY], result => {
      resolve(result[STORAGE_KEY] || []);
    });
  });
}

export async function setTodos(todos: TodoItem[]) {
  return new Promise(resolve => {
    chrome.storage.local.set({ [STORAGE_KEY]: todos }, resolve);
  });
}
