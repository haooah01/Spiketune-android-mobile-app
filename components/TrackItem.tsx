
// components/TrackItem.tsx
import React from 'react';
import { Track } from '../types';
import { useApp } from '../context/AppContext';
import HeartIcon from './icons/HeartIcon';
import HeartFilledIcon from './icons/HeartFilledIcon';
import DownloadIcon from './icons/DownloadIcon';
import AddToLibraryIcon from './icons/AddToLibraryIcon';
import BookmarkFilledIcon from './icons/BookmarkFilledIcon'; // Added
import PremiumIcon from './icons/PremiumIcon'; // Added

// Simple Play Icon for TrackItem
const PlayMiniIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>;


interface TrackItemProps {
  track: Track;
  index: number; // For display number
  onPlay: (track: Track) => void; // Callback to play this specific track
}

const TrackItem: React.FC<TrackItemProps> = ({ track, index, onPlay }) => {
  const { likedSongs, toggleLikeSong, toggleLibraryItem, isItemInLibrary, isPremium, currentTrack, isPlaying } = useApp();
  const isThisTrackLiked = likedSongs.has(track.id);
  const isThisTrackInLibrary = isItemInLibrary(track.id);
  const isCurrentlyPlayingThisTrack = currentTrack?.id === track.id && isPlaying;

  const userCanPlayTrack = track.isPremiumOnly ? isPremium : true;

  const formatDuration = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (track.isPremiumOnly && !isPremium) {
      // Potentially trigger premium modal or show a message
      alert("This track is premium. Upgrade to download.");
      return;
    }
    if (track.url) {
      try {
        const link = document.createElement('a');
        link.href = track.url;
        const fileExtension = track.url.split('.').pop() || 'mp3';
        const suggestedFilename = `${track.title} - ${track.artist}.${fileExtension}`;
        link.setAttribute('download', suggestedFilename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(`Download initiated for: ${track.title}`);
      } catch (error) {
        console.error("Error initiating download for track:", track.title, error);
        alert(`Could not initiate download for ${track.title}. Check console for details.`);
      }
    } else {
      alert(`No download URL available for ${track.title}.`);
      console.warn(`No URL for track: ${track.title} (ID: ${track.id})`);
    }
  };

  const handleToggleLibrary = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLibraryItem(track.id, 'track');
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(track); // This will trigger premium check in AppContext's playTrack
  };

  return (
    <div 
        className={`group flex items-center justify-between p-3 rounded-md transition-colors duration-150 
                    ${isCurrentlyPlayingThisTrack ? 'bg-purple-600/20 hover:bg-purple-600/30' : 'hover:bg-neutral-800/70'}
                    ${(track.isPremiumOnly && !isPremium) ? 'opacity-75 hover:opacity-100' : ''}`}
        onClick={handlePlayClick} // Allow click on row to play
        role="button"
        aria-label={`Play ${track.title} by ${track.artist}`}
    >
      <div className="flex items-center flex-1 min-w-0 mr-4">
        <span className="text-neutral-400 text-sm w-8 text-center mr-3 group-hover:hidden">{index + 1}</span>
        <button 
            onClick={handlePlayClick} 
            className={`text-neutral-100 text-sm w-8 text-center mr-3 hidden group-hover:flex items-center justify-center focus:outline-none 
                        ${(track.isPremiumOnly && !isPremium) ? 'cursor-default' : ''}`}
            aria-label={`Play ${track.title}`}
            disabled={track.isPremiumOnly && !isPremium && !isCurrentlyPlayingThisTrack} // Disable if premium and not subscribed, unless it's already playing (which means they are premium)
        >
            <PlayMiniIcon />
        </button>
        <img 
          src={track.coverArtUrl || '/assets/images/tracks/track-default-40.png'} 
          alt={track.title} 
          className="w-10 h-10 rounded object-cover mr-4 flex-shrink-0"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className="flex items-center">
            <p className={`text-sm font-medium truncate ${isCurrentlyPlayingThisTrack ? 'text-purple-400' : 'text-neutral-100'}`} title={track.title}>
                {track.title.replace(' (Premium)', '')} {/* Remove (Premium) from display title */}
            </p>
            {track.isPremiumOnly && (
              <PremiumIcon className={`w-3.5 h-3.5 ml-1.5 flex-shrink-0 ${isPremium ? 'text-yellow-400' : 'text-neutral-500'}`} />
            )}
          </div>
          <p className="text-neutral-400 text-xs truncate" title={track.artist}>{track.artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
        <button 
            onClick={handleToggleLibrary} 
            className="text-neutral-400 hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150 sm:opacity-100 focus:outline-none" 
            aria-label={isThisTrackInLibrary ? "Remove from library" : "Add to library"}
        >
          {isThisTrackInLibrary ? 
            <BookmarkFilledIcon className="w-5 h-5 text-purple-500" /> : 
            <AddToLibraryIcon className="w-5 h-5 hover:text-purple-400" />}
        </button>
        <button 
            onClick={handleDownload} 
            className={`text-neutral-400 hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150 sm:opacity-100 focus:outline-none
                        ${(track.isPremiumOnly && !isPremium) ? 'cursor-not-allowed' : ''}`}
            aria-label={`Download ${track.title}`}
            disabled={track.isPremiumOnly && !isPremium}
        >
          <DownloadIcon className="w-5 h-5" />
        </button>
        <button 
            onClick={(e) => { e.stopPropagation(); toggleLikeSong(track.id); }} 
            className="text-neutral-400 hover:text-purple-400 focus:outline-none" 
            aria-label={isThisTrackLiked ? `Unlike ${track.title}` : `Like ${track.title}`}
        >
          {isThisTrackLiked ? <HeartFilledIcon className="w-5 h-5 text-purple-500" /> : <HeartIcon className="w-5 h-5 hover:text-purple-400" />}
        </button>
        <span className="text-neutral-400 text-sm w-10 text-right hidden sm:block">{formatDuration(track.duration)}</span>
      </div>
    </div>
  );
};

export default TrackItem;
