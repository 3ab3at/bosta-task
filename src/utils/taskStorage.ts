// Utility to sync task categories with localStorage
// Since the API doesn't support categories, we'll store category mappings locally

const STORAGE_KEY = 'task-manager-task-categories';

export interface TaskCategoryMap {
  [taskId: number]: string; // taskId -> categoryId
}

export function getTaskCategories(): TaskCategoryMap {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (error) {
    console.error('Failed to save task category to localStorage:', error);
  }
}

export function getTaskCategory(taskId: number): string | undefined {
  const map = getTaskCategories();
  return map[taskId];
}

