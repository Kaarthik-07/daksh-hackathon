// components/LoadingSpinner.tsx

import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white">
        
      </div>
      <h1 className='text-white font-semibold p-4'>Generating text</h1>
    </div>
  );
}

export default LoadingSpinner;
