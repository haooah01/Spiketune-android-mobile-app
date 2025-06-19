
// pages/ArtistDetailPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated imports for v6
import { getArtistById, getAlbumsByArtistName, getTopTracksByArtistName } from '../data/mockData';
import { Artist, Album, Track } from '../types';
import { useApp } from '../context/AppContext';
import TrackItem from '../components/TrackItem';
import MediaItemCard from '../components/home/MediaItemCard';
import BackButton from '../components/common/BackButton';
import ArtistDetailPageSkeleton from '../components/skeletons/ArtistDetailPageSkeleton';
import PlusIcon from '../components/icons/PlusIcon';

const ArtistDetailPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const navigate = useNavigate(); // Changed from useHistory
  const { playTrack } = useApp();

  const [artist, setArtist] = useState<Artist | null | undefined>(undefined);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setArtist(undefined);
    setAlbums([]);
    setTopTracks([]);

    if (artistId) {
      const timer = setTimeout(() => {
        const foundArtist = getArtistById(artistId);
        setArtist(foundArtist);
        if (foundArtist) {
          setAlbums(getAlbumsByArtistName(foundArtist.name));
          setTopTracks(getTopTracksByArtistName(foundArtist.name, 5));
        }
        setIsLoading(false);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setArtist(null);
      setIsLoading(false);
    }
  }, [artistId]);

  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };

  const backgroundStyle = useMemo(() => {
    if (artist?.coverArtUrl) {
      return { backgroundImage: `url(${artist.coverArtUrl})` };
    }
    return { backgroundImage: `url('/assets/images/utils/fallback-artist-bg.png')` };
  }, [artist]);

  const headerGradientStyle = artist?.coverArtUrl
    ? 'from-neutral-900/50 via-neutral-900/80 to-neutral-900'
    : 'from-neutral-800 via-neutral-800 to-neutral-900';


  if (isLoading || artist === undefined) {
    return <ArtistDetailPageSkeleton />;
  }

  if (!artist) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-neutral-100 p-8 min-h-[calc(100vh-var(--header-height,64px)-var(--player-height,80px))]">
        <h1 className="text-3xl font-bold mb-4">Artist Not Found</h1>
        <p className="text-neutral-300 mb-6">The artist you're looking for doesn't seem to exist.</p>
        <button
          onClick={() => navigate('/')} // Changed to navigate
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-colors flex items-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-neutral-100 min-h-full">
      <section
        className="relative p-6 sm:p-8 md:p-10 min-h-[350px] sm:min-h-[400px] md:min-h-[450px] flex flex-col justify-end bg-cover bg-center bg-no-repeat"
        style={backgroundStyle}
      >
        <div className={`absolute inset-0 bg-gradient-to-t ${headerGradientStyle} -z-10`}></div>

        <BackButton
          className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20"
          text="Artists"
          defaultPath="/search"
        />

        <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
           <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-3 drop-shadow-lg"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {artist.name}
          </h1>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
            <button
                className="flex items-center px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition-colors text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-neutral-900"
                aria-label={`Follow ${artist.name}`}
            >
                <PlusIcon className="w-5 h-5 mr-1.5" />
                Follow
            </button>
          </div>
            {artist.bio && (
                <p className="text-neutral-300 text-sm sm:text-base max-w-xl leading-relaxed drop-shadow-sm">
                {artist.bio}
                </p>
            )}
        </div>
      </section>

      {topTracks.length > 0 && (
        <section className="p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 sm:mb-5">Popular Songs</h2>
          <div className="space-y-1">
            {topTracks.map((track, index) => (
              <TrackItem
                key={track.id}
                track={track}
                index={index}
                onPlay={handlePlayTrack}
              />
            ))}
          </div>
        </section>
      )}

      {albums.length > 0 && (
        <section className="p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 sm:mb-5">Albums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {albums.map((album) => (
              <MediaItemCard
                key={album.id}
                id={album.id}
                title={album.title}
                subtitle={album.releaseDate.substring(0,4)}
                imageUrl={album.coverArtUrl || '/assets/images/utils/fallback-card.png'}
                type="album"
              />
            ))}
          </div>
        </section>
      )}

      {topTracks.length === 0 && albums.length === 0 && (
         <p className="text-neutral-400 text-center py-10 px-4">
            No music found for {artist.name} at the moment.
          </p>
      )}
    </div>
  );
};

export default ArtistDetailPage;
