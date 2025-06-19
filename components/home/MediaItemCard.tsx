
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for v6
import { useApp } from '../../context/AppContext';
import { mockAlbums, mockPlaylists, getTrackById } from '../../data/mockData';
import PlayIcon from '../icons/PlayIcon';
import DownloadIcon from '../icons/DownloadIcon';
import AddToLibraryIcon from '../icons/AddToLibraryIcon';
import BookmarkFilledIcon from '../icons/BookmarkFilledIcon';
import HeartIcon from '../icons/HeartIcon';
import HeartFilledIcon from '../icons/HeartFilledIcon';
import PremiumIcon from '../icons/PremiumIcon'; 
import { Track } from '../../types';

interface MediaItemCardProps {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  type: 'album' | 'playlist' | 'track' | 'artist';
  onClick?: (id: string, type: 'album' | 'playlist' | 'track' | 'artist') => void;
}

const MediaItemCard: React.FC<MediaItemCardProps> = ({
  id,
  title,
  subtitle,
  imageUrl,
  type,
  onClick,
}) => {
  const { playTrack, likedSongs, toggleLikeSong, toggleLibraryItem, isItemInLibrary, isPremium } = useApp();
  const navigate = useNavigate(); // Changed from useHistory

  const itemDetails = React.useMemo(() => {
    if (type === 'album') return mockAlbums.find(a => a.id === id);
    if (type === 'playlist') {
        const playlist = mockPlaylists.find(p => p.id === id);
        if (playlist) {
            playlist.tracks = playlist.tracks.map(t => getTrackById(t.id)).filter(track => track !== undefined) as Track[];
        }
        return playlist;
    }
    return null;
  }, [id, type]);

  const firstTrack = itemDetails?.tracks?.[0];
  const isItemInUserLibrary = isItemInLibrary(id);
  const isFirstTrackPremium = firstTrack?.isPremiumOnly || false;

  const handlePlayClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (firstTrack) {
      playTrack(firstTrack); 
    } else {
      console.warn(`No tracks found for ${type} ID: ${id} or item not found.`);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(id, type);
    } else if (type === 'artist') {
        navigate(`/artist/${id}`); // Changed to navigate
    } else if (type === 'album') {
        navigate(`/album/${id}`); // Changed to navigate
    } else if (type === 'playlist') {
        navigate(`/playlist/${id}`); // Changed to navigate
    }
  };

  const handleToggleLibraryClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleLibraryItem(id, type as 'album' | 'playlist');
  };

  const isFirstTrackLiked = firstTrack ? likedSongs.has(firstTrack.id) : false;

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (firstTrack) {
      toggleLikeSong(firstTrack.id);
    } else {
      console.warn(`Cannot (un)like ${type} ID ${id} - no first track found.`);
    }
  };

  const handleDownloadClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (firstTrack && firstTrack.url) {
        if (firstTrack.isPremiumOnly && !isPremium) {
            playTrack(firstTrack); 
            return;
        }
        try {
            const link = document.createElement('a');
            link.href = firstTrack.url;

            const fileExtension = firstTrack.url.split('.').pop() || 'mp3';
            const suggestedFilename = `${firstTrack.title} - ${firstTrack.artist}.${fileExtension}`;
            link.setAttribute('download', suggestedFilename);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(`Attempting to download: ${firstTrack.title}`);
        } catch (error) {
            console.error("Error initiating download:", error);
            alert(`Could not initiate download for ${firstTrack.title}. Check console for details.`);
        }
    } else {
        alert(`No downloadable track available for ${title}.`);
        console.log(`No track URL for ${type} ID ${id} to download.`);
    }
  };

  const isArtist = type === 'artist';
  const showActionButtons = type === 'album' || type === 'playlist';

  return (
    <div
      className={`group relative flex-shrink-0 w-40 sm:w-44 md:w-48 bg-neutral-800 hover:bg-neutral-700/80 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer
                  ${isArtist ? 'aspect-square flex flex-col p-3' : 'p-3'}
                  ${(isFirstTrackPremium && !isPremium && !isArtist) ? 'opacity-80 hover:opacity-100' : ''}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${title}${subtitle ? ` by ${subtitle}` : ''}`}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      {/* Image and Play Button Overlay Section */}
      <div className={`relative ${isArtist ? 'flex-grow w-full' : 'aspect-square mb-2'}`}>
        <img
          src={imageUrl || '/assets/images/utils/fallback-card.png'}
          alt={`${title} cover art`}
          className={`w-full h-full object-cover ${isArtist ? 'rounded-full' : 'rounded-md'} shadow-md group-hover:shadow-xl transition-shadow`}
          loading="lazy"
        />
        {!isArtist && firstTrack && (
          <button
            onClick={handlePlayClick}
            aria-label={`Play ${title}`}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            <div className="p-2 bg-purple-600 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
              <PlayIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </button>
        )}
        {isFirstTrackPremium && type !== 'artist' && (
          <div className="absolute top-1.5 right-1.5 p-1 bg-black/50 rounded-full">
            <PremiumIcon className={`w-3.5 h-3.5 ${isPremium ? 'text-yellow-400' : 'text-neutral-400' }`} />
          </div>
        )}
      </div>

      {/* Text Info and Action Buttons Section */}
      <div className={`${isArtist ? 'text-center pt-2' : 'mt-1'}`}>
        <div className="flex justify-between items-start">
            <div className="flex-grow min-w-0 mr-1">
                <h3 className="text-sm sm:text-base font-semibold text-neutral-100 truncate" title={title}>
                {title.replace(' (Premium)', '')}
                </h3>
                {subtitle && (
                <p className="text-xs sm:text-sm text-neutral-400 truncate" title={subtitle}>
                    {subtitle}
                </p>
                )}
            </div>

            {showActionButtons && (
            <div className="flex-shrink-0 flex items-center space-x-1 sm:space-x-1.5">
                <button
                  onClick={handleToggleLibraryClick}
                  aria-label={isItemInUserLibrary ? `Remove ${title} from library` : `Add ${title} to library`}
                  className="p-1 text-neutral-400 hover:text-white focus:outline-none focus:text-purple-400 rounded-full"
                >
                  {isItemInUserLibrary ?
                    <BookmarkFilledIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-purple-500" /> :
                    <AddToLibraryIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] hover:text-purple-400" />}
                </button>
                {firstTrack && (
                <>
                  <button
                    onClick={handleFavoriteClick}
                    aria-label={isFirstTrackLiked ? `Unlike first track of ${title}` : `Like first track of ${title}`}
                    className="p-1 text-neutral-400 hover:text-white focus:outline-none rounded-full"
                  >
                    {isFirstTrackLiked ?
                      <HeartFilledIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-purple-500" /> :
                      <HeartIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] hover:text-purple-400" />}
                  </button>
                  <button
                    onClick={handleDownloadClick}
                    aria-label={`Download first track of ${title}`}
                    className={`p-1 text-neutral-400 hover:text-white focus:outline-none focus:text-purple-400 rounded-full ${(isFirstTrackPremium && !isPremium) ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={isFirstTrackPremium && !isPremium}
                  >
                    <DownloadIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  </button>
                </>
                )}
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MediaItemCard;
