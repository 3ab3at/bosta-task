import { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  value?: string; // ISO date string
  onChange: (date: string | undefined) => void;
  taskId: number;
}

export function DatePicker({ value, onChange, taskId }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date: Date | null): string => {
    if (!date) return 'No due date';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else if (diffDays <= 7) {
      return `Due in ${diffDays} days`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const date = new Date(dateValue);
      setSelectedDate(date);
      onChange(date.toISOString());
    } else {
      setSelectedDate(null);
      onChange(undefined);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    onChange(undefined);
    setIsOpen(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = selectedDate ? new Date(selectedDate) : null;
  if (dueDate) {
    dueDate.setHours(0, 0, 0, 0);
  }
  const isOverdue = dueDate && dueDate < today;

  // Handle escape key to close date picker
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`text-xs px-2 py-1 rounded transition-colors ${
          isOverdue
            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            : selectedDate
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}
        aria-label="Set due date"
      >
        📅 {formatDisplayDate(selectedDate)}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            <input
              ref={dateInputRef}
              type="date"
              value={formatDate(selectedDate)}
              onChange={handleDateChange}
              min={formatDate(new Date())}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleClear}
                className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

