import { useTasks } from './hooks/useTasks';
import { useTaskFilter } from './hooks/useTaskFilter';
import { TaskList } from './components/TaskList';
import { AddTaskForm } from './components/AddTaskForm';
import { FilterBar } from './components/FilterBar';

function App() {
  const { tasks, loading, error, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const {
    filteredTasks,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
  } = useTaskFilter(tasks);

  const handleAddTask = async (todo: string) => {
    await addTask({ todo, completed: false, userId: 1 });
  };

  const handleUpdateTask = async (id: number, todo: string) => {
    await updateTask(id, { todo });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Personal Task Manager
        </h1>
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
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  );
}

export default App;

