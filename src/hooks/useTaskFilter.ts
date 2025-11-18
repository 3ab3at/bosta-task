import { useState, useMemo } from 'react';
import type { Task } from '../types/task';
import type { FilterStatus } from '../types/filter';

export function useTaskFilter(tasks: Task[]) {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by status
    if (filterStatus === 'active') {
      filtered = filtered.filter((task) => !task.completed);
    } else if (filterStatus === 'completed') {
      filtered = filtered.filter((task) => task.completed);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((task) =>
        task.todo.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [tasks, filterStatus, searchQuery]);

  return {
    filteredTasks,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
  };
}

