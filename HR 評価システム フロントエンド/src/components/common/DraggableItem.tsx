import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function DraggableItem({
  id,
  children,
  className = '',
}: DraggableItemProps) {
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
      className={`flex items-center space-x-4 ${className}`}
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
        {children}
      </div>
    </div>
  );
}