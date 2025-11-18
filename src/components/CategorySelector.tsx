import type { Category } from '../types/category';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelect: (categoryId: string | undefined) => void;
  taskId: number;
}

export function CategorySelector({
  categories,
  selectedCategoryId,
  onSelect,
  taskId,
}: CategorySelectorProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onSelect(undefined)}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          !selectedCategoryId
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        None
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedCategoryId === category.id
              ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800'
              : 'opacity-80 hover:opacity-100'
          }`}
          style={{
            backgroundColor: selectedCategoryId === category.id ? category.color : `${category.color}40`,
            color: selectedCategoryId === category.id ? '#fff' : category.color,
            ringColor: category.color,
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

