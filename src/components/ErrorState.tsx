import React from 'react';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="error-container mb-6">
      <div className="error-text text-lg mb-2">Error</div>
      <p className="text-gray-400">{message}</p>
      <p className="text-sm text-gray-400 mt-2">
        Please check your connection and try again later.
      </p>
    </div>
  );
} 