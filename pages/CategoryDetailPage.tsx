
// pages/CategoryDetailPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated imports for v6
import { getSearchCategoryById, getMockItemsForCategory } from '../data/mockData';
import { SearchCategory, Album, Playlist } from '../types';
import MediaItemCard from '../components/home/MediaItemCard';
import CategoryDetailPageSkeleton from '../components/skeletons/CategoryDetailPageSkeleton';
import BackButton from '../components/common/BackButton';

const BackArrowIconPage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const getHeaderGradientClass = (themeColorName?: string): string => {
  switch (themeColorName) {
    case 'pink': return 'from-pink-600 via-pink-700 to-neutral-900';
    case 'purple': return 'from-purple-600 via-purple-700 to-neutral-900';
    case 'blue': return 'from-blue-600 via-blue-700 to-neutral-900';
    case 'teal': return 'from-teal-600 via-teal-700 to-neutral-900';
    case 'lime': return 'from-lime-600 via-lime-700 to-neutral-900';
    case 'sky': return 'from-sky-600 via-sky-700 to-neutral-900';
    case 'red': return 'from-red-600 via-red-700 to-neutral-900';
    case 'orange': return 'from-orange-600 via-orange-700 to-neutral-900';
    case 'indigo': return 'from-indigo-600 via-indigo-700 to-neutral-900';
    case 'green': return 'from-green-600 via-green-700 to-neutral-900';
    case 'slate': return 'from-slate-600 via-slate-700 to-neutral-900';
    default: return 'from-neutral-800 via-neutral-800/80 to-neutral-900';
  }
};


const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate(); // Changed from useHistory
  const [category, setCategory] = useState<SearchCategory | null | undefined>(undefined);
  const [items, setItems] = useState<(Album | Playlist)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setCategory(undefined);
    setItems([]);

    if (categoryId) {
      const timer = setTimeout(() => {
        const foundCategory = getSearchCategoryById(categoryId);
        setCategory(foundCategory);
        if (foundCategory) {
          const categoryItems = getMockItemsForCategory(categoryId);
          setItems(categoryItems);
        }
        setIsLoading(false);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setCategory(null);
      setIsLoading(false);
    }
  }, [categoryId]);

  const headerBgClass = useMemo(() => {
    return getHeaderGradientClass(category?.themeColorName);
  }, [category]);

  if (isLoading || category === undefined) {
    return <CategoryDetailPageSkeleton />;
  }

  if (!category) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-neutral-100 p-8 min-h-[calc(100vh-var(--header-height,64px)-var(--player-height,80px))]">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-neutral-300 mb-6">The category you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/search')} // Changed to navigate
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-colors flex items-center shadow-lg"
        >
          <BackArrowIconPage />
          <span className="ml-2">Back to Search</span>
        </button>
      </div>
    );
  }

  return (
    <div className="text-neutral-100 min-h-full">
      <section className={`p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 bg-gradient-to-b ${headerBgClass}`}>
        <BackButton
          className="mb-6 inline-flex items-center text-sm text-white/80 hover:text-white transition-colors focus:outline-none group bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full"
          defaultPath="/search"
        />
        <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight mb-4 break-words"
            style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
        >
            {category.name}
        </h1>
      </section>

      <section className="p-4 sm:p-6 md:p-8">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {items.map((item) => (
              <MediaItemCard
                key={item.id}
                id={item.id}
                title={'title' in item ? item.title : item.name}
                subtitle={'artist' in item ? item.artist : ('createdBy' in item ? item.createdBy : undefined)}
                imageUrl={item.coverArtUrl || '/assets/images/utils/fallback-card.png'}
                type={item.type || 'album'}
              />
            ))}
          </div>
        ) : (
          <p className="text-neutral-400 text-center py-10 text-lg">
            No items found for the "{category.name}" category at the moment.
          </p>
        )}
      </section>
    </div>
  );
};

export default CategoryDetailPage;
