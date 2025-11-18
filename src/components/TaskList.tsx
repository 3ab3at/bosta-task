import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import type { Task } from '../types/task';
import type { Category } from '../types/category';
import { CategorySelector } from './CategorySelector';
import { DatePicker } from './DatePicker';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  categories: Category[];
  taskCategoryMap: { [taskId: number]: string };
  taskDueDateMap: { [taskId: number]: string };
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, todo: string) => Promise<void>;
  onReorder: (startIndex: number, endIndex: number) => void;
  onCategoryChange: (taskId: number, categoryId: string | undefined) => void;
  onDueDateChange: (taskId: number, dueDate: string | undefined) => void;
}

export function TaskList({
  tasks,
  loading,
  error,
  categories,
  taskCategoryMap,
  taskDueDateMap,
  onToggle,
  onDelete,
  onUpdate,
  onReorder,
  onCategoryChange,
  onDueDateChange,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [categoryEditingId, setCategoryEditingId] = useState<number | null>(null);

  // Handle escape key to cancel editing or category selection
  useEffect(() => {
    if (!editingId && !categoryEditingId) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (categoryEditingId) {
          setCategoryEditingId(null);
        } else if (editingId) {
          cancelEdit();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [editingId, categoryEditingId]);

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditValue(task.todo);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const saveEdit = async (id: number) => {
    if (!editValue.trim()) {
      cancelEdit();
      return;
    }
    try {
      await onUpdate(id, editValue.trim());
      setEditingId(null);
      setEditValue('');
    } catch (error) {
      // Error handled by parent
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    onReorder(result.source.index, result.destination.index);
  };

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
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-red-800 dark:text-red-200 font-medium">Error loading tasks</p>
            <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
          </div>
        </div>
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 ${snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/10 rounded-lg p-2' : ''}`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={provided.draggableProps.style}
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3 group transition-transform ${
                      snapshot.isDragging
                        ? 'shadow-lg scale-105 border-blue-400 dark:border-blue-600'
                        : ''
                    }`}
                  >
                    <div
                      {...provided.dragHandleProps}
                      className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                      aria-label="Drag to reorder"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8h16M4 16h16"
                        />
                      </svg>
                    </div>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={(e) => onToggle(task.id, e.target.checked)}
                      aria-label={`Mark task "${task.todo}" as ${task.completed ? 'incomplete' : 'complete'}`}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                    />
                    {editingId === task.id ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(task.id);
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          autoFocus
                          aria-label="Edit task"
                          className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white"
                        />
                        <button
                          onClick={() => saveEdit(task.id)}
                          aria-label="Save changes"
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          aria-label="Cancel editing"
                          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 flex flex-col gap-2">
                          <button
                            onClick={() => startEdit(task)}
                            className={`text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 -ml-1 ${
                              task.completed
                                ? 'line-through text-gray-500 dark:text-gray-400'
                                : 'text-gray-900 dark:text-gray-100'
                            }`}
                            aria-label={`Edit task: ${task.todo}`}
                          >
                            {task.todo}
                          </button>
                          {categoryEditingId === task.id ? (
                            <CategorySelector
                              categories={categories}
                              selectedCategoryId={taskCategoryMap[task.id]}
                              onSelect={(categoryId) => {
                                onCategoryChange(task.id, categoryId);
                                setCategoryEditingId(null);
                              }}
                              taskId={task.id}
                            />
                          ) : (
                            <div className="flex items-center gap-2 flex-wrap">
                              {taskCategoryMap[task.id] ? (
                                <button
                                  onClick={() => setCategoryEditingId(task.id)}
                                  className="px-2 py-1 rounded-full text-xs font-medium transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
                                  style={{
                                    backgroundColor: `${categories.find((c) => c.id === taskCategoryMap[task.id])?.color}40`,
                                    color: categories.find((c) => c.id === taskCategoryMap[task.id])?.color,
                                    ringColor: categories.find((c) => c.id === taskCategoryMap[task.id])?.color,
                                  }}
                                  aria-label={`Change category: ${categories.find((c) => c.id === taskCategoryMap[task.id])?.name}`}
                                >
                                  {categories.find((c) => c.id === taskCategoryMap[task.id])?.name}
                                </button>
                              ) : (
                                <button
                                  onClick={() => setCategoryEditingId(task.id)}
                                  aria-label="Add category"
                                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 border border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                                >
                                  + Add category
                                </button>
                              )}
                              <DatePicker
                                value={taskDueDateMap[task.id]}
                                onChange={(dueDate) => onDueDateChange(task.id, dueDate)}
                                taskId={task.id}
                              />
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => onDelete(task.id)}
                          className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm transition-opacity focus:opacity-100"
                          aria-label={`Delete task: ${task.todo}`}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

