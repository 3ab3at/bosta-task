import { useState, useEffect } from 'react';
import { useTasks } from './hooks/useTasks';
import { useTaskFilter } from './hooks/useTaskFilter';
import { useCategories } from './hooks/useCategories';
import { useTheme } from './hooks/useTheme';
import { TaskList } from './components/TaskList';
import { AddTaskForm } from './components/AddTaskForm';
import { FilterBar } from './components/FilterBar';
import { ThemeToggle } from './components/ThemeToggle';
import { CategoryManager } from './components/CategoryManager';
import { getTaskCategories, setTaskCategory, type TaskCategoryMap } from './utils/taskStorage';

function App() {
  const { tasks, loading, error, addTask, updateTask, deleteTask, toggleTask, reorderTasks } = useTasks();
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { theme, toggleTheme } = useTheme();
  const [taskCategoryMap, setTaskCategoryMap] = useState<TaskCategoryMap>(() => getTaskCategories());
  
  const {
    filteredTasks,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
  } = useTaskFilter(tasks);

  useEffect(() => {
    // Sync taskCategoryMap with localStorage
    const stored = getTaskCategories();
    setTaskCategoryMap(stored);
  }, []);

  const handleCategoryChange = (taskId: number, categoryId: string | undefined) => {
    setTaskCategory(taskId, categoryId);
    setTaskCategoryMap((prev) => {
      const updated = { ...prev };
      if (categoryId) {
        updated[taskId] = categoryId;
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
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <CategoryManager
          categories={categories}
          onAddCategory={addCategory}
          onUpdateCategory={updateCategory}
          onDeleteCategory={deleteCategory}
        />
        <AddTaskForm onAdd={handleAddTask} loading={loading} />
        <FilterBar
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          error={error}
          categories={categories}
          taskCategoryMap={taskCategoryMap}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={handleUpdateTask}
          onReorder={handleReorder}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
}

export default App;

