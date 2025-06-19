// components/icons/FireIcon.tsx
import React from 'react';

const FireIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path 
      fillRule="evenodd" 
      d="M9.916 2.083c.273.273.504.629.648 1.025a5.253 5.253 0 01.378 4.287 3.375 3.375 0 00-.77 2.996C9.828 11.48 8.605 12 7.292 12A6.375 6.375 0 00.917 18.375V21a.75.75 0 00.75.75h16.666a.75.75 0 00.75-.75v-2.625A6.375 6.375 0 0014.042 12c-1.314 0-2.537-.52-3.218-1.65a3.375 3.375 0 00-.77-2.996 5.253 5.253 0 01-.633-5.312.75.75 0 00-.505-1.004z"
      clipRule="evenodd" 
    />
  </svg>
);

export default FireIcon;
