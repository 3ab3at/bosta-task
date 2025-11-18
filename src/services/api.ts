import type { Task, TaskResponse, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

const BASE_URL = 'https://dummyjson.com';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
}

export const taskApi = {
  /**
   * Fetch all tasks
   */
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${BASE_URL}/todos`);
      const data: TaskResponse = await handleResponse<TaskResponse>(response);
      return data.todos;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to fetch tasks. Please check your internet connection.');
    }
  },

  /**
   * Fetch a specific task by ID
   */
  async getTaskById(id: number): Promise<Task> {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`);
      return handleResponse<Task>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error(`Failed to fetch task ${id}. Please check your internet connection.`);
    }
  },

  /**
   * Create a new task
   */
  async createTask(task: CreateTaskRequest): Promise<Task> {
    try {
      const response = await fetch(`${BASE_URL}/todos/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      return handleResponse<Task>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to create task. Please check your internet connection.');
    }
  },

  /**
   * Update an existing task
   */
  async updateTask(id: number, updates: UpdateTaskRequest): Promise<Task> {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      return handleResponse<Task>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error(`Failed to update task ${id}. Please check your internet connection.`);
    }
  },

  /**
   * Delete a task
   */
  async deleteTask(id: number): Promise<Task> {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      return handleResponse<Task>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error(`Failed to delete task ${id}. Please check your internet connection.`);
    }
  },
};

export { ApiError };

