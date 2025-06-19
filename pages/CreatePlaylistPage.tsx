
// pages/CreatePlaylistPage.tsx
import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import PlusIcon from '../components/icons/PlusIcon';
import { useApp } from '../context/AppContext';
import { getTrackById, addPlaylistToMockData } from '../data/mockData';
import { Track, Playlist } from '../types';

interface PlaylistFormData {
  name: string;
  description: string;
  coverArt: File | null;
}

const CreatePlaylistPage: React.FC = () => {
  const { libraryItems, addToLibrary } = useApp(); // Added addToLibrary to potentially add new playlist to library
  const [formData, setFormData] = useState<PlaylistFormData>({
    name: '',
    description: '',
    coverArt: null,
  });
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selectedTrackIds, setSelectedTrackIds] = useState<Set<string>>(new Set());
  const [userLibraryTracks, setUserLibraryTracks] = useState<Track[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Load tracks from user's library
    const tracksFromLibrary = Array.from(libraryItems.entries())
      .filter(([, itemInfo]) => itemInfo.type === 'track')
      .map(([itemId]) => getTrackById(itemId))
      .filter((track): track is Track => track !== undefined);
    setUserLibraryTracks(tracksFromLibrary);
  }, [libraryItems]);

  const filteredLibraryTracks = useMemo(() => {
    if (!searchTerm.trim()) {
      return userLibraryTracks;
    }
    return userLibraryTracks.filter(
      track =>
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [userLibraryTracks, searchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (name === 'coverArt') {
        if (file.type.startsWith('image/')) {
          setFormData(prev => ({ ...prev, coverArt: file }));
          const reader = new FileReader();
          reader.onloadend = () => {
            setCoverArtPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
          setError(null);
        } else {
          setCoverArtPreview(null);
          setFormData(prev => ({ ...prev, coverArt: null }));
          setError('Cover art must be an image file (JPG, PNG, GIF, etc.).');
        }
      }
    } else {
      if (name === 'coverArt') {
        setFormData(prev => ({ ...prev, coverArt: null }));
        setCoverArtPreview(null);
      }
    }
  };

  const handleToggleSelectTrack = (trackId: string) => {
    setSelectedTrackIds(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (newSelectedIds.has(trackId)) {
        newSelectedIds.delete(trackId);
      } else {
        newSelectedIds.add(trackId);
      }
      return newSelectedIds;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!formData.name.trim()) {
      setError('Playlist name is required.');
      return;
    }
    if (formData.coverArt && !formData.coverArt.type.startsWith('image/')) {
      setError('Invalid cover art file type. Please select an image.');
      return;
    }

    const tracksForPlaylist: Track[] = Array.from(selectedTrackIds)
      .map(id => getTrackById(id))
      .filter((track): track is Track => track !== undefined);

    const newPlaylistId = `playlist-${Date.now()}`;
    let newCoverArtUrl = coverArtPreview; // Use existing preview if available

    if (formData.coverArt && !coverArtPreview) { // If file selected but no preview (e.g. error cleared then submitted)
        newCoverArtUrl = URL.createObjectURL(formData.coverArt);
    } else if (!formData.coverArt && tracksForPlaylist.length > 0) { // Default cover from first track if no custom cover
        newCoverArtUrl = tracksForPlaylist[0].coverArtUrl || '/assets/images/playlists/playlist-default.png';
    } else if (!formData.coverArt) {
        newCoverArtUrl = '/assets/images/playlists/playlist-default.png'; // Generic placeholder
    }


    const newPlaylist: Playlist = {
      id: newPlaylistId,
      name: formData.name,
      description: formData.description,
      coverArtUrl: newCoverArtUrl || undefined, // Object URL or default
      tracks: tracksForPlaylist,
      createdBy: 'Current User', // Placeholder for actual user system
      type: 'playlist',
    };

    addPlaylistToMockData(newPlaylist); // Add to mock data source

    // Optionally, add the new playlist to the current user's library automatically
    addToLibrary(newPlaylist.id, 'playlist');


    setMessage(`Playlist "${newPlaylist.name}" created successfully with ${tracksForPlaylist.length} songs! It has also been added to your library.`);
    
    // Reset form
    setFormData({ name: '', description: '', coverArt: null });
    setCoverArtPreview(null);
    setSelectedTrackIds(new Set());
    setSearchTerm('');
    
    // Revoke object URL if created for the cover art to free up resources
    if (formData.coverArt && newCoverArtUrl && newCoverArtUrl.startsWith('blob:')) {
        URL.revokeObjectURL(newCoverArtUrl);
    }

    setTimeout(() => setMessage(null), 7000);
  };

  return (
    <div className="text-neutral-100 p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Create New Playlist</h1>

      {message && <div className="mb-4 p-3 bg-green-600/30 border border-green-500 text-green-300 rounded-md text-sm">{message}</div>}
      {error && <div className="mb-4 p-3 bg-red-600/30 border border-red-500 text-red-300 rounded-md text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-800/50 p-6 sm:p-8 rounded-lg shadow-xl">
        {/* Playlist Details Section */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">
            Playlist Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2.5 bg-neutral-700 border border-neutral-600 rounded-md placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="e.g., Chill Lo-fi Beats"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-1">
            Description (Optional)
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2.5 bg-neutral-700 border border-neutral-600 rounded-md placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="A few words about this playlist..."
          />
        </div>

        <div>
          <label htmlFor="coverArt" className="block text-sm font-medium text-neutral-300 mb-1">
            Cover Art (Optional)
          </label>
          <input
            type="file"
            name="coverArt"
            id="coverArt"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
          />
          {coverArtPreview && (
            <div className="mt-3 inline-block">
              <img src={coverArtPreview} alt="Playlist cover art preview" className="max-w-xs h-auto max-h-48 rounded-md object-contain border border-neutral-600" />
            </div>
          )}
          <p className="mt-1 text-xs text-neutral-500">JPG, PNG, GIF. Recommended: square, min 300x300px.</p>
        </div>

        {/* Add Songs Section */}
        <div className="pt-6 border-t border-neutral-700/60">
          <h2 className="text-xl font-semibold text-neutral-100 mb-3">Add Songs to Playlist</h2>
          <input
            type="text"
            placeholder="Search your library..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2.5 mb-4 bg-neutral-700 border border-neutral-600 rounded-md placeholder-neutral-400 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <div className="max-h-80 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-700/50 rounded-md border border-neutral-700 p-2">
            {userLibraryTracks.length === 0 && (
                 <p className="text-neutral-500 text-sm text-center py-4">Your music library is empty. Add songs to your library first.</p>
            )}
            {userLibraryTracks.length > 0 && filteredLibraryTracks.length === 0 && searchTerm && (
                 <p className="text-neutral-500 text-sm text-center py-4">No songs found matching your search.</p>
            )}
            {filteredLibraryTracks.map(track => (
              <div
                key={track.id}
                className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors ${selectedTrackIds.has(track.id) ? 'bg-purple-600/30 hover:bg-purple-600/40' : 'bg-neutral-700/40 hover:bg-neutral-600/60'}`}
                onClick={() => handleToggleSelectTrack(track.id)}
              >
                <div className="flex items-center min-w-0 flex-1">
                  <img src={track.coverArtUrl || '/assets/images/tracks/track-default-40.png'} alt={track.title} className="w-10 h-10 rounded object-cover mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-neutral-100 truncate">{track.title}</p>
                    <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedTrackIds.has(track.id)}
                  onChange={() => handleToggleSelectTrack(track.id)}
                  onClick={(e) => e.stopPropagation()} // Prevent row click from double-toggling
                  className="form-checkbox h-5 w-5 text-purple-500 bg-neutral-800 border-neutral-500 rounded focus:ring-purple-400 focus:ring-offset-0 ml-3 flex-shrink-0 cursor-pointer"
                  aria-label={`Select ${track.title}`}
                />
              </div>
            ))}
          </div>
           <p className="mt-2 text-xs text-neutral-500">{selectedTrackIds.size} songs selected.</p>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-4 rounded-full transition-colors duration-150 text-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-neutral-800 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!formData.name.trim()}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Playlist
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylistPage;
