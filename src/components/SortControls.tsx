import React from 'react';

interface SortControlsProps {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (sortBy: string, direction: 'asc' | 'desc') => void;
}

export default function SortControls({ 
  sortBy, 
  sortDirection, 
  onSortChange 
}: SortControlsProps) {
  
  const handleSortClick = (field: string) => {
    // If clicking the same field, toggle direction, else set to desc
    if (field === sortBy) {
      onSortChange(field, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(field, 'desc');
    }
  };
  
  const SortButton = ({ field, label }: { field: string, label: string }) => {
    const isActive = sortBy === field;
    const icon = isActive 
      ? sortDirection === 'asc' 
        ? '↑' 
        : '↓'
      : '';
      
    return (
      <button
        onClick={() => handleSortClick(field)}
        className={isActive ? 'button-active mr-2' : 'mr-2'}
        style={{ 
          marginRight: '8px', 
          padding: '6px 12px', 
          borderRadius: '4px'
        }}
      >
        {label} {icon}
      </button>
    );
  };
  
  return (
    <div className="flex items-center mb-4">
      <span className="text-sm text-gray-400 mr-2">Sort by:</span>
      <SortButton field="name" label="Name" />
      <SortButton field="current_price" label="Price" />
      <SortButton field="price_change_percentage_24h" label="24h Change" />
    </div>
  );
} 