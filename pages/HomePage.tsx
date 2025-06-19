
import React, { useEffect } from 'react';
import SectionRow from '../components/home/SectionRow';
import { mockAlbums, mockArtists, mockTrendingItems } from '../data/mockData';
import { useApp } from '../context/AppContext'; // Import useApp
import { Track, Album, Playlist } from '../types'; // Import Track type

const HomePage: React.FC = () => {
  const { addNotification } = useApp(); // Get addNotification from context

  useEffect(() => {
    const timer = setTimeout(() => {
      const trendingItem = mockTrendingItems[0]; // Example: "This Month's Super Hits" (album-2 or playlist-1)
      let trackForNotification: Track | undefined = undefined;

      if (trendingItem) {
        // Check if it's an Album or Playlist and has tracks
        if ('tracks' in trendingItem && trendingItem.tracks && trendingItem.tracks.length > 0) {
          trackForNotification = trendingItem.tracks[0];
        }
      }
      
      if (trackForNotification) {
        addNotification({
          message: "Trending Now:", 
          type: "trending",
          duration: 7000, // 7 seconds duration
          trackId: trackForNotification.id,
          title: trackForNotification.title,
          artist: trackForNotification.artist,
        });
      } else {
        // Fallback generic notification if no specific track found or suitable
        addNotification({
          message: "Check out what's hot and trending!",
          type: "trending",
          duration: 7000
        });
      }
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [addNotification]);

  return (
    <div className="text-neutral-100 space-y-8">
      <SectionRow 
        title="Trending Songs" 
        items={mockTrendingItems} 
        itemType="album" // This should ideally be dynamic or MediaItemCard should handle mixed types
      />
      <SectionRow 
        title="Featured Albums" 
        items={mockAlbums.slice(0,5)} 
        itemType="album" 
      />
       <SectionRow 
        title="Popular Artists" 
        items={mockArtists} 
        itemType="artist" 
      />
    </div>
  );
};

export default HomePage;