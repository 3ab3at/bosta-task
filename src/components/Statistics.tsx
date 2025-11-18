import { useMemo } from 'react';
import type { Task } from '../types/task';
import type { Category } from '../types/category';
import type { TaskCategoryMap, TaskDueDateMap } from '../utils/taskStorage';

interface StatisticsProps {
  tasks: Task[];
  categories: Category[];
  taskCategoryMap: TaskCategoryMap;
  taskDueDateMap: TaskDueDateMap;
}

export function Statistics({
  tasks,
  categories,
  taskCategoryMap,
  taskDueDateMap,
}: StatisticsProps) {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Tasks by category
    const tasksByCategory = categories.map((category) => {
      const categoryTasks = tasks.filter((t) => taskCategoryMap[t.id] === category.id);
      return {
        category: category.name,
        color: category.color,
        total: categoryTasks.length,
        completed: categoryTasks.filter((t) => t.completed).length,
        active: categoryTasks.filter((t) => !t.completed).length,
      };
    });

    // Tasks without category
    const uncategorizedTasks = tasks.filter((t) => !taskCategoryMap[t.id]);
    tasksByCategory.push({
      category: 'Uncategorized',
      color: '#6B7280',
      total: uncategorizedTasks.length,
      completed: uncategorizedTasks.filter((t) => t.completed).length,
      active: uncategorizedTasks.filter((t) => !t.completed).length,
    });

    // Tasks by due date status
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const overdue = tasks.filter((t) => {
      const dueDate = taskDueDateMap[t.id];
      if (!dueDate || t.completed) return false;
      const due = new Date(dueDate);
      due.setHours(0, 0, 0, 0);
      return due < today;
    }).length;

    const dueToday = tasks.filter((t) => {
      const dueDate = taskDueDateMap[t.id];
      if (!dueDate || t.completed) return false;
      const due = new Date(dueDate);
      due.setHours(0, 0, 0, 0);
      return due.getTime() === today.getTime();
    }).length;

    const dueThisWeek = tasks.filter((t) => {
      const dueDate = taskDueDateMap[t.id];
      if (!dueDate || t.completed) return false;
      const due = new Date(dueDate);
      due.setHours(0, 0, 0, 0);
      const weekFromNow = new Date(today);
      weekFromNow.setDate(today.getDate() + 7);
      return due > today && due <= weekFromNow;
    }).length;

    const withDueDate = tasks.filter((t) => taskDueDateMap[t.id]).length;
    const withoutDueDate = total - withDueDate;

    return {
      total,
      completed,
      active,
      completionRate,
      tasksByCategory: tasksByCategory.filter((c) => c.total > 0),
      overdue,
      dueToday,
      dueThisWeek,
      withDueDate,
      withoutDueDate,
    };
  }, [tasks, categories, taskCategoryMap, taskDueDateMap]);

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        📊 Statistics & Analytics
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.completed}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.completionRate}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Completion Progress
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {stats.completed} / {stats.total}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>

      {/* Tasks by Category */}
      {stats.tasksByCategory.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Tasks by Category
          </h3>
          <div className="space-y-2">
            {stats.tasksByCategory.map((cat) => (
              <div key={cat.category} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {cat.category}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {cat.total} ({cat.completed} done)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                    <div
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${cat.total > 0 ? (cat.completed / cat.total) * 100 : 0}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Due Date Statistics */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Due Date Overview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {stats.overdue > 0 && (
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                {stats.overdue}
              </div>
              <div className="text-xs text-red-700 dark:text-red-300">Overdue</div>
            </div>
          )}
          {stats.dueToday > 0 && (
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
              <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {stats.dueToday}
              </div>
              <div className="text-xs text-orange-700 dark:text-orange-300">Due Today</div>
            </div>
          )}
          {stats.dueThisWeek > 0 && (
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {stats.dueThisWeek}
              </div>
              <div className="text-xs text-yellow-700 dark:text-yellow-300">Due This Week</div>
            </div>
          )}
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
            <div className="text-lg font-bold text-gray-600 dark:text-gray-400">
              {stats.withDueDate}
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300">With Due Date</div>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
            <div className="text-lg font-bold text-gray-600 dark:text-gray-400">
              {stats.withoutDueDate}
            </div>
            <div className="text-xs text-gray-700 dark:text-gray-300">No Due Date</div>
          </div>
        </div>
      </div>
    </div>
  );
}

