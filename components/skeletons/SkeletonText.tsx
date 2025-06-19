// components/skeletons/SkeletonText.tsx
import React from 'react';
import SkeletonElement from './SkeletonElement';

interface SkeletonTextProps {
  lines?: number;
  className?: string; // Applied to each line
  containerClassName?: string; // Applied to the container div
  lineWidth?: string | string[]; // e.g., "w-full", ["w-3/4", "w-1/2"]
}

const SkeletonText: React.FC<SkeletonTextProps> = ({ 
  lines = 1, 
  className = 'h-4', // Default height for a line of text
  containerClassName = '',
  lineWidth = 'w-full' 
}) => {
  const lineElements = Array.from({ length: lines }).map((_, index) => {
    const currentLineWidth = Array.isArray(lineWidth) ? (lineWidth[index] || 'w-full') : lineWidth;
    return (
      <SkeletonElement 
        key={index} 
        type="text" 
        className={`${className} ${currentLineWidth} my-1`} 
      />
    );
  });

  return <div className={containerClassName}>{lineElements}</div>;
};

export default SkeletonText;