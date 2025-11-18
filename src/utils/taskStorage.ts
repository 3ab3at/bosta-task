// Utility to sync task categories and due dates with localStorage
// Since the API doesn't support these, we'll store them locally
// Also store tasks as backup since the mock API doesn't persist

import type { Task } from '../types/task';

const CATEGORY_STORAGE_KEY = 'task-manager-task-categories';
const DUE_DATE_STORAGE_KEY = 'task-manager-task-due-dates';
const TASKS_STORAGE_KEY = 'task-manager-tasks';

export interface TaskCategoryMap {
  [taskId: number]: string; // taskId -> categoryId
}

export interface TaskDueDateMap {
  [taskId: number]: string; // taskId -> ISO date string
}

export function getTaskCategories(): TaskCategoryMap {
  try {
    const stored = localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load task categories from localStorage:', error);
  }
  return {};
}

export function setTaskCategory(taskId: number, categoryId: string | undefined) {
  try {
    const map = getTaskCategories();
    if (categoryId) {
      map[taskId] = categoryId;
    } else {
      delete map[taskId];
    }
    localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(map));
  } catch (error) {
    console.error('Failed to save task category to localStorage:', error);
  }
}

export function getTaskCategory(taskId: number): string | undefined {
  const map = getTaskCategories();
  return map[taskId];
}

export function getTaskDueDates(): TaskDueDateMap {
  try {
    const stored = localStorage.getItem(DUE_DATE_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load task due dates from localStorage:', error);
  }
  return {};
}

export function setTaskDueDate(taskId: number, dueDate: string | undefined) {
  try {
    const map = getTaskDueDates();
    if (dueDate) {
      map[taskId] = dueDate;
    } else {
      delete map[taskId];
    }
    localStorage.setItem(DUE_DATE_STORAGE_KEY, JSON.stringify(map));
  } catch (error) {
    console.error('Failed to save task due date to localStorage:', error);
  }
}

export function getTaskDueDate(taskId: number): string | undefined {
  const map = getTaskDueDates();
  return map[taskId];
}

// Task storage functions for persistence
export function getStoredTasks(): Task[] {
  try {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
  }
  return [];
}

export function setStoredTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}
