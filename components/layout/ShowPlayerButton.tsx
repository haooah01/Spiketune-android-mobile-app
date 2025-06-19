// components/layout/ShowPlayerButton.tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import ChevronUpIcon from '../icons/ChevronUpIcon';
import PlayIcon from '../icons/PlayIcon'; // Using a generic play icon as part of the button

const ShowPlayerButton: React.FC = () => {
  const { togglePlayerBarVisibility, currentTrack } = useApp();

  return (
    <button
      onClick={togglePlayerBarVisibility}
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 flex items-center justify-center p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-neutral-900 animate-fade-in-player-button"
      aria-label="Show music player"
      title="Show music player"
    >
      {currentTrack ? (
        <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      ) : (
        <ChevronUpIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      )}
      {currentTrack && (
        <span className="ml-2 text-xs sm:text-sm font-medium hidden sm:inline">
            {currentTrack.title.length > 15 ? `${currentTrack.title.substring(0,15)}...` : currentTrack.title}
        </span>
      )}
    </button>
  );
};

export default ShowPlayerButton;