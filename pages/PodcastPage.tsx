
// pages/PodcastPage.tsx
import React from 'react';
import { mockPodcastCategories } from '../data/mockData';
import CategoryCard from '../components/search/CategoryCard'; // Reusing CategoryCard
import { PodcastCategory } from '../types';

const PodcastPage: React.FC = () => {
  return (
    <div className="text-neutral-100">
      {/* Podcast Page Header */}
      <div className="bg-emerald-800 p-6 sm:p-8 md:p-10 rounded-lg mb-8 shadow-xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          Podcasts
        </h1>
        {/* Optional: Add a short description or tagline here */}
      </div>

      {/* Categories Section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 px-1">
          Categories
        </h2>
        {mockPodcastCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {mockPodcastCategories.map((category: PodcastCategory) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                color={category.color} // Using color from mock data
                imageUrl={category.imageUrl}
                to={category.to} // Pass the 'to' prop for navigation
              />
            ))}
          </div>
        ) : (
          <p className="text-neutral-400 text-lg">
            No podcast categories found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PodcastPage;