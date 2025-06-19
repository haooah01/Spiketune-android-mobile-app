
// pages/LyricsPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated imports for v6
import { getTrackById } from '../data/mockData';
import { Track } from '../types';
import { useApp } from '../context/AppContext';

import HeartIcon from '../components/icons/HeartIcon';
import HeartFilledIcon from '../components/icons/HeartFilledIcon';
import AddToLibraryIcon from '../components/icons/AddToLibraryIcon';
import BookmarkFilledIcon from '../components/icons/BookmarkFilledIcon';
import DownloadIcon from '../components/icons/DownloadIcon';
import BackButton from '../components/common/BackButton';
import PremiumIcon from '../components/icons/PremiumIcon';

import SkeletonImage from '../components/skeletons/SkeletonImage';
import SkeletonText from '../components/skeletons/SkeletonText';
import SkeletonButton from '../components/skeletons/SkeletonButton';

const BackArrowIconPage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const LyricsPageSkeleton: React.FC = () => (
  <div className="relative min-h-full overflow-y-auto">
    <div className="absolute inset-0 bg-neutral-800 -z-20">
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/60"></div>
    </div>

    <div className="relative z-10 text-neutral-100 p-4 sm:p-6 md:p-8 min-h-full">
      <div className="max-w-4xl mx-auto">
        <SkeletonButton className="mb-6 sm:mb-8 w-24 h-8 rounded-full bg-neutral-700" />

        <header className="flex flex-col md:flex-row items-center md:items-start mb-8 sm:mb-10 md:mb-12">
          <SkeletonImage className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl object-cover shadow-2xl mb-6 md:mb-0 md:mr-8 flex-shrink-0 border-2 border-neutral-700/50" />
          <div className="text-center md:text-left flex-grow">
            <SkeletonText className="h-10 w-3/4 sm:h-12 md:h-14 mb-2" containerClassName="mx-auto md:mx-0"/>
            <SkeletonText className="h-6 w-1/2 mb-1" containerClassName="mx-auto md:mx-0"/>
            <SkeletonText className="h-4 w-1/3 mb-6" containerClassName="mx-auto md:mx-0"/>
            <div className="flex items-center justify-center md:justify-start space-x-3 sm:space-x-4">
              <SkeletonButton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
              <SkeletonButton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
              <SkeletonButton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
            </div>
          </div>
        </header>

        <div className="bg-black/40 p-6 sm:p-8 rounded-xl shadow-xl backdrop-blur-sm">
          <SkeletonText className="h-8 w-1/4 mb-4 sm:mb-6" />
          <SkeletonText lines={10} className="h-5" lineWidth={["w-full", "w-5/6", "w-full", "w-3/4", "w-5/6", "w-full", "w-2/3", "w-full", "w-1/2", "w-5/6"]} />
        </div>
      </div>
    </div>
  </div>
);


const LyricsPage: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const navigate = useNavigate(); // Changed from useHistory
  const [track, setTrack] = useState<Track | null | undefined>(undefined);

  const {
    likedSongs,
    toggleLikeSong,
    libraryItems,
    toggleLibraryItem,
    isPremium,
    playTrack,
  } = useApp();

  useEffect(() => {
    setTrack(undefined);
    if (trackId) {
      const timer = setTimeout(() => {
        const foundTrack = getTrackById(trackId);
        setTrack(foundTrack);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setTrack(null);
    }
  }, [trackId]);

  const isThisTrackLiked = useMemo(() => track ? likedSongs.has(track.id) : false, [likedSongs, track]);
  const isThisTrackInLibrary = useMemo(() => track ? libraryItems.has(track.id) : false, [libraryItems, track]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (track && track.url && !track.url.startsWith('placeholder/')) {
      if (track.isPremiumOnly && !isPremium) {
        playTrack(track);
        return;
      }
      try {
        const link = document.createElement('a');
        link.href = track.url;
        const fileExtension = track.url.split('.').pop() || 'mp3';
        const suggestedFilename = `${track.title} - ${track.artist}.${fileExtension}`;
        link.setAttribute('download', suggestedFilename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error initiating download:", error);
        alert(`Could not initiate download for ${track.title}.`);
      }
    } else {
      alert(`No downloadable track available for ${track?.title || 'this song'}.`);
    }
  };


  if (track === undefined) {
    return <LyricsPageSkeleton />;
  }

  if (!track) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-neutral-100 p-8 min-h-[calc(100vh-var(--header-height,64px)-var(--player-height,80px))]">
        <h1 className="text-3xl font-bold mb-4">Track Not Found</h1>
        <p className="text-neutral-300 mb-6">The song you're looking for doesn't seem to exist.</p>
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

  const backgroundCoverUrl = track.coverArtUrl || '/assets/images/utils/fallback-large.png';
  const backgroundStyle: React.CSSProperties = {
      backgroundImage: `url(${backgroundCoverUrl})`,
  };


  return (
    <div className="relative min-h-full overflow-y-auto">
      <div
        className="absolute inset-0 bg-cover bg-center -z-20"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 backdrop-blur-2xl bg-black/60"></div>
      </div>

      <div className="relative z-10 text-neutral-100 p-4 sm:p-6 md:p-8 min-h-full">
        <div className="max-w-4xl mx-auto">
          <BackButton className="mb-6 sm:mb-8" />

          <header className="flex flex-col md:flex-row items-center md:items-start mb-8 sm:mb-10 md:mb-12">
            <img
              src={track.coverArtUrl || '/assets/images/utils/fallback-large.png'}
              alt={`${track.title} cover art`}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl object-cover shadow-2xl mb-6 md:mb-0 md:mr-8 flex-shrink-0 border-2 border-neutral-700/50"
            />
            <div className="text-center md:text-left flex-grow">
              <div className="flex items-center justify-center md:justify-start mb-2">
                 <h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {track.title.replace(' (Premium)', '')}
                  </h1>
                  {track.isPremiumOnly && (
                    <PremiumIcon className={`w-6 h-6 sm:w-7 sm:h-7 ml-2.5 flex-shrink-0 ${isPremium ? 'text-yellow-400' : 'text-neutral-500'}`} />
                  )}
              </div>

              <p className="text-xl sm:text-2xl text-neutral-300 font-medium mb-1">
                {track.artist}
              </p>
              <p className="text-md text-neutral-400 mb-6">
                From album: <span className="font-medium text-neutral-300">{track.album}</span>
              </p>

              <div className="flex items-center justify-center md:justify-start space-x-3 sm:space-x-4">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLikeSong(track.id); }}
                  className="p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 text-neutral-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label={isThisTrackLiked ? `Unlike ${track.title}` : `Like ${track.title}`}
                >
                  {isThisTrackLiked ?
                    <HeartFilledIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" /> :
                    <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLibraryItem(track.id, 'track'); }}
                  className="p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 text-neutral-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label={isThisTrackInLibrary ? `Remove ${track.title} from library` : `Add ${track.title} to library`}
                >
                  {isThisTrackInLibrary ?
                    <BookmarkFilledIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" /> :
                    <AddToLibraryIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>
                <button
                  onClick={handleDownload}
                  className={`p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 text-neutral-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500
                              ${(track.isPremiumOnly && !isPremium) ? 'opacity-60 cursor-default' : ''}`}
                  aria-label={`Download ${track.title}`}
                  disabled={track.isPremiumOnly && !isPremium}
                >
                  <DownloadIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </header>

          {track.lyrics ? (
            <div className="bg-black/40 p-6 sm:p-8 rounded-xl shadow-xl backdrop-blur-sm">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>Lyrics</h2>
              <pre
                className="text-neutral-100 leading-relaxed sm:leading-loose whitespace-pre-wrap text-base sm:text-lg selection:bg-purple-500 selection:text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {track.lyrics}
              </pre>
            </div>
          ) : (
            <div className="bg-black/40 p-8 sm:p-12 rounded-xl shadow-xl text-center backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-neutral-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xl text-neutral-300 font-semibold mb-2">
                No Lyrics Available
              </p>
              <p className="text-neutral-400">
                Sorry, we don't have lyrics for this song yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LyricsPage;
