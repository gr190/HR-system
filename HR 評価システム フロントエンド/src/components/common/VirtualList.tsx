import React from 'react';
import { useVirtualList } from '../../hooks/useVirtualList';

interface VirtualListProps<T> {
  items: T[];
  rowHeight?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export default function VirtualList<T>({
  items,
  rowHeight = 40,
  renderItem,
  className = '',
}: VirtualListProps<T>) {
  const { parentRef, virtualizer, virtualItems, totalSize } = useVirtualList(items, rowHeight);

  return (
    <div
      ref={parentRef}
      className={`overflow-auto ${className}`}
      style={{ height: '100%', width: '100%' }}
    >
      <div
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  );
}