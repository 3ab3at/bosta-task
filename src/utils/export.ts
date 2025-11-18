import type { Task } from '../types/task';
import type { Category } from '../types/category';
import type { TaskCategoryMap, TaskDueDateMap } from './taskStorage';

interface ExportableTask extends Task {
  categoryName?: string;
  categoryColor?: string;
  dueDate?: string;
}

export function exportToJSON(
  tasks: Task[],
  categories: Category[],
  taskCategoryMap: TaskCategoryMap,
  taskDueDateMap: TaskDueDateMap
): void {
  const exportableTasks: ExportableTask[] = tasks.map((task) => {
    const categoryId = taskCategoryMap[task.id];
    const category = categoryId ? categories.find((c) => c.id === categoryId) : undefined;
    const dueDate = taskDueDateMap[task.id];

    return {
      ...task,
      categoryName: category?.name,
      categoryColor: category?.color,
      dueDate,
    };
  });

  const dataStr = JSON.stringify(exportableTasks, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToCSV(
  tasks: Task[],
  categories: Category[],
  taskCategoryMap: TaskCategoryMap,
  taskDueDateMap: TaskDueDateMap
): void {
  const headers = ['ID', 'Task', 'Completed', 'Category', 'Due Date', 'User ID'];
  const rows = tasks.map((task) => {
    const categoryId = taskCategoryMap[task.id];
    const category = categoryId ? categories.find((c) => c.id === categoryId) : undefined;
    const dueDate = taskDueDateMap[task.id];

    return [
      task.id.toString(),
      `"${task.todo.replace(/"/g, '""')}"`, // Escape quotes in CSV
      task.completed ? 'Yes' : 'No',
      category?.name || '',
      dueDate ? new Date(dueDate).toLocaleDateString() : '',
      task.userId.toString(),
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tasks-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

