


import React from 'react';
import { useLocation } from 'react-router-dom'; // Updated import for v5
import { mockSearchCategories } from '../data/mockData';
import CategoryCard from '../components/search/CategoryCard';
import { SearchCategory } from '../types';

const SearchPage: React.FC = () => {
  const location = useLocation(); // Changed from useSearchParams
  const query = new URLSearchParams(location.search).get('q'); // Parse query from location.search

  const filteredCategories = React.useMemo(() => {
    if (!query) {
      return mockSearchCategories;
    }
    return mockSearchCategories.filter(category =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const pageTitle = query
    ? `Results for "${query}"`
    : "Browse all";

  return (
    <div className="text-neutral-100">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        {pageTitle}
      </h1>
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredCategories.map((category: SearchCategory) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              color={category.color}
              imageUrl={category.imageUrl}
              to={category.to}
            />
          ))}
        </div>
      ) : (
        <p className="text-neutral-400 text-lg">
          No results found for "{query}". Try a different search.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
