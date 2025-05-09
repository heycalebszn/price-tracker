import React from 'react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="spinner mb-4"></div>
      <p className="text-gray-400">Loading cryptocurrency data...</p>
    </div>
  );
} 