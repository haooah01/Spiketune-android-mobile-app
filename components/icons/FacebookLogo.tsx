// components/icons/FacebookLogo.tsx
import React from 'react';

const FacebookLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89H8.078V12h2.36V9.797c0-2.322 1.388-3.597 3.498-3.597.996 0 2.062.179 2.062.179v2.115h-1.096c-1.166 0-1.53.738-1.53 1.485V12h2.36l-.375 2.89H13.37v7.008C18.343 21.128 22 16.991 22 12z" fill="#1877F2"/>
  </svg>
);
export default FacebookLogo;