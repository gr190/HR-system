import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

interface CriteriaProps {
  id: string;
  category: string;
  description: string;
  weight: number;
  onUpdate: (id: string, field: string, value: string | number) => void;
  onDelete: (id: string) => void;
}

export default function DraggableEvaluationCriteria({
  id,
  category,
  description,
  weight,
  onUpdate,
  onDelete,
}: CriteriaProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg group"
    >
      <button
        type="button"
        className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5" />
      </button>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="カテゴリ"
            value={category}
            onChange={(e) => onUpdate(id, 'category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg"
          />
        </div>
        <div className="md:col-span-1">
          <input
            type="text"
            placeholder="説明"
            value={description}
            onChange={(e) => onUpdate(id, 'description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="重み"
            value={weight}
            onChange={(e) => onUpdate(id, 'weight', parseInt(e.target.value, 10))}
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDelete(id)}
        className="p-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}