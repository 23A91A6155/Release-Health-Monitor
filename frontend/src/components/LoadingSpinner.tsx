import React from 'react';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__ring">
        <div className="loading-spinner__ring-inner" />
      </div>
      <p className="loading-spinner__text">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
