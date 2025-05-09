'use client';

import { useState } from 'react';
import { useCryptoData, useSearchCrypto } from '@/hooks/useCryptoData';
import CryptoCard from '@/components/CryptoCard';
import SearchBar from '@/components/SearchBar';
import SortControls from '@/components/SortControls';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { CryptoData } from '@/types/crypto';

export default function Home() {
  // State for sorting
  const [sortBy, setSortBy] = useState<string>('market_cap');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  // Fetch crypto data with React Query
  const { 
    data: cryptoData, 
    isLoading, 
    isError, 
    error 
  } = useCryptoData(sortBy, sortDirection);
  
  // Search functionality
  const { 
    search, 
    searchResults, 
    isSearching, 
    searchError 
  } = useSearchCrypto();
  
  // Handle search
  const handleSearch = (query: string) => {
    if (query.trim()) {
      search(query);
      setIsSearchMode(true);
    }
  };
  
  // Add a reset search function
  const resetSearch = () => {
    setIsSearchMode(false);
  };
  
  // Handle sort changes
  const handleSortChange = (newSortBy: string, direction: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortDirection(direction);
  };
  
  // Determine which data to display
  const displayData: CryptoData[] = isSearchMode ? searchResults : cryptoData;
  
  return (
    <main style={{ padding: '16px' }}>
      <div className="container">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Crypto Price Tracker
          </h1>
          <p className="text-gray-400" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Track real-time prices and 24-hour changes for popular cryptocurrencies
          </p>
        </header>
        
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
        
        {/* Display error from search if in search mode */}
        {isSearchMode && searchError && (
          <ErrorState message={searchError.message} />
        )}
        
        {/* Add a back button when in search mode */}
        {isSearchMode && !isSearching && (
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-400">
              {searchResults.length === 0 
                ? 'No cryptocurrencies found matching your search.' 
                : `Found ${searchResults.length} cryptocurrencies.`}
            </div>
            <button 
              onClick={resetSearch}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              ← Back to main list
            </button>
          </div>
        )}
        
        {/* Show sort controls only when not in search mode */}
        {!isSearchMode && (
          <SortControls 
            sortBy={sortBy} 
            sortDirection={sortDirection} 
            onSortChange={handleSortChange} 
          />
        )}
        
        {/* Loading State */}
        {isLoading && <LoadingState />}
        
        {/* Error State */}
        {!isSearchMode && isError && (
          <ErrorState 
            message={error instanceof Error ? error.message : 'Failed to fetch data'} 
          />
        )}
        
        {/* Crypto Grid */}
        <div className="grid">
          {displayData.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
        
        {/* Auto-refresh indicator */}
        <div className="text-xs text-gray-400 text-center mt-8">
          Data auto-refreshes every 30 seconds
        </div>
      </div>
    </main>
  );
}
