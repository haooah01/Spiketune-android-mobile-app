import React from 'react';
import MediaItemCard from './MediaItemCard';
import { Album, Playlist } from '../../types';

interface SectionRowProps {
  title: string;
  items: (Album | Playlist | { id: string; name: string; coverArtUrl: string; type: 'artist' })[]; // Allow mixed types if needed, or specify
  itemType: 'album' | 'playlist' | 'artist'; // To help MediaItemCard differentiate if necessary
}

const SectionRow: React.FC<SectionRowProps> = ({ title, items, itemType }) => {
  if (!items || items.length === 0) {
    return null; // Don't render empty sections
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-2xl font-bold text-neutral-100">{title}</h2>
        {/* Optional: "See All" link */}
        {/* <a href="#" className="text-sm font-semibold text-purple-400 hover:text-purple-300">See All</a> */}
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        {items.map((item) => (
          <MediaItemCard
            key={item.id}
            id={item.id}
            // For albums and playlists, title/name are distinct. For artists, we use name.
            title={'title' in item ? item.title : item.name} 
            // Subtitle logic
            subtitle={
              itemType === 'album' && 'artist' in item ? item.artist : 
              itemType === 'playlist' && 'description' in item ? (item.description?.substring(0,30) + '...') : 
              itemType === 'artist' ? 'Artist' : ''
            }
            imageUrl={item.coverArtUrl}
            type={itemType}
          />
        ))}
        {/* Add a little extra space at the end of the scroll for better UX */}
        <div className="flex-shrink-0 w-1"></div>
      </div>
    </section>
  );
};

export default SectionRow;
