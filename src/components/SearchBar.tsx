import React, { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export default function SearchBar({ onSearch, isSearching }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const initialRender = useRef(true);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Clear any pending debounced search
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
        searchTimeout.current = null;
      }
      
      // Perform search immediately
      onSearch(query);
    }
  };
  
  // Update debounced value after delay
  useEffect(() => {
    // Clear any existing timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    // Set a new timeout
    searchTimeout.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 800); // Increase debounce time to 800ms
    
    // Cleanup
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
        searchTimeout.current = null;
      }
    };
  }, [query]);
  
  // Only trigger search when debounced query changes and is not empty
  useEffect(() => {
    // Skip the first render to avoid running search on component mount
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);
  
  return (
    <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto', marginBottom: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a cryptocurrency..."
          style={{ flexGrow: 1 }}
        />
        <button type="submit" disabled={isSearching || !query.trim()}>
          Search
        </button>
      </form>
      {isSearching && (
        <div style={{ position: 'absolute', right: '70px', top: '10px' }}>
          <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
        </div>
      )}
    </div>
  );
} 