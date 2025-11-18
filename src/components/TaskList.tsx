import type { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export function TaskList({ tasks, loading, error }: TaskListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-gray-600 dark:text-gray-400">Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-800 dark:text-red-200">{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks found. Add your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3"
        >
          <input
            type="checkbox"
            checked={task.completed}
            readOnly
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span
            className={`flex-1 ${
              task.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-gray-100'
            }`}
          >
            {task.todo}
          </span>
        </div>
      ))}
    </div>
  );
}

