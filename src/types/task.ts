export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  categoryId?: string;
}

export interface TaskResponse {
  todos: Task[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateTaskRequest {
  todo: string;
  completed?: boolean;
  userId?: number;
}

export interface UpdateTaskRequest {
  todo?: string;
  completed?: boolean;
}

