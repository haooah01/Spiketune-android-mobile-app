// components/icons/StyledZeroIcon.tsx
import React from 'react';

interface StyledZeroIconProps {
  className?: string;
}

const StyledZeroIcon: React.FC<StyledZeroIconProps> = ({ className = "w-16 h-20" }) => {
  return (
    <div className={`relative inline-flex items-center justify-center border-4 border-white ${className}`}>
      {/* Diagonal line using an SVG for simplicity and scalability */}
      <svg className="absolute w-full h-full text-white" viewBox="0 0 20 20" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="3" y1="17" x2="17" y2="3" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default StyledZeroIcon;
