// components/skeletons/SkeletonImage.tsx
import React from 'react';
import SkeletonElement from './SkeletonElement';

interface SkeletonImageProps {
  className?: string; // e.g., "w-24 h-24 rounded-md"
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({ className = 'w-24 h-24' }) => {
  return <SkeletonElement type="image" className={`${className}`} />;
};

export default SkeletonImage;