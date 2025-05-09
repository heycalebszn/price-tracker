'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useCryptoData, useSearchCrypto } from '@/hooks/useCryptoData';
import CryptoCard from '@/components/CryptoCard';
import SearchBar from '@/components/SearchBar';
import SortControls from '@/components/SortControls';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { CryptoData } from '@/types/crypto';
import { useEffect } from 'react';

export default function Home() {
  // State for sorting and UI
  const [sortBy, setSortBy] = useState<string>('market_cap');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Theme management with next-themes
  const { resolvedTheme, setTheme } = useTheme();
  
  // After hydration, we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Toggle dark mode using next-themes
  const toggleDarkMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  
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
  
  // Reset search
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
  
  // Don't render toggle until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen py-10 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 w-8 ml-auto rounded bg-gray-200 mb-4"></div>
            <div className="h-10 w-64 mx-auto rounded bg-gray-200 mb-3"></div>
            <div className="h-6 w-96 mx-auto rounded bg-gray-200 mb-10"></div>
            <div className="h-12 rounded bg-gray-200 mb-6"></div>
            <div className="h-10 rounded bg-gray-200 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 rounded bg-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        {/* <div className="flex justify-end mb-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={resolvedTheme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {resolvedTheme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div> */}
        
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Crypto Price Tracker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track real-time prices and 24-hour changes for popular cryptocurrencies
          </p>
        </header>
        
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
        
        {/* Display error from search if in search mode */}
        {isSearchMode && searchError && (
          <div className="mb-6">
            <ErrorState message={searchError.message} />
          </div>
        )}
        
        {/* Add a back button when in search mode */}
        {isSearchMode && !isSearching && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-0">
              {searchResults.length === 0 
                ? 'No cryptocurrencies found matching your search.' 
                : `Found ${searchResults.length} ${searchResults.length === 1 ? 'cryptocurrency' : 'cryptocurrencies'}`}
            </div>
            <button 
              onClick={resetSearch}
              className="text-sm flex items-center px-3 py-2 rounded-lg text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to main list
            </button>
          </div>
        )}
        
        {/* Show sort controls only when not in search mode */}
        {!isSearchMode && (
          <div className="mb-6">
            <SortControls 
              sortBy={sortBy} 
              sortDirection={sortDirection} 
              onSortChange={handleSortChange} 
            />
          </div>
        )}
        
        {/* Loading State */}
        {isLoading && (
          <div className="my-12">
            <LoadingState />
          </div>
        )}
        
        {/* Error State */}
        {!isSearchMode && isError && (
          <div className="my-6">
            <ErrorState 
              message={error instanceof Error ? error.message : 'Failed to fetch data'} 
            />
          </div>
        )}
        
        {/* Crypto Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.map((crypto) => (
              <div key={crypto.id}>
                <CryptoCard crypto={crypto} />
              </div>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && displayData.length === 0 && !isError && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
              🔍
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No cryptocurrencies found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {isSearchMode 
                ? "Try a different search term" 
                : "There seems to be no data available right now"}
            </p>
          </div>
        )}
        
        {/* Auto-refresh indicator */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-10">
          Data auto-refreshes every 30 seconds
        </div>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Built with Next.js, React Query and Tailwind CSS</p>
          <p className="mt-2">Powered by CoinGecko API</p>
        </footer>
      </div>
    </main>
  );
}
