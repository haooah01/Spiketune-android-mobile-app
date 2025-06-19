
// pages/UpdateProfilePage.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for v6
import { useApp } from '../context/AppContext';
import BackButton from '../components/common/BackButton';
import UserIcon from '../components/icons/UserIcon';
import { UserProfileUpdate } from '../types';
import UploadIcon from '../components/icons/UploadIcon';
import TrashIcon from '../components/icons/TrashIcon';

const UpdateProfilePage: React.FC = () => {
  const { currentUser, updateUserProfile, addNotification, isAuthenticated } = useApp();
  const navigate = useNavigate(); // Changed from useHistory

  const [displayName, setDisplayName] = useState<string>('');
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [removeAvatarFlag, setRemoveAvatarFlag] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      navigate('/login'); // Changed to navigate
    } else {
      setDisplayName(currentUser.displayName || currentUser.email.split('@')[0] || '');
      setAvatarPreview(currentUser.photoURL || null);
    }
  }, [currentUser, isAuthenticated, navigate]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setNewAvatarFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setRemoveAvatarFlag(false);
        setError(null);
      } else {
        setError('Avatar must be an image file (JPG, PNG, GIF, etc.).');
        setNewAvatarFile(null);
      }
    }
  };

  const handleRemoveAvatar = () => {
    setNewAvatarFile(null);
    setAvatarPreview(null);
    setRemoveAvatarFlag(true);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!displayName.trim()) {
      setError('Display name cannot be empty.');
      setIsLoading(false);
      return;
    }

    const updates: UserProfileUpdate = {
      displayName: displayName.trim(),
    };

    if (removeAvatarFlag) {
      updates.removeAvatar = true;
      updates.newAvatarFile = null;
    } else if (newAvatarFile) {
      updates.newAvatarFile = newAvatarFile;
      updates.removeAvatar = false;
    }


    try {
      const result = await updateUserProfile(updates);
      if (result.success) {
        // Notification handled by AppContext
      } else {
        setError(result.message || 'Failed to update profile.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      addNotification({ message: err.message || 'Profile update error.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="text-neutral-100 p-4 sm:p-6 md:p-8 text-center">
        Loading user profile...
      </div>
    );
  }

  return (
    <div className="text-neutral-100 p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <BackButton defaultPath="/" className="mb-6" />
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        Update Your Profile
      </h1>

      {error && <div className="mb-4 p-3 bg-red-600/30 border border-red-500 text-red-300 rounded-md text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-800/60 p-6 sm:p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-neutral-700 shadow-lg" />
            ) : (
              <UserIcon className="w-32 h-32 sm:w-40 sm:h-40 text-neutral-500 p-4 border-4 border-neutral-700 rounded-full bg-neutral-700/50 shadow-lg" />
            )}
            <label
              htmlFor="avatarUpload"
              className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              title="Change avatar"
            >
              <UploadIcon className="w-10 h-10 text-white" />
            </label>
            <input
              type="file"
              id="avatarUpload"
              name="avatarUpload"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
          </div>
          { (currentUser.photoURL || avatarPreview || newAvatarFile) && !removeAvatarFlag && (
             <button
              type="button"
              onClick={handleRemoveAvatar}
              className="flex items-center text-sm text-red-400 hover:text-red-300 transition-colors py-1 px-3 rounded-full hover:bg-red-500/10 focus:outline-none focus:ring-1 focus:ring-red-400"
            >
              <TrashIcon className="w-4 h-4 mr-1.5" />
              Remove Avatar
            </button>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={currentUser.email}
            readOnly
            className="w-full px-4 py-2.5 bg-neutral-700/50 border border-neutral-600 rounded-md text-neutral-400 cursor-not-allowed"
            aria-label="Email (read-only)"
          />
        </div>

        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-neutral-300 mb-1">
            Display Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-neutral-700 border border-neutral-600 rounded-md placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your display name"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-4 rounded-full transition-colors duration-150 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
