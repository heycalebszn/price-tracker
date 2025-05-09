import React from 'react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <div className="relative">
        {/* Animated coin loading spinner */}
        <div className="w-16 h-16 rounded-full border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-500 animate-spin mb-6"></div>
        <div className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center">
          <span className="text-xl text-indigo-600 dark:text-indigo-400 font-bold">₿</span>
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Loading data</h3>
      <p className="text-gray-500 dark:text-gray-400">Fetching the latest cryptocurrency prices...</p>
      <div className="mt-6 flex space-x-1">
        <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
} 