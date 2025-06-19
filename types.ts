
export enum PhaseStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  BLOCKED = "Blocked",
}

export interface DevelopmentPhase {
  id: string;
  name: string;
  description: string;
  status: "Pending" | "Completed" | "In Progress"; // Simplified for this display
}

// Future types for music data
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds - this might be derived from audio or kept as metadata
  url: string; // path to audio file
  coverArtUrl?: string; // path to cover image
  lyrics?: string; // Optional: song lyrics
  type?: 'track'; // Optional type discriminator
  isPremiumOnly?: boolean; // Added for premium feature
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  coverArtUrl: string;
  tracks: Track[];
  type?: 'album'; // Optional type discriminator
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverArtUrl?: string;
  tracks: Track[];
  createdBy: string; // User ID or name
  type?: 'playlist'; // Optional type discriminator
}

export interface Artist {
  id: string;
  name: string;
  coverArtUrl: string;
  type: 'artist';
  bio?: string; // Short biography for the artist
}

export interface SearchCategory {
  id: string;
  name: string;
  color: string; // Tailwind background color class e.g., 'bg-pink-600'
  themeColorName?: string; // e.g., 'pink', 'blue', to help select a gradient
  imageUrl: string; // URL for the small image on the card
  to?: string; // Optional path for direct navigation
}

export interface PodcastCategory extends SearchCategory {} // Inherits themeColorName

export type Phase = DevelopmentPhase;

export type LibraryItemType = 'album' | 'playlist' | 'track';

export interface LibraryItemInfo {
  type: LibraryItemType;
  dateAdded: number; // Timestamp of when it was added
}

export interface NotificationItem {
  id:string;
  message: string; // General message, or a category like "Trending Now:"
  type: 'info' | 'success' | 'warning' | 'error' | 'trending';
  duration?: number; // Auto-close duration in ms
  trackId?: string; // Optional: ID of the track if notification is about a song
  title?: string;   // Optional: Song title
  artist?: string;  // Optional: Song artist
}

export interface User {
  email: string;
  displayName?: string;
  photoURL?: string; // Optional URL for user's profile picture
  // Potentially add other user-specific fields like photoURL, preferences, etc.
}

export interface UserProfileUpdate {
  displayName?: string;
  newAvatarFile?: File | null; // For new avatar upload
  removeAvatar?: boolean; // To remove current avatar
}

// Detail page data structures
export interface ActiveCategoryDetail {
  category: SearchCategory | null;
  items: (Album | Playlist)[];
}
export interface ActivePodcastCategoryDetail {
  category: PodcastCategory | null;
  items: Album[]; // Podcast shows are treated as Albums
}


// Global App Context Type
export interface AppContextType {
  // Player State & Controls (ViewModel for Player)
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number; 
  isMuted: boolean;
  currentTime: number; 
  duration: number;    
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seekTime: (time: number) => void; 
  isPlayerBarVisible: boolean;
  togglePlayerBarVisibility: () => void;

  // Library State & Controls (ViewModel for Library)
  likedSongs: Set<string>; 
  toggleLikeSong: (trackId: string) => void;
  libraryItems: Map<string, LibraryItemInfo>; 
  addToLibrary: (itemId: string, itemType: LibraryItemType) => void;
  removeFromLibrary: (itemId: string) => void;
  isItemInLibrary: (itemId: string) => boolean;
  toggleLibraryItem: (itemId: string, itemType: LibraryItemType) => void;

  // Notification State & Controls (ViewModel for Notifications)
  notifications: NotificationItem[];
  addNotification: (details: {
    message: string;
    type: NotificationItem['type'];
    duration?: number;
    trackId?: string;
    title?: string;
    artist?: string;
  }) => void;
  removeNotification: (id: string) => void;

  // Premium Feature State & Controls (ViewModel for Premium Features)
  isPremium: boolean;
  setIsPremium: (isPremium: boolean) => void;
  showPremiumModal: boolean;
  setShowPremiumModal: (show: boolean) => void;

  // Sidebar State & Controls (ViewModel for UI Layout)
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setIsSidebarOpen: (isOpen: boolean) => void;

  // Authentication State & Controls (ViewModel for Authentication)
  isAuthenticated: boolean;
  currentUser: User | null;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signupUser: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logoutUser: () => void;
  updateUserProfile: (updates: UserProfileUpdate) => Promise<{ success: boolean; message?: string }>;

  // Detail Page Data Management (ViewModel for Detail Pages)
  activeAlbumDetail: Album | null | undefined;
  activePlaylistDetail: Playlist | null | undefined;
  activeArtistDetail: Artist | null | undefined;
  activeTrackForLyrics: Track | null | undefined;
  activeCategoryDetailData: ActiveCategoryDetail | null | undefined;
  activePodcastCategoryDetailData: ActivePodcastCategoryDetail | null | undefined;
  detailPageIsLoading: boolean;

  loadAlbumDetail: (albumId: string) => Promise<void>;
  loadPlaylistDetail: (playlistId: string) => Promise<void>;
  loadArtistDetail: (artistId: string) => Promise<void>;
  loadTrackForLyrics: (trackId: string) => Promise<void>;
  loadCategoryDetail: (categoryId: string) => Promise<void>;
  loadPodcastCategoryDetail: (podcastCategoryId: string) => Promise<void>;
  clearActiveDetails: () => void;
}
