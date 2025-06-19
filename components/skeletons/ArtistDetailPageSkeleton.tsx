// components/skeletons/ArtistDetailPageSkeleton.tsx
import React from 'react';
import SkeletonImage from './SkeletonImage';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonTrackItem from './SkeletonTrackItem';

const ArtistDetailPageSkeleton: React.FC = () => (
  <div className="text-neutral-100 min-h-full">
    {/* Header Section with cover art and artist info */}
    <section className="relative p-6 sm:p-8 md:p-10 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex flex-col justify-end">
      {/* Background Image Skeleton (static, non-shimmering for effect) */}
      <div className="absolute inset-0 bg-neutral-700 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent"></div>
      </div>
      
      {/* Back Button Skeleton */}
      <SkeletonButton className="absolute top-6 left-6 sm:top-8 sm:left-8 w-24 h-8 rounded-full bg-neutral-700/50" />

      {/* Artist Info Overlay */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end space-x-0 sm:space-x-6">
        <SkeletonImage className="w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover shadow-2xl mb-4 sm:mb-0 flex-shrink-0 border-4 border-neutral-800" />
        <div className="text-center sm:text-left">
          <SkeletonText className="h-10 w-64 sm:h-12 md:h-14 mb-2" containerClassName="mx-auto sm:mx-0" />
          <SkeletonButton className="w-28 h-9 rounded-full mb-3" /> {/* Follow Button Skeleton */}
          <SkeletonText lines={2} className="h-4" lineWidth={["w-full", "w-5/6"]} containerClassName="max-w-md mx-auto sm:mx-0" /> {/* Bio Skeleton */}
        </div>
      </div>
    </section>

    {/* Popular Tracks Section */}
    <section className="p-4 sm:p-6 md:p-8">
      <SkeletonText className="h-8 w-1/3 mb-4 sm:mb-6" />
      <div className="space-y-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonTrackItem key={`track-${index}`} />
        ))}
      </div>
    </section>

    {/* Albums Section */}
    <section className="p-4 sm:p-6 md:p-8">
      <SkeletonText className="h-8 w-1/4 mb-4 sm:mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`album-card-${index}`} className="p-3 bg-neutral-800/70 rounded-lg shadow-md">
            <SkeletonImage className="aspect-square mb-3 rounded-md" />
            <SkeletonText lines={1} className="h-5 mb-1" lineWidth="w-5/6" />
            <SkeletonText lines={1} className="h-4" lineWidth="w-2/3" />
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default ArtistDetailPageSkeleton;