# Crypto Price Tracker

A cryptocurrency price tracker built with Next.js, React Query, and Tailwind CSS. This application displays real-time price data for selected cryptocurrencies using the CoinGecko API.

## Features

- Real-time tracking of BTC, ETH, SOL, MATIC, and DOGE cryptocurrency prices
- Price change percentage highlighting (green for positive, red for negative)
- Auto-refreshes data every 30 seconds using React Query
- Search functionality to look up other cryptocurrencies
- Sort options by name, price, and 24h change
- Loading and error states with appropriate UI feedback
- Responsive design for all device sizes

## Tech Stack

- **Framework**: Next.js
- **Data Fetching**: React Query (@tanstack/react-query)
- **API Calls**: Axios
- **Styling**: Tailwind CSS
- **APIs**: CoinGecko API

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/heycalebszn/price-tracker.git
   cd crypto-price-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

- `/src/app`: Next.js app router pages
- `/src/components`: Reusable UI components
- `/src/services`: API service functions
- `/src/hooks`: Custom React hooks for data fetching
- `/src/types`: TypeScript type definitions

## Implementation Details

- Used React Query for efficient data fetching with automatic refetching
- Implemented fallback API strategy for better reliability
- Added debounced search for better performance
- Created responsive UI with Tailwind CSS

## Scaling to Handle 100+ Coins

To scale this application to handle 100+ coins and multiple APIs, I would implement:

1. **Pagination**: i will add pagination to limit the number of coins displayed at once
2. **Virtualization**: Implement a virtual list to render only visible items
3. **Caching Strategy**: Enhance React Query's caching configuration
4. **API Aggregation**: Create a backend service to aggregate data from multiple APIs
5. **WebSockets**: Replace polling with WebSockets for real-time updates
6. **Rate Limiting**: Implement request throttling to avoid API rate limits
7. **Memoization**: i will add memoization for expensive UI operations
8. **Server-Side Rendering**: i will use Next.js SSR for initial data loading

## Future Improvements

- Add price charts for historical data
- Implement user favorites with local storage
- Add more detailed coin information pages
- Support additional currencies beyond USD
- Add dark/light theme toggle

## License

MIT
