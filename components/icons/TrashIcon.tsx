// components/icons/TrashIcon.tsx
import React from 'react';

const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.243.096 3.222.261m3.478-.397L11.026 4.14a2.25 2.25 0 00-2.244-2.077H8.084a2.25 2.25 0 00-2.244 2.077L4.772 5.79m14.456 0l-2.08-2.08a2.25 2.25 0 00-3.181 0l-2.08 2.08m-3.181 0l-2.08-2.08a2.25 2.25 0 00-3.181 0l-2.08 2.08m10.233 16.33a48.108 48.108 0 003.478-.397m-10.233 0c-1.153 0-2.243-.096-3.222-.261m-3.478-.397L6.974 19.673a2.25 2.25 0 002.244 2.077H14.78a2.25 2.25 0 002.244-2.077L16.12 5.79" />
  </svg>
);

export default TrashIcon;
