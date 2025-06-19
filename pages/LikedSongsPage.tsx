
// pages/LikedSongsPage.tsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { getAllTracks, getTrackById } from '../data/mockData'; // Helper to get track details
import { Track } from '../types';
import TrackItem from '../components/TrackItem'; // New component to display each track

const LikedSongsPage: React.FC = () => {
  const { likedSongs, playTrack } = useApp();
  
  // Memoize getting liked track details
  const likedTracksDetails: Track[] = React.useMemo(() => {
    const allTracks = getAllTracks(); // Assuming this function exists in mockData
    return Array.from(likedSongs)
      .map(trackId => allTracks.find(t => t.id === trackId))
      .filter((track): track is Track => track !== undefined);
  }, [likedSongs]);

  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };

  return (
    <div className="text-neutral-100 p-4 sm:p-6">
      <div className="flex items-center mb-6 sm:mb-8">
        {/* Placeholder for a large heart icon or album art representation */}
        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center mr-4 sm:mr-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-14 sm:w-14 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-xs sm:text-sm uppercase text-neutral-400 font-medium">Playlist</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white">Liked Songs</h1>
          <p className="text-neutral-300 text-sm mt-2">{likedTracksDetails.length} songs</p>
        </div>
      </div>

      {likedTracksDetails.length > 0 ? (
        <div className="space-y-1">
          {likedTracksDetails.map((track, index) => (
            <TrackItem key={track.id} track={track} index={index} onPlay={handlePlayTrack} />
          ))}
        </div>
      ) : (
        <p className="text-neutral-400 text-center py-10">
          No liked songs yet. Tap the heart to add them here!
        </p>
      )}
    </div>
  );
};

export default LikedSongsPage;