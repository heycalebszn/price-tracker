import { useQuery } from '@tanstack/react-query';
import { fetchCryptoDataFromCoinGecko, fetchCryptoDataFromAlternativeAPI, searchCryptoData } from '@/services/cryptoService';
import { CryptoData } from '@/types/crypto';
import { useState, useEffect } from 'react';
import React from 'react';

// Custom hook to fetch crypto data with auto-refresh
export const useCryptoData = (sortBy?: string, sortDirection: 'asc' | 'desc' = 'desc') => {
  // Use React Query to fetch data with 30-second refetch interval
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['cryptoData'],
    queryFn: async () => {
      try {
        // Try primary API first
        return await fetchCryptoDataFromCoinGecko();
      } catch (error) {
        // Fall back to alternative API if primary fails
        console.log('Falling back to alternative API');
        return await fetchCryptoDataFromAlternativeAPI();
      }
    },
    refetchInterval: 30000, // 30 seconds
    staleTime: 20000, // Consider data stale after 20 seconds
  });

  // Sort the data if requested
  const sortedData = data && sortBy
    ? [...data].sort((a, b) => {
        const valueA = a[sortBy as keyof CryptoData];
        const valueB = b[sortBy as keyof CryptoData];
        
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        }
        
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortDirection === 'asc' 
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }
        
        return 0;
      })
    : data;

  return {
    data: sortedData || [],
    isLoading,
    isError,
    error,
  };
};

// Hook for searching crypto
export const useSearchCrypto = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<CryptoData[]>([]);
  const [searchError, setSearchError] = useState<Error | null>(null);

  // Use React Query for search with caching
  const { 
    isLoading: isSearching,
    data,
    error
  } = useQuery({
    queryKey: ['cryptoSearch', searchTerm],
    queryFn: () => searchTerm.trim() ? searchCryptoData(searchTerm) : Promise.resolve([]),
    enabled: searchTerm.trim().length > 0,
    staleTime: 60000, // Cache search results for 1 minute
    refetchOnWindowFocus: false, // Don't refetch when window gets focus
    retry: false, // Don't retry on failure
  });
  
  // Update the search results when the query finishes
  useEffect(() => {
    if (data) {
      setSearchResults(data);
    }
    
    if (error) {
      setSearchError(error instanceof Error ? error : new Error('Search failed'));
    } else {
      setSearchError(null);
    }
  }, [data, error]);

  // Function to update search term
  const search = (query: string) => {
    setSearchTerm(query);
  };

  return {
    search,
    searchResults,
    isSearching,
    searchError,
  };
}; 