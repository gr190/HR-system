import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ChevronUp, ChevronDown } from 'lucide-react';

interface ObjectiveProps {
  id: string;
  title: string;
  priority: number;
  progress: number;
  dueDate: string;
  onPriorityChange: (id: string, change: number) => void;
}

export default function DraggableObjective({
  id,
  title,
  priority,
  progress,
  dueDate,
  onPriorityChange,
}: ObjectiveProps) {
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
      className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
    >
      <button
        type="button"
        className="cursor-move p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </button>

      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <span>優先度: {priority}</span>
          <span>進捗: {progress}%</span>
          <span>期限: {dueDate}</span>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <button
          onClick={() => onPriorityChange(id, -1)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPriorityChange(id, 1)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}