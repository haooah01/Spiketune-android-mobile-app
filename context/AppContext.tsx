

import React, { createContext, useState, useContext, ReactNode, useCallback, useRef, useEffect } from 'react';
import { AppContextType, Track, LibraryItemType, LibraryItemInfo, NotificationItem, User, UserProfileUpdate, Album, Playlist, Artist, SearchCategory, PodcastCategory, ActiveCategoryDetail, ActivePodcastCategoryDetail } from '../types';
import {
  mockAlbums,
  mockPlaylists,
  initialLikedSongs,
  initialLibraryItems,
  getAlbumById,
  getPlaylistById,
  getArtistById,
  getTrackById, // Corrected import
  getSearchCategoryById,
  getMockItemsForCategory,
  getPodcastCategoryById,
  getMockPodcastsForCategory,
  getAlbumsByArtistName,
  getTopTracksByArtistName
} from '../data/mockData';

const MOBILE_BREAKPOINT = 768;

const defaultContextValue: AppContextType = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.75,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  playTrack: () => console.warn('playTrack function not yet implemented'),
  togglePlayPause: () => console.warn('togglePlayPause function not yet implemented'),
  setVolume: () => console.warn('setVolume function not yet implemented'),
  toggleMute: () => console.warn('toggleMute function not yet implemented'),
  seekTime: () => console.warn('seekTime function not yet implemented'),
  isPlayerBarVisible: true,
  togglePlayerBarVisibility: () => console.warn('togglePlayerBarVisibility not implemented'),
  likedSongs: new Set<string>(),
  toggleLikeSong: () => console.warn('toggleLikeSong function not yet implemented'),
  libraryItems: new Map<string, LibraryItemInfo>(),
  addToLibrary: () => console.warn('addToLibrary not implemented'),
  removeFromLibrary: () => console.warn('removeFromLibrary not implemented'),
  isItemInLibrary: () => { console.warn('isItemInLibrary not implemented'); return false; },
  toggleLibraryItem: () => console.warn('toggleLibraryItem not implemented'),
  notifications: [],
  addNotification: () => console.warn('addNotification not implemented'),
  removeNotification: () => console.warn('removeNotification not implemented'),
  isPremium: false,
  setIsPremium: () => console.warn('setIsPremium not implemented'),
  showPremiumModal: false,
  setShowPremiumModal: () => console.warn('setShowPremiumModal not implemented'),
  isSidebarOpen: window.innerWidth >= MOBILE_BREAKPOINT,
  toggleSidebar: () => console.warn('toggleSidebar not implemented'),
  setIsSidebarOpen: () => console.warn('setIsSidebarOpen not implemented'),
  isAuthenticated: false,
  currentUser: null,
  loginUser: async () => { console.warn('loginUser not implemented'); return { success: false, message: 'Not implemented' }; },
  signupUser: async () => { console.warn('signupUser not implemented'); return { success: false, message: 'Not implemented' }; },
  logoutUser: () => console.warn('logoutUser not implemented'),
  updateUserProfile: async () => { console.warn('updateUserProfile not implemented'); return { success: false, message: 'Not implemented'}; },
  activeAlbumDetail: undefined,
  activePlaylistDetail: undefined,
  activeArtistDetail: undefined,
  activeTrackForLyrics: undefined,
  activeCategoryDetailData: undefined,
  activePodcastCategoryDetailData: undefined,
  detailPageIsLoading: false,
  loadAlbumDetail: async () => console.warn('loadAlbumDetail not implemented'),
  loadPlaylistDetail: async () => console.warn('loadPlaylistDetail not implemented'),
  loadArtistDetail: async () => console.warn('loadArtistDetail not implemented'),
  loadTrackForLyrics: async () => console.warn('loadTrackForLyrics not implemented'),
  loadCategoryDetail: async () => console.warn('loadCategoryDetail not implemented'),
  loadPodcastCategoryDetail: async () => console.warn('loadPodcastCategoryDetail not implemented'),
  clearActiveDetails: () => console.warn('clearActiveDetails not implemented'),
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const useApp = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(initialLikedSongs);
  const [volume, setVolumeState] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [lastVolumeBeforeMute, setLastVolumeBeforeMute] = useState<number>(0.75);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlayerBarVisible, setIsPlayerBarVisible] = useState<boolean>(true);
  const [libraryItems, setLibraryItems] = useState<Map<string, LibraryItemInfo>>(initialLibraryItems);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isPremium, setIsPremiumState] = useState<boolean>(false);
  const [showPremiumModal, setShowPremiumModalState] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpenState] = useState<boolean>(window.innerWidth >= MOBILE_BREAKPOINT);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeAlbumDetail, setActiveAlbumDetail] = useState<Album | null | undefined>(undefined);
  const [activePlaylistDetail, setActivePlaylistDetail] = useState<Playlist | null | undefined>(undefined);
  const [activeArtistDetail, setActiveArtistDetail] = useState<Artist | null | undefined>(undefined);
  const [activeTrackForLyrics, setActiveTrackForLyrics] = useState<Track | null | undefined>(undefined);
  const [activeCategoryDetailData, setActiveCategoryDetailData] = useState<ActiveCategoryDetail | null | undefined>(undefined);
  const [activePodcastCategoryDetailData, setActivePodcastCategoryDetailData] = useState<ActivePodcastCategoryDetail | null | undefined>(undefined);
  const [detailPageIsLoading, setDetailPageIsLoading] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const notificationTimers = useRef<Map<string, number>>(new Map());

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (notificationTimers.current.has(id)) {
      clearTimeout(notificationTimers.current.get(id)!);
      notificationTimers.current.delete(id);
    }
  }, []);

  const addNotification = useCallback((details: Omit<NotificationItem, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: NotificationItem = { id, ...details };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    if (details.duration) {
      const timerId: number = window.setTimeout(() => removeNotification(id), details.duration);
      notificationTimers.current.set(id, timerId);
    }
  }, [removeNotification]);

  useEffect(() => {
    if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.preload = 'none';
    }
    const audio = audioRef.current;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    const handleError = (e: Event) => {
      const audioEl = e.target as HTMLAudioElement;
      const trackForLogging = currentTrack;
      const trackTitle = trackForLogging?.title || "Unknown Track";
      const errorMsg = `Error playing ${trackTitle}. Code: ${audioEl.error?.code || 'unknown'}`;

      if (audioEl.error) {
        console.error(`Audio Element Error for track "${trackTitle}": Code ${audioEl.error.code}`);
         addNotification({ message: errorMsg, type: 'error' });
      } else {
        const trackUrl = audioEl.currentSrc || trackForLogging?.url || "No URL available";
        console.error(`Audio Error for track "${trackTitle}" (unknown type). URL: ${trackUrl}, Event:`, e);
         addNotification({ message: `An unknown error occurred playing ${trackTitle}.`, type: 'error' });
      }
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      const trackForCanPlay = currentTrack;
      if (isPlaying && audioRef.current && trackForCanPlay && audioRef.current.src === trackForCanPlay.url) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error(`Error playing track "${trackForCanPlay?.title}" on 'canplay' event:`, error);
          });
        }
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      notificationTimers.current.forEach(timer => clearTimeout(timer));
    };
  }, [currentTrack, isPlaying, addNotification]);

   useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack && currentTrack.url && !currentTrack.url.startsWith('placeholder/')) {
      audio.preload = 'metadata';
      if (audio.src !== currentTrack.url) {
        audio.src = currentTrack.url;
        audio.load();
      }
    } else {
      audio.pause();
      if (audio.src !== '') audio.src = '';
      audio.preload = 'none';
      if (!currentTrack || (currentTrack && (!currentTrack.url || currentTrack.url.startsWith('placeholder/')))) {
         setCurrentTime(0);
         setDuration(0);
      }
      if (currentTrack && (!currentTrack.url || currentTrack.url.startsWith('placeholder/'))) {
          console.warn(`Attempted to load track "${currentTrack.title}" with invalid/placeholder URL: ${currentTrack.url}`);
          if (isPlaying) setIsPlaying(false);
      } else if (!currentTrack && isPlaying) {
          setIsPlaying(false);
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack || !currentTrack.url || currentTrack.url.startsWith('placeholder/')) {
      if (isPlaying) setIsPlaying(false);
      return;
    }

    if (isPlaying) {
      if (audio.readyState >= 2) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => console.error(`Error playing track "${currentTrack.title}" in isPlaying effect:`, error));
        }
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) setIsSidebarOpenState(true);
      else setIsSidebarOpenState(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const playTrack = useCallback((track: Track) => {
    if (!track.url || track.url.trim() === '' || track.url.startsWith('placeholder/')) {
      addNotification({ message: `Audio for "${track.title}" is currently unavailable.`, type: 'error', duration: 5000 });
      if (currentTrack?.id === track.id) { setCurrentTrack(null); setIsPlaying(false); }
      return;
    }
    if (track.isPremiumOnly && !isPremium) {
      setShowPremiumModalState(true); return;
    }
    if (currentTrack?.id === track.id) {
      if (audioRef.current) {
        if (!isPlaying) setIsPlaying(true);
        else {
          audioRef.current.currentTime = 0;
          if (audioRef.current.readyState >= 2) audioRef.current.play().catch(e => console.error("Error restarting track:", e));
        }
      }
    } else {
      setCurrentTrack(track); setIsPlaying(true);
    }
  }, [currentTrack, isPlaying, isPremium, addNotification]);

  const togglePlayPause = useCallback(() => {
    if (!currentTrack || !currentTrack.url || currentTrack.url.startsWith('placeholder/')) { setIsPlaying(false); return; }
    if (currentTrack.isPremiumOnly && !isPremium) { setShowPremiumModalState(true); setIsPlaying(false); return; }
    setIsPlaying(prev => !prev);
  }, [currentTrack, isPremium]);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    if (clampedVolume > 0 && isMuted) setIsMuted(false);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prevMuted => {
      const newMutedState = !prevMuted;
      if (newMutedState) setLastVolumeBeforeMute(volume);
      if (!newMutedState && volume === 0) setVolumeState(lastVolumeBeforeMute > 0 ? lastVolumeBeforeMute : 0.5);
      return newMutedState;
    });
  }, [volume, lastVolumeBeforeMute]);

  const seekTime = useCallback((time: number) => {
    if (audioRef.current && currentTrack && Number.isFinite(time)) {
      if (currentTrack.isPremiumOnly && !isPremium) { setShowPremiumModalState(true); return; }
      const newTime = Math.max(0, Math.min(time, audioRef.current.duration || 0));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, [currentTrack, isPremium]);

  const togglePlayerBarVisibility = useCallback(() => setIsPlayerBarVisible(prev => !prev), []);

  const toggleLikeSong = useCallback((trackId: string) => {
    setLikedSongs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) newSet.delete(trackId);
      else newSet.add(trackId);
      return newSet;
    });
  }, []);

  const addToLibrary = useCallback((itemId: string, itemType: LibraryItemType) => {
    setLibraryItems(prev => new Map(prev).set(itemId, { type: itemType, dateAdded: Date.now() }));
  }, []);

  const removeFromLibrary = useCallback((itemId: string) => {
    setLibraryItems(prev => { const n = new Map(prev); n.delete(itemId); return n; });
  }, []);

  const isItemInLibrary = useCallback((itemId: string): boolean => libraryItems.has(itemId), [libraryItems]);

  const toggleLibraryItem = useCallback((itemId: string, itemType: LibraryItemType) => {
    setLibraryItems(prev => {
        const n = new Map(prev);
        if (n.has(itemId)) n.delete(itemId);
        else n.set(itemId, { type: itemType, dateAdded: Date.now() });
        return n;
    });
  }, []);

  const setIsPremium = useCallback((newIsPremium: boolean) => {
    setIsPremiumState(newIsPremium);
    if (newIsPremium) addNotification({ message: "Welcome to SPIKETUNE Premium!", type: "success", duration: 5000 });
  }, [addNotification]);
  const setShowPremiumModal = useCallback((show: boolean) => setShowPremiumModalState(show), []);

  const toggleSidebar = useCallback(() => setIsSidebarOpenState(prev => !prev), []);
  const setIsSidebarOpen = useCallback((isOpen: boolean) => setIsSidebarOpenState(isOpen), []);

  const loginUser = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password123') {
          const user: User = {
            email,
            displayName: 'Demo User',
            photoURL: `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(email)}`
          };
          setIsAuthenticated(true);
          setCurrentUser(user);
          addNotification({ message: `Welcome back, ${user.displayName || user.email}!`, type: 'success', duration: 3000 });
          resolve({ success: true });
        } else {
          addNotification({ message: 'Invalid email or password.', type: 'error', duration: 3000 });
          resolve({ success: false, message: 'Invalid email or password.' });
        }
      }, 1000);
    });
  };

  const signupUser = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const user: User = {
          email,
          displayName: email.split('@')[0],
          photoURL: `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(email)}`
        };
        setIsAuthenticated(true);
        setCurrentUser(user);
        addNotification({ message: `Welcome to SPIKETUNE, ${user.displayName || user.email}!`, type: 'success', duration: 4000 });
        resolve({ success: true });
      }, 1500);
    });
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    addNotification({ message: 'You have been logged out.', type: 'info', duration: 3000 });
  };

  const updateUserProfile = async (updates: UserProfileUpdate): Promise<{ success: boolean; message?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!currentUser) {
          addNotification({ message: 'User not authenticated.', type: 'error' });
          resolve({ success: false, message: 'User not authenticated.' });
          return;
        }

        let updatedPhotoURL = currentUser.photoURL;
        if (updates.newAvatarFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            updatedPhotoURL = reader.result as string;
            const updatedUser: User = {
              ...currentUser,
              displayName: updates.displayName !== undefined ? updates.displayName : currentUser.displayName,
              photoURL: updatedPhotoURL,
            };
            setCurrentUser(updatedUser);
            addNotification({ message: 'Profile updated successfully!', type: 'success' });
            resolve({ success: true });
          };
          reader.onerror = () => {
            addNotification({ message: 'Failed to process avatar.', type: 'error' });
            resolve({ success: false, message: 'Failed to process avatar.' });
          };
          reader.readAsDataURL(updates.newAvatarFile);
        } else {
          if (updates.removeAvatar) {
            updatedPhotoURL = undefined;
          }
          const updatedUser: User = {
            ...currentUser,
            displayName: updates.displayName !== undefined ? updates.displayName : currentUser.displayName,
            photoURL: updatedPhotoURL,
          };
          setCurrentUser(updatedUser);
          addNotification({ message: 'Profile updated successfully!', type: 'success' });
          resolve({ success: true });
        }
      }, 1000);
    });
  };

  const SIMULATED_DELAY = 500;

  const clearActiveDetails = useCallback(() => {
    setActiveAlbumDetail(undefined);
    setActivePlaylistDetail(undefined);
    setActiveArtistDetail(undefined);
    setActiveTrackForLyrics(undefined);
    setActiveCategoryDetailData(undefined);
    setActivePodcastCategoryDetailData(undefined);
    setDetailPageIsLoading(false);
  }, []);

  const loadAlbumDetail = useCallback(async (albumId: string) => {
    setDetailPageIsLoading(true);
    setActiveAlbumDetail(undefined);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    const album = getAlbumById(albumId);
    setActiveAlbumDetail(album || null);
    setDetailPageIsLoading(false);
  }, []);

  const loadPlaylistDetail = useCallback(async (playlistId: string) => {
    setDetailPageIsLoading(true);
    setActivePlaylistDetail(undefined);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    const playlist = getPlaylistById(playlistId);
    setActivePlaylistDetail(playlist || null);
    setDetailPageIsLoading(false);
  }, []);

  const loadArtistDetail = useCallback(async (artistId: string) => {
    setDetailPageIsLoading(true);
    setActiveArtistDetail(undefined);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    const artist = getArtistById(artistId);
    setActiveArtistDetail(artist || null);
    setDetailPageIsLoading(false);
  }, []);

  const loadTrackForLyrics = useCallback(async (trackId: string) => {
    setDetailPageIsLoading(true);
    setActiveTrackForLyrics(undefined);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    const track = getTrackById(trackId); // Corrected from getTrack to getTrackById
    setActiveTrackForLyrics(track || null);
    setDetailPageIsLoading(false);
  }, []);

  const loadCategoryDetail = useCallback(async (categoryId: string) => {
    setDetailPageIsLoading(true);
    setActiveCategoryDetailData(undefined);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    const category = getSearchCategoryById(categoryId);
    if (category) {
      const items = getMockItemsForCategory(categoryId);
      setActiveCategoryDetailData({ category, items });
    } else {
      setActiveCategoryDetailData(null);
    }
    setDetailPageIsLoading(false);
  }, []);

  const loadPodcastCategoryDetail = useCallback(async (podcastCategoryId: string) => {
    setDetailPageIsLoading(true);
    setActivePodcastCategoryDetailData(undefined);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    const category = getPodcastCategoryById(podcastCategoryId);
    if (category) {
      const items = getMockPodcastsForCategory(podcastCategoryId);
      setActivePodcastCategoryDetailData({ category, items });
    } else {
      setActivePodcastCategoryDetailData(null);
    }
    setDetailPageIsLoading(false);
  }, []);

  const contextValue: AppContextType = {
    currentTrack, isPlaying, volume, isMuted, currentTime, duration,
    playTrack, togglePlayPause, setVolume, toggleMute, seekTime,
    isPlayerBarVisible, togglePlayerBarVisibility,
    likedSongs, toggleLikeSong, libraryItems, addToLibrary, removeFromLibrary,
    isItemInLibrary, toggleLibraryItem,
    notifications, addNotification, removeNotification,
    isPremium, setIsPremium, showPremiumModal, setShowPremiumModal,
    isSidebarOpen, toggleSidebar, setIsSidebarOpen,
    isAuthenticated, currentUser, loginUser, signupUser, logoutUser, updateUserProfile,
    activeAlbumDetail, activePlaylistDetail, activeArtistDetail, activeTrackForLyrics,
    activeCategoryDetailData, activePodcastCategoryDetailData, detailPageIsLoading,
    loadAlbumDetail, loadPlaylistDetail, loadArtistDetail, loadTrackForLyrics,
    loadCategoryDetail, loadPodcastCategoryDetail, clearActiveDetails,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};