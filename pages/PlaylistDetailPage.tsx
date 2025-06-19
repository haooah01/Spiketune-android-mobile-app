
// pages/PlaylistDetailPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated imports for v6
import { getPlaylistById } from '../data/mockData';
import { Playlist, Track } from '../types';
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

const PlaylistDetailSkeleton: React.FC = () => (
  <div className="text-neutral-100 min-h-full">
    <section className="p-6 sm:p-8 md:p-10 bg-gradient-to-b from-neutral-800 via-neutral-800/70 to-neutral-900">
      <SkeletonButton className="mb-6 w-24 h-8 rounded-full bg-neutral-700" />
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <SkeletonImage className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg object-cover shadow-2xl mb-6 md:mb-0 md:mr-8 flex-shrink-0 border-2 border-neutral-700/50" />
        <div className="text-center md:text-left flex-grow">
          <SkeletonText className="h-4 w-1/4 mb-2" containerClassName="mx-auto md:mx-0" />
          <SkeletonText className="h-10 w-3/4 sm:h-12 md:h-14 mb-2" containerClassName="mx-auto md:mx-0" />
          <SkeletonText className="h-5 w-full mb-1" containerClassName="mx-auto md:mx-0" lineWidth={["w-full", "w-2/3"]} lines={2} />
          <SkeletonText className="h-4 w-1/2 mb-4" containerClassName="mx-auto md:mx-0" />
          <div className="flex items-center justify-center md:justify-start space-x-3 sm:space-x-4">
            <SkeletonButton className="w-40 h-10 sm:h-12 rounded-full" />
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


const PlaylistDetailPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate(); // Changed from useHistory
  const [playlist, setPlaylist] = useState<Playlist | null | undefined>(undefined);
  const { playTrack, toggleLibraryItem, isItemInLibrary, isPremium } = useApp();

  useEffect(() => {
    setPlaylist(undefined);
    if (playlistId) {
      const timer = setTimeout(() => {
        const foundPlaylist = getPlaylistById(playlistId);
        setPlaylist(foundPlaylist);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setPlaylist(null);
    }
  }, [playlistId]);

  const isInLibrary = useMemo(() => playlist ? isItemInLibrary(playlist.id) : false, [playlist, isItemInLibrary]);
  const isFirstTrackPremium = useMemo(() => playlist?.tracks?.[0]?.isPremiumOnly || false, [playlist]);


  const handlePlayPlaylist = () => {
    if (playlist && playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0]);
    }
  };

  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };

  const totalDurationSeconds = useMemo(() => {
    return playlist?.tracks.reduce((sum, track) => sum + track.duration, 0) || 0;
  }, [playlist]);

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
        return 'bg-gradient-to-b from-neutral-800 via-neutral-800/70 to-neutral-900';
    }
    return 'bg-neutral-800';
  }

  if (playlist === undefined) {
    return <PlaylistDetailSkeleton />;
  }

  if (!playlist) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-neutral-100 p-8 min-h-[calc(100vh-var(--header-height,64px)-var(--player-height,80px))]">
        <h1 className="text-3xl font-bold mb-4">Playlist Not Found</h1>
        <p className="text-neutral-300 mb-6">The playlist you're looking for doesn't seem to exist.</p>
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
       <section className={`p-6 sm:p-8 md:p-10 ${getHeaderGradient(playlist.coverArtUrl)}`}>
        <BackButton className="mb-6" defaultPath="/library" />
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="relative flex-shrink-0">
            <img
              src={playlist.coverArtUrl || '/assets/images/utils/fallback-large.png'}
              alt={`${playlist.name} cover art`}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg object-cover shadow-2xl mb-6 md:mb-0 md:mr-8 border-2 border-neutral-700/50"
            />
            {isFirstTrackPremium && (
                 <div className="absolute top-2 right-2 md:right-10 p-1.5 bg-black/60 rounded-full shadow-lg">
                    <PremiumIcon className={`w-4 h-4 ${isPremium ? 'text-yellow-400' : 'text-neutral-400'}`} />
                 </div>
            )}
          </div>
          <div className="text-center md:text-left flex-grow">
            <p className="text-xs sm:text-sm uppercase text-neutral-400 font-medium tracking-wider">Playlist</p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mt-1 mb-2"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {playlist.name.replace(' (Premium)', '')}
            </h1>
            {playlist.description && (
              <p className="text-neutral-300 text-base sm:text-lg mb-2">{playlist.description}</p>
            )}
            <p className="text-sm text-neutral-400 mb-4">
              Created by {playlist.createdBy} &bull; {playlist.tracks.length} songs, {formatTotalDuration(totalDurationSeconds)}
            </p>
             <div className="flex items-center justify-center md:justify-start space-x-3 sm:space-x-4">
              <button
                onClick={handlePlayPlaylist}
                 className={`flex items-center px-5 py-2.5 sm:px-6 sm:py-3 font-bold rounded-full transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-current
                            ${(isFirstTrackPremium && !isPremium)
                                ? 'bg-neutral-600 hover:bg-neutral-500 text-neutral-300 cursor-default'
                                : 'bg-green-500 hover:bg-green-400 text-black focus:ring-green-300'}`}
                aria-label={`Play playlist ${playlist.name}`}
              >
                <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Play Playlist
              </button>
              <button
                onClick={() => toggleLibraryItem(playlist.id, 'playlist')}
                className="p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 text-neutral-200 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label={isInLibrary ? `Remove ${playlist.name} from library` : `Add ${playlist.name} to library`}
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
        {playlist.tracks.length > 0 ? (
          <div className="space-y-1">
            {playlist.tracks.map((track, index) => (
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
            This playlist is currently empty. Add some songs!
          </p>
        )}
      </section>
    </div>
  );
};

export default PlaylistDetailPage;
