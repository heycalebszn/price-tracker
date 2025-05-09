import { useQuery } from '@tanstack/react-query';
import { fetchCryptoDataFromCoinGecko, fetchCryptoDataFromAlternativeAPI, searchCryptoData } from '@/services/cryptoService';
import { CryptoData } from '@/types/crypto';
import { useState, useEffect } from 'react';
import React from 'react';

export const useCryptoData = (sortBy?: string, sortDirection: 'asc' | 'desc' = 'desc') => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['cryptoData'],
    queryFn: async () => {
      try {
        return await fetchCryptoDataFromCoinGecko();
      } catch (error) {
        console.log('Falling back to alternative API');
        return await fetchCryptoDataFromAlternativeAPI();
      }
    },
    refetchInterval: 30000, 
    staleTime: 20000, 
  });

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

export const useSearchCrypto = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<CryptoData[]>([]);
  const [searchError, setSearchError] = useState<Error | null>(null);

  const { 
    isLoading: isSearching,
    data,
    error
  } = useQuery({
    queryKey: ['cryptoSearch', searchTerm],
    queryFn: () => searchTerm.trim() ? searchCryptoData(searchTerm) : Promise.resolve([]),
    enabled: searchTerm.trim().length > 0,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: false,
  });
  
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