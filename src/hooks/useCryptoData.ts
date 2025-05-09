import { useQuery } from '@tanstack/react-query';
import { fetchCryptoDataFromCoinGecko, fetchCryptoDataFromAlternativeAPI, searchCryptoData } from '@/services/cryptoService';
import { CryptoData } from '@/types/crypto';
import { useState } from 'react';

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
  const [searchResults, setSearchResults] = useState<CryptoData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<Error | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const results = await searchCryptoData(query);
      setSearchResults(results);
    } catch (error) {
      setSearchError(error instanceof Error ? error : new Error('Search failed'));
    } finally {
      setIsSearching(false);
    }
  };

  return {
    search,
    searchResults,
    isSearching,
    searchError,
  };
}; 