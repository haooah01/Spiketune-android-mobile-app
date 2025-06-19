
// pages/AlbumDetailPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated imports for v6
import { getAlbumById } from '../data/mockData';
import { Album, Track } from '../types';
import { useApp } from '../context/AppContext';
import TrackItem from '../components/TrackItem';
import AddToLibraryIcon from '../components/icons/AddToLibraryIcon';
import BookmarkFilledIcon from '../components/icons/BookmarkFilledIcon';
import PlayIcon from '../components/icons/PlayIcon';
import BackButton from '../components/common/BackButton';
import PremiumIcon from '../components/icons/PremiumIcon';

import SkeletonImage from '../components/skeletons/SkeletonImage';
import SkeletonText from '../components/skeletons/SkeletonText';
import SkeletonButton from '../components/skeletons/SkeletonButton';
import SkeletonTrackItem from '../components/skeletons/SkeletonTrackItem';

const BackArrowIconPage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const AlbumDetailSkeleton: React.FC = () => (
  <div className="text-neutral-100 min-h-full">
    <section className="p-6 sm:p-8 md:p-10 bg-gradient-to-b from-neutral-800 via-neutral-800/80 to-neutral-900">
      <SkeletonButton className="mb-6 w-24 h-8 rounded-full bg-neutral-700" />
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <SkeletonImage className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg object-cover shadow-2xl mb-6 md:mb-0 md:mr-8 flex-shrink-0 border-2 border-neutral-700/50" />
        <div className="text-center md:text-left flex-grow">
          <SkeletonText className="h-4 w-1/4 mb-2" containerClassName="mx-auto md:mx-0" />
          <SkeletonText className="h-10 w-3/4 sm:h-12 md:h-14 mb-3" containerClassName="mx-auto md:mx-0" />
          <SkeletonText className="h-6 w-1/2 mb-1" containerClassName="mx-auto md:mx-0" />
          <SkeletonText className="h-4 w-1/3 mb-4" containerClassName="mx-auto md:mx-0" />
          <div className="flex items-center justify-center md:justify-start space-x-3 sm:space-x-4">
            <SkeletonButton className="w-36 h-10 sm:h-12 rounded-full" />
            <SkeletonButton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
          </div>
        </div>
      </div>
    </section>
    <section className="p-4 sm:p-6 md:p-8">
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonTrackItem key={index} />
        ))}
      </div>
    </section>
  </div>
);


const AlbumDetailPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate(); // Changed from useHistory
  const [album, setAlbum] = useState<Album | null | undefined>(undefined);
  const { playTrack, toggleLibraryItem, isItemInLibrary, isPremium } = useApp();

  useEffect(() => {
    setAlbum(undefined);
    if (albumId) {
      const timer = setTimeout(() => {
        const foundAlbum = getAlbumById(albumId);
        setAlbum(foundAlbum);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setAlbum(null);
    }
  }, [albumId]);

  const isInLibrary = useMemo(() => album ? isItemInLibrary(album.id) : false, [album, isItemInLibrary]);
  const isFirstTrackPremium = useMemo(() => album?.tracks?.[0]?.isPremiumOnly || false, [album]);

  const handlePlayAlbum = () => {
    if (album && album.tracks.length > 0) {
      playTrack(album.tracks[0]);
    }
  };

  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };

  const totalDurationSeconds = useMemo(() => {
    return album?.tracks.reduce((sum, track) => sum + track.duration, 0) || 0;
  }, [album]);

  const formatTotalDuration = (seconds: number): string => {
    if (isNaN(seconds) || seconds === 0) return '0 min';
    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let durationStr = '';
    if (hours > 0) durationStr += `${hours} hr `;
    if (minutes > 0 || hours === 0) durationStr += `${minutes} min`;
    return durationStr.trim();
  };

  const getHeaderGradient = (coverArtUrl?: string) => {
    if (coverArtUrl) {
        return 'bg-gradient-to-b from-neutral-800 via-neutral-800/80 to-neutral-900';
    }
    return 'bg-neutral-800';
  }


  if (album === undefined) {
    return <AlbumDetailSkeleton />;
  }

  if (!album) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-neutral-100 p-8 min-h-[calc(100vh-var(--header-height,64px)-var(--player-height,80px))]">
        <h1 className="text-3xl font-bold mb-4">Album Not Found</h1>
        <p className="text-neutral-300 mb-6">The album you're looking for doesn't seem to exist.</p>
        <button
          onClick={() => navigate('/')} // Changed to navigate
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-colors flex items-center shadow-lg"
        >
          <BackArrowIconPage />
          <span className="ml-2">Go Home</span>
        </button>
      </div>
    );
  }

  return (
    <div className="text-neutral-100 min-h-full">
      <section className={`p-6 sm:p-8 md:p-10 ${getHeaderGradient(album.coverArtUrl)}`}>
        <BackButton className="mb-6" defaultPath="/search" />
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="relative flex-shrink-0">
            <img
              src={album.coverArtUrl || '/assets/images/utils/fallback-large.png'}
              alt={`${album.title} cover art`}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg object-cover shadow-2xl mb-6 md:mb-0 md:mr-8 border-2 border-neutral-700/50"
            />
            {isFirstTrackPremium && (
                 <div className="absolute top-2 right-2 md:right-10 p-1.5 bg-black/60 rounded-full shadow-lg">
                    <PremiumIcon className={`w-4 h-4 ${isPremium ? 'text-yellow-400' : 'text-neutral-400'}`} />
                 </div>
            )}
          </div>
          <div className="text-center md:text-left flex-grow">
            <p className="text-xs sm:text-sm uppercase text-neutral-400 font-medium tracking-wider">Album</p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mt-1 mb-2"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {album.title.replace(' (Premium)', '')}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-300 font-medium mb-1">
              {album.artist}
            </p>
            <p className="text-sm text-neutral-400 mb-4">
              {new Date(album.releaseDate).getFullYear()} &bull; {album.tracks.length} songs, {formatTotalDuration(totalDurationSeconds)}
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-3 sm:space-x-4">
              <button
                onClick={handlePlayAlbum}
                className={`flex items-center px-5 py-2.5 sm:px-6 sm:py-3 font-bold rounded-full transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-current
                            ${(isFirstTrackPremium && !isPremium)
                                ? 'bg-neutral-600 hover:bg-neutral-500 text-neutral-300 cursor-default'
                                : 'bg-green-500 hover:bg-green-400 text-black focus:ring-green-300'}`}
                aria-label={`Play album ${album.title}`}
              >
                <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Play Album
              </button>
              <button
                onClick={() => toggleLibraryItem(album.id, 'album')}
                className="p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 text-neutral-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label={isInLibrary ? `Remove ${album.title} from library` : `Add ${album.title} to library`}
              >
                {isInLibrary ?
                  <BookmarkFilledIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" /> :
                  <AddToLibraryIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="p-4 sm:p-6 md:p-8">
        {album.tracks.length > 0 ? (
          <div className="space-y-1">
            {album.tracks.map((track, index) => (
              <TrackItem
                key={track.id}
                track={track}
                index={index}
                onPlay={handlePlayTrack}
              />
            ))}
          </div>
        ) : (
          <p className="text-neutral-400 text-center py-10">
            This album currently has no tracks.
          </p>
        )}
      </section>
    </div>
  );
};

export default AlbumDetailPage;
