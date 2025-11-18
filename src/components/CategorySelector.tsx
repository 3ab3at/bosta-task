import type { Category } from '../types/category';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId?: string;
  onSelect: (categoryId: string | undefined) => void;
}

export function CategorySelector({
  categories,
  selectedCategoryId,
  onSelect,
}: CategorySelectorProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onSelect(undefined)}
        aria-pressed={!selectedCategoryId}
        aria-label="No category"
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
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
          aria-pressed={selectedCategoryId === category.id}
          aria-label={`Select ${category.name} category`}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            selectedCategoryId === category.id
              ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800'
              : 'opacity-80 hover:opacity-100'
          }`}
          style={{
            backgroundColor: selectedCategoryId === category.id ? category.color : `${category.color}40`,
            color: selectedCategoryId === category.id ? '#fff' : category.color,
            '--ring-color': category.color,
          } as React.CSSProperties & { '--ring-color'?: string }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

