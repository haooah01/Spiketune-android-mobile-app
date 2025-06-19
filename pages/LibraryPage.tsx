
// pages/LibraryPage.tsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { mockAlbums, mockPlaylists, getTrackById } from '../data/mockData';
import { Album, Playlist, Track, LibraryItemType } from '../types';
import MediaItemCard from '../components/home/MediaItemCard';
import TrackItem from '../components/TrackItem';

// Define a conditional type for items based on LibraryItemType
type RenderSectionItems<IT extends LibraryItemType> =
  IT extends 'track' ? Track[] :
  IT extends 'album' ? Album[] :
  IT extends 'playlist' ? Playlist[] :
  never;

const LibraryPage: React.FC = () => {
  const { libraryItems, playTrack } = useApp();

  const categorizedItems = React.useMemo(() => {
    const albums: Album[] = [];
    const playlists: Playlist[] = [];
    const tracks: Track[] = [];

    const sortedLibraryEntries = Array.from(libraryItems.entries())
                                     .sort(([, aInfo], [, bInfo]) => bInfo.dateAdded - aInfo.dateAdded);

    for (const [id, info] of sortedLibraryEntries) {
      if (info.type === 'album') {
        const album = mockAlbums.find(a => a.id === id);
        if (album) albums.push(album);
      } else if (info.type === 'playlist') {
        const playlist = mockPlaylists.find(p => p.id === id);
        if (playlist) playlists.push(playlist);
      } else if (info.type === 'track') {
        const track = getTrackById(id);
        if (track) tracks.push(track);
      }
    }
    return { albums, playlists, tracks };
  }, [libraryItems]);

  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };
  
  const renderSection = <CurrentItemType extends LibraryItemType>(
    title: string,
    items: RenderSectionItems<CurrentItemType>,
    itemType: CurrentItemType
  ) => {
    if (!items || items.length === 0) return null;

    return (
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-5">{title}</h2>
        {itemType === 'track' ? (
          // items is Track[] here
          <div className="space-y-1">
            {(items as Track[]).map((track, index) => ( // items is already Track[] due to RenderSectionItems and itemType check
              <TrackItem key={track.id} track={track} index={index} onPlay={handlePlayTrack} />
            ))}
          </div>
        ) : itemType === 'album' ? (
          // items is Album[] here
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {(items as Album[]).map(album => ( // items is Album[]
              <MediaItemCard
                key={album.id}
                id={album.id}
                title={album.title}
                subtitle={album.artist}
                imageUrl={album.coverArtUrl || '/assets/images/utils/fallback-card.png'}
                type="album"
              />
            ))}
          </div>
        ) : itemType === 'playlist' ? (
           // items is Playlist[] here
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {(items as Playlist[]).map(playlist => ( // items is Playlist[]
              <MediaItemCard
                key={playlist.id}
                id={playlist.id}
                title={playlist.name}
                subtitle={playlist.description ? playlist.description.substring(0,30) + '...' : undefined}
                imageUrl={playlist.coverArtUrl || '/assets/images/utils/fallback-card.png'}
                type="playlist"
              />
            ))}
          </div>
        ) : null}
      </section>
    );
  };

  return (
    <div className="text-neutral-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-white">Your Library</h1>
      
      {libraryItems.size === 0 ? (
        <p className="text-neutral-400 text-lg text-center py-10">
          Your library is empty. Add albums, playlists, or songs to see them here.
        </p>
      ) : (
        <>
          {renderSection("Playlists", categorizedItems.playlists, 'playlist')}
          {renderSection("Albums", categorizedItems.albums, 'album')}
          {renderSection("Songs", categorizedItems.tracks, 'track')}
        </>
      )}
    </div>
  );
};

export default LibraryPage;
