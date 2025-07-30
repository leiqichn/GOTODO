export interface TodoItem {
    id: string;
    name: string;
    description: string;
    priority: 1 | 2 | 3 | 4; // 1:重要紧急, 2:重要不紧急, 3:紧急不重要, 4:不重要不紧急
    deadline: string; // ISO 字符串
    createdAt: string; // ISO 字符串
    order: number;
    completed?: boolean; // 新增，表示是否完成
  }