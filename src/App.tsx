import { useState, useEffect, useRef } from 'react';
import { useTasks } from './hooks/useTasks';
import { useTaskFilter } from './hooks/useTaskFilter';
import { useCategories } from './hooks/useCategories';
import { useTheme } from './hooks/useTheme';
import { TaskList } from './components/TaskList';
import { AddTaskForm } from './components/AddTaskForm';
import { FilterBar } from './components/FilterBar';
import { ThemeToggle } from './components/ThemeToggle';
import { CategoryManager } from './components/CategoryManager';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { ExportButton } from './components/ExportButton';
import { Statistics } from './components/Statistics';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import {
  getTaskCategories,
  getTaskDueDates,
  setTaskDueDate,
  type TaskCategoryMap,
  type TaskDueDateMap,
} from './utils/taskStorage';

function App() {
  const { tasks, loading, error, addTask, updateTask, deleteTask, toggleTask, reorderTasks } = useTasks();
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { theme, toggleTheme } = useTheme();
  const [taskCategoryMap, setTaskCategoryMap] = useState<TaskCategoryMap>(() => getTaskCategories());
  const [taskDueDateMap, setTaskDueDateMap] = useState<TaskDueDateMap>(() => getTaskDueDates());
  const addTaskInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const {
    filteredTasks,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
  } = useTaskFilter(tasks);

  useKeyboardShortcuts({
    onAddTask: () => {
      addTaskInputRef.current?.focus();
    },
    onFocusSearch: () => {
      searchInputRef.current?.focus();
    },
  });

  useEffect(() => {
    // Sync taskCategoryMap and taskDueDateMap with localStorage
    const storedCategories = getTaskCategories();
    const storedDueDates = getTaskDueDates();
    setTaskCategoryMap(storedCategories);
    setTaskDueDateMap(storedDueDates);
  }, []);

  // Sync category map when tasks change (in case new tasks are added)
  // Only add categories for new tasks, don't overwrite existing assignments
  useEffect(() => {
    const storedCategories = getTaskCategories();
    setTaskCategoryMap((prev) => {
      // Only add categories for tasks that don't have one yet
      const updated = { ...prev };
      tasks.forEach((task) => {
        if (storedCategories[task.id] && !updated[task.id]) {
          updated[task.id] = storedCategories[task.id];
        }
      });
      return updated;
    });
  }, [tasks]);

  const handleCategoryChange = (taskId: number, categoryId: string | undefined) => {
    // Update state and localStorage atomically
    setTaskCategoryMap((prev) => {
      const updated = { ...prev };
      if (categoryId) {
        updated[taskId] = categoryId;
      } else {
        delete updated[taskId];
      }
      // Update localStorage to persist the change
      try {
        localStorage.setItem('task-manager-task-categories', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save category map:', error);
      }
      return updated;
    });
  };

  const handleDueDateChange = (taskId: number, dueDate: string | undefined) => {
    setTaskDueDate(taskId, dueDate);
    setTaskDueDateMap((prev) => {
      const updated = { ...prev };
      if (dueDate) {
        updated[taskId] = dueDate;
      } else {
        delete updated[taskId];
      }
      return updated;
    });
  };

  const handleAddTask = async (todo: string) => {
    await addTask({ todo, completed: false, userId: 1 });
  };

  const handleUpdateTask = async (id: number, todo: string) => {
    await updateTask(id, { todo });
  };

  const handleReorder = (startIndex: number, endIndex: number) => {
    // Map filtered indices back to original task indices
    const startTask = filteredTasks[startIndex];
    const endTask = filteredTasks[endIndex];
    
    const startOriginalIndex = tasks.findIndex((t) => t.id === startTask.id);
    const endOriginalIndex = tasks.findIndex((t) => t.id === endTask.id);
    
    reorderTasks(startOriginalIndex, endOriginalIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Personal Task Manager
          </h1>
          <div className="flex items-center gap-2">
            <ExportButton
              tasks={tasks}
              categories={categories}
              taskCategoryMap={taskCategoryMap}
              taskDueDateMap={taskDueDateMap}
            />
            <KeyboardShortcutsHelp />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
        <CategoryManager
          categories={categories}
          onAddCategory={addCategory}
          onUpdateCategory={updateCategory}
          onDeleteCategory={deleteCategory}
        />
        <AddTaskForm onAdd={handleAddTask} loading={loading} inputRef={addTaskInputRef} />
        <Statistics
          tasks={tasks}
          categories={categories}
          taskCategoryMap={taskCategoryMap}
          taskDueDateMap={taskDueDateMap}
        />
        <FilterBar
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchInputRef={searchInputRef}
        />
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          error={error}
          categories={categories}
          taskCategoryMap={taskCategoryMap}
          taskDueDateMap={taskDueDateMap}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={handleUpdateTask}
          onReorder={handleReorder}
          onCategoryChange={handleCategoryChange}
          onDueDateChange={handleDueDateChange}
        />
      </div>
    </div>
  );
}

export default App;

