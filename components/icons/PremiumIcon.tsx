// components/icons/PremiumIcon.tsx
import React from 'react';

const PremiumIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={className}
    aria-hidden="true" // Decorative icon
  >
    <path 
      fillRule="evenodd" 
      d="M10 2a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L10 13.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L2.872 8.124a.75.75 0 01.416-1.28l4.21-.61 1.882-3.815A.75.75 0 0110 2zM8.501 16.312a.75.75 0 01.836-.02L10 15.89l.663.398a.75.75 0 01.836.021l1.637-.978-2.3-1.21-.013.007a.75.75 0 010-1.306l.013.007 2.3-1.21-1.637-.978a.75.75 0 01-.836.021L10 11.11l-.663-.398a.75.75 0 01-.836-.021l-1.637.978 2.3 1.21.013-.007a.75.75 0 010 1.306l-.013-.007-2.3 1.21 1.637.978z"
      clipRule="evenodd" 
    />
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" />
  </svg>
);

export default PremiumIcon;
