export interface Category {
  id: string;
  name: string;
  color: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Work', color: '#3B82F6' },
  { id: '2', name: 'Personal', color: '#10B981' },
  { id: '3', name: 'Shopping', color: '#F59E0B' },
  { id: '4', name: 'Health', color: '#EF4444' },
  { id: '5', name: 'Other', color: '#8B5CF6' },
];

