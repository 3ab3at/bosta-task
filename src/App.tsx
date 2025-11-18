import { useTasks } from './hooks/useTasks';
import { TaskList } from './components/TaskList';

function App() {
  const { tasks, loading, error } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Personal Task Manager
        </h1>
        <TaskList tasks={tasks} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;

