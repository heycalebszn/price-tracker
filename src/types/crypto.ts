export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  last_updated: string;
}

export interface CryptoError {
  message: string;
  code?: number;
}

export type CryptoId = 'bitcoin' | 'ethereum' | 'solana' | 'matic-network' | 'dogecoin'; 