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
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new ApiError(response.status, errorMessage);
  }
  
  try {
    return await response.json();
  } catch (error) {
    throw new Error('Invalid response format from server');
  }
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 10000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout. Please check your internet connection.');
    }
    throw error;
  }
}

export const taskApi = {
  /**
   * Fetch all tasks
   */
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await fetchWithTimeout(`${BASE_URL}/todos`);
      const data: TaskResponse = await handleResponse<TaskResponse>(response);
      if (!data.todos || !Array.isArray(data.todos)) {
        throw new Error('Invalid data format received from server');
      }
      return data.todos;
    } catch (error) {
      if (error instanceof ApiError || error instanceof Error) {
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
      const response = await fetchWithTimeout(`${BASE_URL}/todos/${id}`);
      return handleResponse<Task>(response);
    } catch (error) {
      if (error instanceof ApiError || error instanceof Error) {
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
      if (!task.todo || !task.todo.trim()) {
        throw new Error('Task text cannot be empty');
      }
      const response = await fetchWithTimeout(`${BASE_URL}/todos/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      return handleResponse<Task>(response);
    } catch (error) {
      if (error instanceof ApiError || error instanceof Error) {
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
      if (updates.todo !== undefined && (!updates.todo || !updates.todo.trim())) {
        throw new Error('Task text cannot be empty');
      }
      const response = await fetchWithTimeout(`${BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      return handleResponse<Task>(response);
    } catch (error) {
      // Suppress 404 errors for tasks that don't exist in mock API
      if (error instanceof ApiError && error.status === 404) {
        // Return a mock task to avoid breaking the flow
        throw new ApiError(404, `Task ${id} not found in API`);
      }
      if (error instanceof ApiError || error instanceof Error) {
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
      const response = await fetchWithTimeout(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      return handleResponse<Task>(response);
    } catch (error) {
      // Suppress 404 errors for tasks that don't exist in mock API
      if (error instanceof ApiError && error.status === 404) {
        // Return a mock task to avoid breaking the flow
        throw new ApiError(404, `Task ${id} not found in API`);
      }
      if (error instanceof ApiError || error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to delete task ${id}. Please check your internet connection.`);
    }
  },
};

export { ApiError };

