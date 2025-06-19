// components/skeletons/SkeletonButton.tsx
import React from 'react';
import SkeletonElement from './SkeletonElement';

interface SkeletonButtonProps {
  className?: string; // e.g., "w-32 h-10 rounded-full"
}

const SkeletonButton: React.FC<SkeletonButtonProps> = ({ className = 'w-32 h-10 rounded-full' }) => {
  return <SkeletonElement type="button" className={`${className}`} />;
};

export default SkeletonButton;