// components/skeletons/CategoryDetailPageSkeleton.tsx
import React from 'react';
import SkeletonButton from './SkeletonButton';
import SkeletonText from './SkeletonText';
import SkeletonImage from './SkeletonImage';

// Local helper for MediaItemCard-like skeleton
const MediaItemCardContentSkeleton: React.FC = () => (
  <div className="p-3 bg-neutral-800/70 rounded-lg shadow-md"> {/* Non-animated background for the card itself */}
    <SkeletonImage className="aspect-square mb-3 rounded-md" /> {/* This will shimmer */}
    <SkeletonText lines={1} className="h-5 mb-1" lineWidth="w-5/6" /> {/* This will shimmer */}
    <SkeletonText lines={1} className="h-4" lineWidth="w-2/3" /> {/* This will shimmer */}
  </div>
);


const CategoryDetailPageSkeleton: React.FC = () => (
  <div className="text-neutral-100 min-h-full"> {/* Root div does not need shimmer; individual elements handle it */}
    {/* Header Section */}
    <section className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 bg-gradient-to-b from-neutral-800 via-neutral-800/80 to-neutral-900">
      <SkeletonButton className="mb-6 w-24 h-8 rounded-full bg-neutral-700" />
      <SkeletonText 
        className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 mb-4" 
        lineWidth="w-3/4 sm:w-2/3" 
        containerClassName="max-w-4xl"
      />
    </section>

    {/* Items Grid Section */}
    <section className="p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <MediaItemCardContentSkeleton key={index} />
        ))}
      </div>
    </section>
  </div>
);

export default CategoryDetailPageSkeleton;
