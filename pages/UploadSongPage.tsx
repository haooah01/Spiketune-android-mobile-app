// pages/UploadSongPage.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useApp } from '../context/AppContext'; // Import useApp
import FolderIcon from '../components/icons/FolderIcon'; // Import FolderIcon

interface FormData {
  title: string;
  artist: string;
  album: string;
  coverArt: File | null;
  audioFile: File | null;
}

const UploadSongPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    artist: '',
    album: '',
    coverArt: null,
    audioFile: null,
  });
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useApp(); // Get addNotification from context

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));

      if (name === 'coverArt') {
        if (file.type.startsWith('image/')) {
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
      } else if (name === 'audioFile') {
        if (file.type.startsWith('audio/')) {
           setError(null);
        } else {
          setFormData(prev => ({...prev, audioFile: null}));
          setError('Audio file must be a valid audio format (MP3, WAV, OGG, etc.).');
        }
      }
    } else {
      // Clear the file if no file is selected (e.g., user cancels file dialog)
      if (name === 'coverArt') {
        setFormData(prev => ({ ...prev, coverArt: null }));
        setCoverArtPreview(null);
      } else if (name === 'audioFile') {
        setFormData(prev => ({ ...prev, audioFile: null }));
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!formData.title) {
      setError('Song title is required.');
      return;
    }
    if (!formData.artist) {
      setError('Artist name is required.');
      return;
    }
    if (!formData.audioFile) {
      setError('Audio file is required.');
      return;
    }
     if (formData.coverArt && !formData.coverArt.type.startsWith('image/')) {
      setError('Invalid cover art file type. Please select an image.');
      return;
    }
    if (!formData.audioFile.type.startsWith('audio/')) {
      setError('Invalid audio file type. Please select an audio file.');
      return;
    }

    // In a real app, you would upload files and save metadata
    console.log('Song Upload Data:', {
      title: formData.title,
      artist: formData.artist,
      album: formData.album,
      coverArtFilename: formData.coverArt?.name,
      audioFilename: formData.audioFile.name,
    });

    addNotification({
        message: `"${formData.title}" by ${formData.artist} uploaded successfully (simulated).`,
        type: 'success',
        duration: 5000,
    });
    
    // Reset form
    setFormData({ title: '', artist: '', album: '', coverArt: null, audioFile: null });
    setCoverArtPreview(null);
    // If you have a file input ref, you might need to reset it: e.g., coverArtInputRef.current.value = "";
  };

  const handleSelectFolder = async () => {
    if ('showDirectoryPicker' in window) {
      try {
        const directoryHandle = await window.showDirectoryPicker();
        addNotification({
          message: `Folder "${directoryHandle.name}" selected. You can now process its contents.`,
          type: 'success',
          duration: 7000,
        });
        console.log('Directory Handle:', directoryHandle);
        // Example: Log first-level file/folder names
        const entries = [];
        for await (const entry of directoryHandle.values()) {
          entries.push(`${entry.kind}: ${entry.name}`);
        }
        console.log('Selected folder contents (first level):', entries);

      } catch (err: any) {
        let userMessage = 'Error selecting folder.';
        const errorMessage = typeof err.message === 'string' ? err.message.toLowerCase() : '';

        if (err.name === 'AbortError') {
          userMessage = 'Folder selection cancelled.';
           addNotification({ message: userMessage, type: 'info', duration: 4000 });
        } else if (errorMessage.includes('cross origin sub frame') || errorMessage.includes('sandboxed')) {
            userMessage = "Could not select folder. This feature may be restricted when the app is run in certain embedded environments (e.g., a cross-origin iframe). Try running the app in its own browser tab if possible.";
            addNotification({ message: userMessage, type: 'warning', duration: 10000 });
        } else {
          addNotification({ message: userMessage, type: 'error', duration: 8000 });
          console.error('Error selecting folder:', err);
        }
      }
    } else {
      addNotification({
        message: 'Folder selection (Directory Picker API) is not supported by your browser.',
        type: 'error',
        duration: 6000
      });
      console.warn('File System Access API (showDirectoryPicker) not supported.');
    }
  };


  return (
    <div className="text-neutral-100 p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Upload Your Music</h1>

      {message && <div className="mb-4 p-3 bg-green-600/30 border border-green-500 text-green-300 rounded-md text-sm">{message}</div>}
      {error && <div className="mb-4 p-3 bg-red-600/30 border border-red-500 text-red-300 rounded-md text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-800/50 p-6 sm:p-8 rounded-lg shadow-xl">
        {/* Song Details Section */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-300 mb-1">
            Song Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2.5 bg-neutral-700 border border-neutral-600 rounded-md placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="e.g., Midnight Drive"
          />
        </div>

        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-neutral-300 mb-1">
            Artist <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="artist"
            id="artist"
            value={formData.artist}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2.5 bg-neutral-700 border border-neutral-600 rounded-md placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="e.g., Synthwave Surfer"
          />
        </div>

        <div>
          <label htmlFor="album" className="block text-sm font-medium text-neutral-300 mb-1">
            Album (Optional)
          </label>
          <input
            type="text"
            name="album"
            id="album"
            value={formData.album}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 bg-neutral-700 border border-neutral-600 rounded-md placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="e.g., Neon Dreams"
          />
        </div>

        {/* File Uploads Section */}
        <div>
          <label htmlFor="audioFile" className="block text-sm font-medium text-neutral-300 mb-1">
            Audio File <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="audioFile"
            id="audioFile"
            onChange={handleFileChange}
            accept="audio/*"
            required
            className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
          />
           <p className="mt-1 text-xs text-neutral-500">MP3, WAV, OGG, FLAC, etc.</p>
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
              <img src={coverArtPreview} alt="Song cover art preview" className="max-w-xs h-auto max-h-48 rounded-md object-contain border border-neutral-600" />
            </div>
          )}
           <p className="mt-1 text-xs text-neutral-500">JPG, PNG, GIF. Recommended: square, min 300x300px.</p>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-4 rounded-full transition-colors duration-150 text-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-neutral-800 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!formData.title || !formData.artist || !formData.audioFile}
          >
            Upload Song
          </button>
        </div>
      </form>

       {/* Import from Local Folder Section */}
      <div className="mt-10 pt-8 border-t border-neutral-700/60">
        <h2 className="text-xl sm:text-2xl font-semibold text-neutral-100 mb-4 text-center">Import from Local Folder</h2>
        <p className="text-center text-neutral-400 text-sm mb-5 max-w-md mx-auto">
          Grant SPIKETUNE access to a local folder to easily import your existing music library. This uses the File System Access API.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleSelectFolder}
            className="flex items-center justify-center px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-full transition-colors duration-150 text-base focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-neutral-800"
          >
            <FolderIcon className="w-5 h-5 mr-2.5" />
            Select Music Folder
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSongPage;