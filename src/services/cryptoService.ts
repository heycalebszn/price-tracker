import axios from 'axios';
import { CryptoData, CryptoId } from '@/types/crypto';

const COINS = ['bitcoin', 'ethereum', 'solana', 'matic-network', 'dogecoin'];

// Primary API - Using our Next.js API route to proxy CoinGecko
export const fetchCryptoDataFromCoinGecko = async (): Promise<CryptoData[]> => {
  try {
    const response = await axios.get(`/api/crypto`, {
      params: {
        ids: COINS.join(','),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching from API proxy:', error);
    throw new Error('Failed to fetch cryptocurrency data');
  }
};

// Fallback API - Alternative (for demonstration)
export const fetchCryptoDataFromAlternativeAPI = async (): Promise<CryptoData[]> => {
  // Use a different approach to get the same data
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        // Call the proxy API with a delay
        const response = await axios.get(`/api/crypto`, {
          params: {
            ids: COINS.join(','),
          },
        });
        resolve(response.data);
      } catch (error) {
        console.error('Error fetching from alternative API:', error);
        throw new Error('Failed to fetch cryptocurrency data from alternative API');
      }
    }, 500);
  });
};

// Search for a specific coin
export const searchCryptoData = async (query: string): Promise<CryptoData[]> => {
  try {
    // Use the POST endpoint of our proxy API for search
    const response = await axios.post('/api/crypto', {
      query
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching crypto data:', error);
    throw new Error('Failed to search cryptocurrency data');
  }
}; 