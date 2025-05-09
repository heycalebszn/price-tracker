import { NextRequest, NextResponse } from 'next/server';

// Mock data to use if API calls fail or are rate limited
const mockData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 48392.12,
    price_change_percentage_24h: 2.78,
    market_cap: 949876543210,
    last_updated: new Date().toISOString()
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3521.47,
    price_change_percentage_24h: 1.45,
    market_cap: 423456789012,
    last_updated: new Date().toISOString()
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 128.73,
    price_change_percentage_24h: -2.15,
    market_cap: 56789012345,
    last_updated: new Date().toISOString()
  },
  {
    id: "matic-network",
    symbol: "matic",
    name: "Polygon",
    image: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png",
    current_price: 0.62,
    price_change_percentage_24h: -0.87,
    market_cap: 9876543210,
    last_updated: new Date().toISOString()
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    current_price: 0.123,
    price_change_percentage_24h: 4.56,
    market_cap: 7654321098,
    last_updated: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ids = searchParams.get('ids') || 'bitcoin,ethereum,solana,matic-network,dogecoin';
  
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
      { 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      }
    );
    
    if (!response.ok) {
      console.log("CoinGecko API error, using mock data");
      return NextResponse.json(mockData);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from CoinGecko:", error);
    return NextResponse.json(mockData);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json([]);
    }
    
    try {
      const searchResponse = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
        { 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        }
      );
      
      if (!searchResponse.ok) {
        throw new Error('Search API failed');
      }
      
      const searchData = await searchResponse.json();
      const coinIds = searchData.coins.slice(0, 5).map((coin: any) => coin.id);
      
      if (coinIds.length === 0) {
        return NextResponse.json([]);
      }
      
      const detailsResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
        { 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        }
      );
      
      if (!detailsResponse.ok) {
        throw new Error('Details API failed');
      }
      
      const detailsData = await detailsResponse.json();
      return NextResponse.json(detailsData);
    } catch (error) {
      console.error("Error searching coins:", error);
      return NextResponse.json([]);
    }
    
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json([]);
  }
} 