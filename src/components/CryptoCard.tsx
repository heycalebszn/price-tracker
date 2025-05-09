import { CryptoData } from '@/types/crypto';
import Image from 'next/image';

interface CryptoCardProps {
  crypto: CryptoData;
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const isPositiveChange = crypto.price_change_percentage_24h >= 0;
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(crypto.current_price);
  
  const formattedPriceChange = Math.abs(crypto.price_change_percentage_24h).toFixed(2);
  const priceChangeSymbol = isPositiveChange ? '+' : '-';
  
  const formattedMarketCap = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(crypto.market_cap);
  
  const getTimeSince = (dateString: string) => {
    const updated = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - updated.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-5 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {crypto.image && (
            <div className="mr-3 relative">
              <Image
                src={crypto.image}
                alt={crypto.name}
                width={48}
                height={48}
                className="rounded-full"
                priority
              />
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold dark:text-white">{crypto.name}</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {crypto.symbol.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className={`flex items-center px-2.5 py-1 rounded-lg text-sm font-semibold ${
          isPositiveChange 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          <span className="mr-1">
            {isPositiveChange ? (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </span>
          {priceChangeSymbol}{formattedPriceChange}%
        </div>
      </div>
      
      <div className="mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Price</span>
          <span className="text-xl font-bold dark:text-white">{formattedPrice}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Market Cap</span>
          <span className="font-semibold dark:text-white">{formattedMarketCap}</span>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>Last updated</span>
            <span title={new Date(crypto.last_updated).toLocaleString()}>
              {getTimeSince(crypto.last_updated)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 