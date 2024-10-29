import { useState, useCallback } from 'react';

interface UseDraggableListProps<T extends { id: string }> {
  initialItems: T[];
  onReorder?: (items: T[]) => void;
}

export function useDraggableList<T extends { id: string }>({
  initialItems,
  onReorder,
}: UseDraggableListProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);

  const handleReorder = useCallback((newItems: T[]) => {
    setItems(newItems);
    onReorder?.(newItems);
  }, [onReorder]);

  return {
    items,
    setItems,
    handleReorder,
  };
}