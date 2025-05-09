import { CryptoData } from '@/types/crypto';
import Image from 'next/image';

interface CryptoCardProps {
  crypto: CryptoData;
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const priceChangeClass = 
    crypto.price_change_percentage_24h >= 0 
      ? 'positive-change' 
      : 'negative-change';
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(crypto.current_price);
  
  const formattedPriceChange = crypto.price_change_percentage_24h.toFixed(2);
  const priceChangeSymbol = crypto.price_change_percentage_24h >= 0 ? '+' : '';
  
  return (
    <div className="crypto-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {crypto.image && (
            <div className="mr-3" style={{ width: '40px', height: '40px', position: 'relative' }}>
              <Image
                src={crypto.image}
                alt={crypto.name}
                width={40}
                height={40}
                style={{ borderRadius: '50%' }}
              />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold">{crypto.name}</h3>
            <span className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{formattedPrice}</span>
          <span className={`${priceChangeClass} font-medium`}>
            {priceChangeSymbol}{formattedPriceChange}%
          </span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Last updated: {new Date(crypto.last_updated).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
} 