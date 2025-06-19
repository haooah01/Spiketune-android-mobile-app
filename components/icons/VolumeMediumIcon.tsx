
// components/icons/VolumeMediumIcon.tsx
import React from 'react';

const VolumeMediumIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.06c0-1.355.083-2.7.25-4.005M13.5 4.06c.074.6.142 1.2.206 1.805M13.5 4.06v1.942M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75zM13.5 19.94v-1.942" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M13.5 4.06c-.083-1.305-.25-2.6-.25-4.005m.25 4.005c.074.6.142 1.2.206 1.805M13.5 4.06v1.942m0 13.938c.083 1.305.25 2.6.25 4.005m-.25-4.005c-.074-.6-.142-1.2-.206-1.805M13.5 19.94v-1.942" />
  </svg>
);

export default VolumeMediumIcon;
