
// pages/PodcastCategoryDetailPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated imports for v6
import { getPodcastCategoryById, getMockPodcastsForCategory } from '../data/mockData';
import { PodcastCategory, Album, Playlist } from '../types';
import MediaItemCard from '../components/home/MediaItemCard';
import PodcastCategoryDetailPageSkeleton from '../components/skeletons/PodcastCategoryDetailPageSkeleton';
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
    case 'emerald': return 'from-emerald-600 via-emerald-700 to-neutral-900';
    case 'slate': return 'from-slate-600 via-slate-700 to-neutral-900';
    case 'neutral': return 'from-neutral-600 via-neutral-700 to-neutral-900';
    case 'rose': return 'from-rose-600 via-rose-700 to-neutral-900';
    default: return 'from-neutral-800 via-neutral-800/80 to-neutral-900';
  }
};

const PodcastCategoryDetailPage: React.FC = () => {
  const { podcastCategoryId } = useParams<{ podcastCategoryId: string }>();
  const navigate = useNavigate(); // Changed from useHistory
  const [category, setCategory] = useState<PodcastCategory | null | undefined>(undefined);
  const [podcastShows, setPodcastShows] = useState<(Album | Playlist)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setCategory(undefined);
    setPodcastShows([]);

    if (podcastCategoryId) {
      const timer = setTimeout(() => {
        const foundCategory = getPodcastCategoryById(podcastCategoryId);
        setCategory(foundCategory);
        if (foundCategory) {
          const shows = getMockPodcastsForCategory(podcastCategoryId);
          setPodcastShows(shows);
        }
        setIsLoading(false);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setCategory(null);
      setIsLoading(false);
    }
  }, [podcastCategoryId]);

  const headerBgClass = useMemo(() => {
    return getHeaderGradientClass(category?.themeColorName);
  }, [category]);

  if (isLoading || category === undefined) {
    return <PodcastCategoryDetailPageSkeleton />;
  }

  if (!category) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-neutral-100 p-8 min-h-[calc(100vh-var(--header-height,64px)-var(--player-height,80px))]">
        <h1 className="text-3xl font-bold mb-4">Podcast Category Not Found</h1>
        <p className="text-neutral-300 mb-6">This podcast category doesn't seem to exist.</p>
        <button
          onClick={() => navigate('/podcasts')} // Changed to navigate
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-colors flex items-center shadow-lg"
        >
          <BackArrowIconPage />
          <span className="ml-2">Back to Podcasts</span>
        </button>
      </div>
    );
  }

  return (
    <div className="text-neutral-100 min-h-full">
      <section className={`p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 bg-gradient-to-b ${headerBgClass}`}>
         <BackButton
          className="mb-6 inline-flex items-center text-sm text-white/80 hover:text-white transition-colors focus:outline-none group bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full"
          defaultPath="/podcasts"
        />
        <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight mb-4 break-words"
            style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
        >
            {category.name}
        </h1>
      </section>

      <section className="p-4 sm:p-6 md:p-8">
        {podcastShows.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {podcastShows.map((show) => (
              <MediaItemCard
                key={show.id}
                id={show.id}
                title={'title' in show ? show.title : show.name}
                subtitle={'artist' in show ? show.artist : ('createdBy' in show ? show.createdBy : 'Podcast')}
                imageUrl={show.coverArtUrl || '/assets/images/utils/fallback-card.png'}
                type={'type' in show ? show.type as 'album' | 'playlist' : 'album'}
              />
            ))}
          </div>
        ) : (
          <p className="text-neutral-400 text-center py-10 text-lg">
            No podcast shows found for "{category.name}" at the moment. Check back soon!
          </p>
        )}
      </section>
    </div>
  );
};

export default PodcastCategoryDetailPage;
