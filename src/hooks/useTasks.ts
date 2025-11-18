import { useState, useEffect } from 'react';
import { taskApi } from '../services/api';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: CreateTaskRequest) => {
    try {
      setError(null);
      const newTask = await taskApi.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
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
      const updatedTask = await taskApi.updateTask(id, updates);
      setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
      return updatedTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setError(null);
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      setError(errorMessage);
      throw err;
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

