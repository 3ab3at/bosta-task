import { useState, useEffect, useRef } from 'react';
import { taskApi } from '../services/api';
import { getStoredTasks, setStoredTasks } from '../utils/taskStorage';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load from localStorage first for instant display
    return getStoredTasks();
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Generate next ID based on stored tasks
  const getNextId = () => {
    const stored = getStoredTasks();
    if (stored.length === 0) return 1000; // Start from 1000 to avoid conflicts
    return Math.max(...stored.map(t => t.id), 1000) + 1;
  };
  const nextIdRef = useRef<number>(getNextId());

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskApi.getAllTasks();
      // Merge with stored tasks (stored tasks take precedence for user-created ones)
      const storedTasks = getStoredTasks();
      
      // Add API tasks that aren't in storage, update stored tasks with API data if they exist
      const mergedTasks = [...fetchedTasks];
      storedTasks.forEach(storedTask => {
        const apiTask = fetchedTasks.find(t => t.id === storedTask.id);
        if (!apiTask) {
          // User-created task not in API, add it
          mergedTasks.push(storedTask);
        }
      });
      
      setTasks(mergedTasks);
      setStoredTasks(mergedTasks);
    } catch (err) {
      // If API fails, use stored tasks
      const storedTasks = getStoredTasks();
      if (storedTasks.length > 0) {
        setTasks(storedTasks);
      }
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: CreateTaskRequest) => {
    try {
      setError(null);
      let newTask: Task;
      try {
        newTask = await taskApi.createTask(taskData);
      } catch (apiErr) {
        // If API fails, create task locally with generated ID
        newTask = {
          id: nextIdRef.current++,
          todo: taskData.todo,
          completed: taskData.completed || false,
          userId: taskData.userId || 1,
        };
      }
      setTasks((prev) => {
        const updated = [newTask, ...prev];
        setStoredTasks(updated);
        return updated;
      });
      return newTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      setError(errorMessage);
      throw err;
    }
  };

  const updateTask = async (id: number, updates: UpdateTaskRequest) => {
    try {
      setError(null);
      let updatedTask: Task;
      try {
        updatedTask = await taskApi.updateTask(id, updates);
      } catch (apiErr) {
        // If API fails, update locally
        updatedTask = { id, ...updates } as Task;
      }
      setTasks((prev) => {
        const updated = prev.map((task) => (task.id === id ? updatedTask : task));
        setStoredTasks(updated);
        return updated;
      });
      return updatedTask;
    } catch (err) {
      // Fallback: update locally
      setTasks((prev) => {
        const updated = prev.map((task) => 
          task.id === id ? { ...task, ...updates } : task
        );
        setStoredTasks(updated);
        return updated;
      });
      return { id, ...updates } as Task;
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setError(null);
      try {
        await taskApi.deleteTask(id);
      } catch (apiErr) {
        // If API fails, continue with local delete
      }
      setTasks((prev) => {
        const updated = prev.filter((task) => task.id !== id);
        setStoredTasks(updated);
        return updated;
      });
    } catch (err) {
      // Fallback: delete locally
      setTasks((prev) => {
        const updated = prev.filter((task) => task.id !== id);
        setStoredTasks(updated);
        return updated;
      });
    }
  };

  const toggleTask = async (id: number, completed: boolean) => {
    await updateTask(id, { completed });
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    // Use functional update for immediate state change
    setTasks((prev) => {
      if (startIndex === endIndex) return prev;
      const result = [...prev];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      setStoredTasks(result);
      return result;
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    reorderTasks,
  };
}

