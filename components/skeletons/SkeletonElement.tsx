// components/skeletons/SkeletonElement.tsx
import React from 'react';

interface SkeletonElementProps {
  className?: string;
  type: 'text' | 'image' | 'button' | 'custom';
  style?: React.CSSProperties;
}

const SkeletonElement: React.FC<SkeletonElementProps> = ({ className = '', type, style }) => {
  const baseClasses = 'animate-shimmer rounded';
  
  let typeClasses = '';
  switch(type) {
    case 'text':
      typeClasses = 'h-4 my-1'; // Default height for text line
      break;
    case 'image':
      typeClasses = 'bg-neutral-700/50'; // Slightly different base for images if needed
      break;
    case 'button':
      typeClasses = 'h-10'; // Default height for button
      break;
    case 'custom': // Allows full control via className
      break;
  }

  return <div className={`${baseClasses} ${typeClasses} ${className}`} style={style} />;
};

export default SkeletonElement;