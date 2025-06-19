


import React from 'react';
import { Link } from 'react-router-dom'; // This import is fine for v5
import { useApp } from '../../context/AppContext';
import HeartIcon from '../icons/HeartIcon';
import HeartFilledIcon from '../icons/HeartFilledIcon';
import VolumeUpIcon from '../icons/VolumeUpIcon';
import VolumeOffIcon from '../icons/VolumeOffIcon';
import VolumeLowIcon from '../icons/VolumeLowIcon';
import VolumeMediumIcon from '../icons/VolumeMediumIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';

// Placeholder icons for player controls
const PlayCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
  </svg>
);

const PauseCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z" clipRule="evenodd" />
  </svg>
);

const PreviousTrackIcon = () => ( // This icon will now represent "Seek Backward"
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811V7.189a1.5 1.5 0 00-2.25-1.319l-7.5 4.075a1.5 1.5 0 000 2.638l7.5 4.075A1.5 1.5 0 0021 16.811zM3.75 7.189v9.622a1.5 1.5 0 002.25 1.319l7.5-4.074a1.5 1.5 0 000-2.638l-7.5-4.075A1.5 1.5 0 003.75 7.189z" />
  </svg>
);

const NextTrackIcon = () => ( // This icon will now represent "Seek Forward"
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.811V7.189a1.5 1.5 0 012.25-1.319l7.5 4.075a1.5 1.5 0 010 2.638l-7.5 4.075A1.5 1.5 0 013 16.811zM18.75 7.189v9.622a1.5 1.5 0 01-2.25 1.319l-7.5-4.074a1.5 1.5 0 010-2.638l7.5-4.075A1.5 1.5 0 0118.75 7.189z" />
  </svg>
);

const SEEK_AMOUNT = 10; // Seek 10 seconds

const BottomPlayerBar: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    likedSongs,
    volume,
    isMuted,
    currentTime,
    duration,
    togglePlayPause,
    toggleLikeSong,
    setVolume,
    toggleMute,
    seekTime,
    togglePlayerBarVisibility,
  } = useApp();

  const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity) {
      return '0:00';
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    seekTime(Number(event.target.value));
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeOffIcon className="w-5 h-5" />;
    }
    if (volume > 0 && volume <= 0.33) {
      return <VolumeLowIcon className="w-5 h-5" />;
    }
    if (volume > 0.33 && volume <= 0.66) {
      return <VolumeMediumIcon className="w-5 h-5" />;
    }
    return <VolumeUpIcon className="w-5 h-5" />;
  };

  const handleSeekBackward = () => {
    if (currentTrack) {
      seekTime(Math.max(0, currentTime - SEEK_AMOUNT));
    }
  };

  const handleSeekForward = () => {
    if (currentTrack) {
      seekTime(currentTime + SEEK_AMOUNT);
    }
  };

  const playerBarAnimationClass = "player-bar-slide-up";

  if (!currentTrack) {
    return (
      <footer className={`h-20 bg-neutral-800 border-t border-neutral-700 flex items-center justify-center px-4 text-neutral-500 ${playerBarAnimationClass}`}>
        No track selected.
        <button
          onClick={togglePlayerBarVisibility}
          className="absolute top-[-28px] right-3 p-1.5 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 hover:text-white rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400"
          aria-label="Hide player bar"
          title="Hide player bar"
        >
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </footer>
    );
  }

  const isLiked = likedSongs.has(currentTrack.id);

  return (
    <footer className={`relative h-20 bg-neutral-800 border-t border-neutral-700 flex items-center justify-between px-4 sm:px-6 ${playerBarAnimationClass}`}>
       <button
        onClick={togglePlayerBarVisibility}
        className="absolute top-[-28px] right-3 p-1.5 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 hover:text-white rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400 z-10"
        aria-label="Hide player bar"
        title="Hide player bar"
      >
        <ChevronDownIcon className="w-4 h-4" />
      </button>
      {/* Left: Track Info */}
      <div className="flex items-center w-1/3 min-w-0">
        <img
          src={currentTrack.coverArtUrl || '/assets/images/tracks/track-default-64.png'}
          alt={currentTrack.title}
          className="w-12 h-12 rounded object-cover mr-3"
        />
        <div className="min-w-0">
          <Link to={`/lyrics/${currentTrack.id}`} className="hover:underline focus:outline-none focus:ring-1 focus:ring-purple-400 rounded">
            <p className="text-sm font-medium text-neutral-100 truncate" title={currentTrack.title}>
              {currentTrack.title}
            </p>
          </Link>
          <Link to={`/lyrics/${currentTrack.id}`} className="hover:underline focus:outline-none focus:ring-1 focus:ring-purple-400 rounded">
            <p className="text-xs text-neutral-400 truncate" title={currentTrack.artist}>
              {currentTrack.artist}
            </p>
          </Link>
        </div>
        <button
          onClick={() => toggleLikeSong(currentTrack.id)}
          className="ml-4 text-neutral-400 hover:text-purple-400 focus:outline-none"
          aria-label={isLiked ? 'Unlike track' : 'Like track'}
        >
          {isLiked ? <HeartFilledIcon className="w-5 h-5 text-purple-500" /> : <HeartIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Center: Player Controls & Progress */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center space-x-3 mb-1">
          <button
            onClick={handleSeekBackward}
            className="text-neutral-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
            disabled={!currentTrack}
            aria-label="Seek backward 10 seconds"
          >
            <PreviousTrackIcon />
          </button>
          <button onClick={togglePlayPause} className="text-white hover:text-purple-300 focus:outline-none" aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
          </button>
          <button
            onClick={handleSeekForward}
            className="text-neutral-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
            disabled={!currentTrack}
            aria-label="Seek forward 10 seconds"
          >
            <NextTrackIcon />
          </button>
        </div>
        <div className="flex items-center w-full max-w-xs space-x-2">
          <span className="text-xs text-neutral-400 w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime || 0}
            onChange={handleProgressChange}
            className="w-full h-1.5 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
            aria-label="Track progress"
            disabled={!currentTrack}
          />
          <span className="text-xs text-neutral-400 w-10 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume Controls */}
      <div className="flex items-center justify-end w-1/3 space-x-2">
        <button onClick={toggleMute} className="text-neutral-400 hover:text-white focus:outline-none" aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {getVolumeIcon()}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-20 h-1.5 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
          aria-label="Volume control"
        />
      </div>
    </footer>
  );
};

export default BottomPlayerBar;
