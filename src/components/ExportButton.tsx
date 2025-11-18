import { useState } from 'react';
import type { Task } from '../types/task';
import type { Category } from '../types/category';
import type { TaskCategoryMap, TaskDueDateMap } from '../utils/taskStorage';
import { exportToJSON, exportToCSV } from '../utils/export';

interface ExportButtonProps {
  tasks: Task[];
  categories: Category[];
  taskCategoryMap: TaskCategoryMap;
  taskDueDateMap: TaskDueDateMap;
}

export function ExportButton({
  tasks,
  categories,
  taskCategoryMap,
  taskDueDateMap,
}: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportJSON = () => {
    exportToJSON(tasks, categories, taskCategoryMap, taskDueDateMap);
    setIsOpen(false);
  };

  const handleExportCSV = () => {
    exportToCSV(tasks, categories, taskCategoryMap, taskDueDateMap);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
        aria-label="Export tasks"
        aria-expanded={isOpen}
      >
        📥 Export
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 min-w-[150px]">
            <button
              onClick={handleExportJSON}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              Export as JSON
            </button>
            <button
              onClick={handleExportCSV}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              Export as CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
}

