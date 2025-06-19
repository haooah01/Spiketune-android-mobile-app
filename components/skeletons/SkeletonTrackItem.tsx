// components/skeletons/SkeletonTrackItem.tsx
import React from 'react';
import SkeletonImage from './SkeletonImage';
import SkeletonText from './SkeletonText';
import SkeletonElement from './SkeletonElement'; // Added import

const SkeletonTrackItem: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center flex-1 min-w-0 mr-4">
        <SkeletonText className="w-8 h-5 mr-3" lines={1} lineWidth="w-5" /> {/* Index/Play button placeholder */}
        <SkeletonImage className="w-10 h-10 rounded object-cover mr-4 flex-shrink-0" />
        <div className="min-w-0 flex-grow">
          <SkeletonText lines={1} className="h-4 mb-1" lineWidth="w-3/4" />
          <SkeletonText lines={1} className="h-3" lineWidth="w-1/2" />
        </div>
      </div>
      <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
        <SkeletonElement type="custom" className="w-5 h-5 rounded-full" /> {/* Library Icon */}
        <SkeletonElement type="custom" className="w-5 h-5 rounded-full" /> {/* Download Icon */}
        <SkeletonElement type="custom" className="w-5 h-5 rounded-full" /> {/* Heart Icon */}
        <SkeletonText className="w-10 h-4 hidden sm:block" lines={1} /> {/* Duration */}
      </div>
    </div>
  );
};

export default SkeletonTrackItem;