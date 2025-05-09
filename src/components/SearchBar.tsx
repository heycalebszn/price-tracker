import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export default function SearchBar({ onSearch, isSearching }: SearchBarProps) {
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        onSearch(query);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query, onSearch]);
  
  return (
    <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto', marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a cryptocurrency..."
      />
      {isSearching && (
        <div style={{ position: 'absolute', right: '12px', top: '10px' }}>
          <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
        </div>
      )}
    </div>
  );
} 