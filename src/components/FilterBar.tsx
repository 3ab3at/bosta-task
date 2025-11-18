import { useEffect, useState } from 'react';
import type { FilterStatus } from '../types/filter';

interface FilterBarProps {
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
}

export function FilterBar({
  filterStatus,
  onFilterChange,
  searchQuery,
  onSearchChange,
  searchInputRef,
}: FilterBarProps) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const checkMac = () => {
      const platform = navigator.platform.toUpperCase();
      const userAgent = navigator.userAgent.toUpperCase();
      return platform.indexOf('MAC') >= 0 || userAgent.indexOf('MAC') >= 0;
    };
    setIsMac(checkMac());
  }, []);
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search tasks... (Press / or ${isMac ? '⌘' : 'Ctrl'}+K)`}
            aria-label="Search tasks"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'active', 'completed'] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => onFilterChange(status)}
              aria-pressed={filterStatus === status}
              aria-label={`Filter by ${status} tasks`}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors capitalize focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

