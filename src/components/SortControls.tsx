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
    
    return (
      <button
        onClick={() => handleSortClick(field)}
        className={`
          flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
          ${isActive 
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}
          mr-2`}
        aria-current={isActive ? 'true' : 'false'}
      >
        {label}
        
        {isActive && (
          <span className="ml-1">
            {sortDirection === 'asc' ? (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </span>
        )}
      </button>
    );
  };
  
  return (
    <div className="flex flex-wrap items-center">
      <span className="text-sm text-gray-600 dark:text-gray-400 mr-3 mb-2 sm:mb-0">Sort by:</span>
      <div className="flex flex-wrap gap-2">
        <SortButton field="name" label="Name" />
        <SortButton field="current_price" label="Price" />
        <SortButton field="price_change_percentage_24h" label="24h Change" />
        <SortButton field="market_cap" label="Market Cap" />
      </div>
    </div>
  );
} 