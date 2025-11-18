import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import type { Task } from '../types/task';
import type { Category } from '../types/category';
import { CategorySelector } from './CategorySelector';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  categories: Category[];
  taskCategoryMap: { [taskId: number]: string };
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, todo: string) => Promise<void>;
  onReorder: (startIndex: number, endIndex: number) => void;
  onCategoryChange: (taskId: number, categoryId: string | undefined) => void;
}

export function TaskList({
  tasks,
  loading,
  error,
  categories,
  taskCategoryMap,
  onToggle,
  onDelete,
  onUpdate,
  onReorder,
  onCategoryChange,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [categoryEditingId, setCategoryEditingId] = useState<number | null>(null);

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
        <p className="text-red-800 dark:text-red-200">{error}</p>
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
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3 group transition-transform ${
                      snapshot.isDragging
                        ? 'shadow-lg scale-105 border-blue-400 dark:border-blue-600'
                        : ''
                    }`}
                  >
                    <div
                      {...provided.dragHandleProps}
                      className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      aria-label="Drag to reorder"
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
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
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
                          className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                        <button
                          onClick={() => saveEdit(task.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 flex flex-col gap-2">
                          <span
                            onClick={() => startEdit(task)}
                            className={`cursor-pointer ${
                              task.completed
                                ? 'line-through text-gray-500 dark:text-gray-400'
                                : 'text-gray-900 dark:text-gray-100'
                            }`}
                          >
                            {task.todo}
                          </span>
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
                            <div className="flex items-center gap-2">
                              {taskCategoryMap[task.id] && (
                                <span
                                  className="px-2 py-1 rounded-full text-xs font-medium"
                                  style={{
                                    backgroundColor: `${categories.find((c) => c.id === taskCategoryMap[task.id])?.color}40`,
                                    color: categories.find((c) => c.id === taskCategoryMap[task.id])?.color,
                                  }}
                                >
                                  {categories.find((c) => c.id === taskCategoryMap[task.id])?.name}
                                </span>
                              )}
                              <button
                                onClick={() => setCategoryEditingId(task.id)}
                                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                              >
                                {taskCategoryMap[task.id] ? 'Change' : 'Add category'}
                              </button>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => onDelete(task.id)}
                          className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition-opacity focus:opacity-100"
                          aria-label="Delete task"
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

