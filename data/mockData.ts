import { Album, Playlist, Track, SearchCategory, Artist, PodcastCategory } from '../types';

const sampleLyricsVerse = `(Verse 1)
In the glow of the screen, a world unseen
Lines of code, a digital dream
Building futures, byte by byte
In the realm of logic, burning bright

(Chorus)
Oh, SPIKETUNE, let the music flow
Through the circuits, watch the rhythms grow
From a silent thought to a vibrant sound
In this web of tunes, we're homeward bound`;

const sampleLyricsShort = `(Verse)
Digital waves, a melody starts,
SPIKETUNE whispers to our hearts.
Code and chorus, a perfect blend.

(Chorus)
Listen close, the future's near,
Every note dispelling fear.`;

// Updated placeholderImage function to use picsum.photos
const placeholderImage = (seedText: string, width = 300, height = 300) => {
  const seed = encodeURIComponent(seedText.replace(' (Premium)', '').substring(0, 50)); // Limit seed length
  return `https://picsum.photos/seed/${seed}/${width}/${height}`; // Corrected: Added backticks
};

// Helper function to generate placeholder tracks
const generateTracks = (
  albumId: string,
  numTracksToGenerate: number,
  albumTitle: string,
  artistName: string,
  albumCoverArtUrl: string, // Album's cover art
  soundHelixSongIds: number[], // Array of SoundHelix song numbers (1-16) to use
  trackSpecificLyrics?: { trackIndexInGeneration: number; lyrics: string }[], // 0-based index relative to this generation batch
  startingTrackNumberInAlbum: number = 1, // 1-based start for title and ID suffix
  premiumTrackIndices?: number[] // Optional: 0-based indices (within this generation batch) of tracks that are premium
): Track[] => {
  const tracks: Track[] = [];
  const soundHelixBaseUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-';

  for (let i = 0; i < numTracksToGenerate; i++) {
    const songIdIndex = i % soundHelixSongIds.length; // Cycle through provided song IDs
    const trackUrl = `${soundHelixBaseUrl}${soundHelixSongIds[songIdIndex]}.mp3`;
    
    let lyricsContent: string | undefined = undefined;
    if (trackSpecificLyrics) {
        const specificLyricData = trackSpecificLyrics.find(l => l.trackIndexInGeneration === i);
        if (specificLyricData) {
            lyricsContent = specificLyricData.lyrics;
        }
    }
    const currentTrackNumber = startingTrackNumberInAlbum + i;
    const isPremium = premiumTrackIndices ? premiumTrackIndices.includes(i) : false;

    tracks.push({
      id: `${albumId}-track-${currentTrackNumber}`,
      title: `Track ${currentTrackNumber}${isPremium ? ' (Premium)' : ''}`, // Add (Premium) to title for clarity in mock
      artist: artistName,
      album: albumTitle,
      duration: Math.floor(Math.random() * (240 - 180 + 1)) + 180, // 3 to 4 minutes
      url: trackUrl,
      coverArtUrl: albumCoverArtUrl, // Use album's cover art for the track
      lyrics: lyricsContent,
      type: 'track',
      isPremiumOnly: isPremium,
    });
  }
  return tracks;
};

// Define base albums first
const baseAlbums: Album[] = [
  {
    id: 'album-1',
    title: 'Cosmic Echoes',
    artist: 'Galaxy Drifters',
    releaseDate: '2023-03-15',
    coverArtUrl: placeholderImage('Cosmic Echoes Album Art', 300, 300), 
    tracks: generateTracks(
      'album-1', 
      5, 
      'Cosmic Echoes', 
      'Galaxy Drifters',
      placeholderImage('Cosmic Echoes Album Art', 300, 300), // Album cover art
      [1, 2, 3, 4, 5], // SoundHelix song IDs
      [ // Lyrics for specific tracks in this batch
        { trackIndexInGeneration: 0, lyrics: sampleLyricsVerse }, // Track 1
        { trackIndexInGeneration: 1, lyrics: sampleLyricsShort }   // Track 2
      ],
      1, // startingTrackNumberInAlbum
      [1, 3] // Track 2 (index 1) and Track 4 (index 3) are premium
    ),
    type: 'album',
  },
  {
    id: 'album-2',
    title: 'Neon Dreams',
    artist: 'Synthwave Surfer',
    releaseDate: '2023-05-20',
    coverArtUrl: placeholderImage('Neon Dreams Album Art', 300, 300), 
    tracks: generateTracks(
      'album-2',
      4,
      'Neon Dreams',
      'Synthwave Surfer',
      placeholderImage('Neon Dreams Album Art', 300, 300), // Album cover art
      [6, 7, 8, 9], // SoundHelix song IDs
      [
        { trackIndexInGeneration: 0, lyrics: `Synthwave dreams, a neon glow,\nCity lights begin to show.\nCruising down the digital highway,\nLost in the rhythm, come what may.` } // Track 1
      ],
      1,
      [0, 2] // Track 1 (index 0) and Track 3 (index 2) are premium
    ),
    type: 'album',
  },
  {
    id: 'album-3',
    title: 'Acoustic Journeys',
    artist: 'Willow Creek Folk',
    releaseDate: '2023-01-10',
    coverArtUrl: placeholderImage('Acoustic Journeys Album Art', 300, 300), 
    tracks: generateTracks(
      'album-3',
      3,
      'Acoustic Journeys',
      'Willow Creek Folk',
      placeholderImage('Acoustic Journeys Album Art', 300, 300), // Album cover art
      [10, 11, 12], // SoundHelix song IDs
      [
        { trackIndexInGeneration: 0, lyrics: `Willow whispers, gentle breeze,\nStories told among the trees.\nAcoustic strings, a simple tune,\nBeneath the sun, beneath the moon.` } // Track 1
      ],
      1,
      [1] // Track 2 (index 1) is premium
    ),
    type: 'album',
  },
  {
    id: 'album-4',
    title: 'Rhythmic Dimensions',
    artist: 'Beat Alchemist',
    releaseDate: '2023-07-01',
    coverArtUrl: placeholderImage('Rhythmic Dimensions Album Art', 300, 300), 
    tracks: [
        {
            id: 'album-4-track-1',
            title: 'Groove Metropolis',
            artist: 'Beat Alchemist',
            album: 'Rhythmic Dimensions',
            duration: 210,
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', // Valid URL
            coverArtUrl: placeholderImage('Rhythmic Dimensions Album Art', 300, 300), // Use album cover art
            lyrics: "City grooves, bass so deep,\nSecrets that the subways keep.\nNeon lights on concrete walls,\nEchoes answer freedom's calls.",
            type: 'track',
            isPremiumOnly: false,
        },
        ...generateTracks('album-4', 2, 'Rhythmic Dimensions', 'Beat Alchemist', placeholderImage('Rhythmic Dimensions Album Art', 300, 300), [14, 15], undefined, 2, [0]) // Track 2 (index 0 of this batch) is premium
    ],
    type: 'album',
  },
  {
    id: 'album-5',
    title: 'Ocean Lullabies',
    artist: 'Coral Waves',
    releaseDate: '2023-09-05',
    coverArtUrl: placeholderImage('Ocean Lullabies Album Art', 300, 300), 
    tracks: generateTracks(
      'album-5', 
      4, 
      'Ocean Lullabies', 
      'Coral Waves',
      placeholderImage('Ocean Lullabies Album Art', 300, 300), // Album cover art
      [16, 1, 2, 3], // SoundHelix song IDs (16, then reusing 1, 2, 3)
      undefined,
      1,
      [2] // Track 3 (index 2) is premium
    ),
    type: 'album',
  },
  { 
    id: 'album-6',
    title: 'City Lights & Late Nights',
    artist: 'Urban Nocturne',
    releaseDate: '2024-01-20',
    coverArtUrl: placeholderImage('City Lights Album Art', 300, 300), 
    tracks: generateTracks(
      'album-6',
      5,
      'City Lights & Late Nights',
      'Urban Nocturne',
      placeholderImage('City Lights Album Art', 300, 300),
      [4, 5, 6, 7, 8], 
      undefined,
      1,
      [1, 4] 
    ),
    type: 'album',
  },
];

const liveEventAlbum1Cover = placeholderImage('Live Fest 2023 Cover', 300, 300);
const liveEventAlbum2Cover = placeholderImage('Acoustic Live Cover', 300, 300);

const liveEventAlbums: Album[] = [
  {
    id: 'live-event-album-1',
    title: 'SPIKETUNE Fest Live 2023',
    artist: 'Various Artists',
    releaseDate: '2023-12-01',
    coverArtUrl: liveEventAlbum1Cover,
    tracks: [
        {
            ...(baseAlbums[0].tracks[0] || generateTracks('live-event-album-1',1,'SPIKETUNE Fest Live 2023', 'Various Artists', liveEventAlbum1Cover, [4])[0]), 
            title: "Opening Act (Live)", 
            coverArtUrl: liveEventAlbum1Cover, 
            isPremiumOnly: false
        },
        {
            ...(baseAlbums[1].tracks[1] || generateTracks('live-event-album-1',1,'SPIKETUNE Fest Live 2023', 'Various Artists', liveEventAlbum1Cover, [5])[0]), 
            title: "Synth Power (Live) (Premium)", 
            coverArtUrl: liveEventAlbum1Cover, 
            isPremiumOnly: true
        }
    ],
    type: 'album',
  },
  {
    id: 'live-event-album-2',
    title: 'Acoustic Nights (Live)',
    artist: 'Willow Creek Folk & Friends',
    releaseDate: '2023-11-15',
    coverArtUrl: liveEventAlbum2Cover,
    tracks: [
        {
            ...(baseAlbums[2].tracks[0] || generateTracks('live-event-album-2',1,'Acoustic Nights (Live)', 'Willow Creek Folk & Friends', liveEventAlbum2Cover, [6])[0]), 
            title: "Campfire Song (Live)", 
            coverArtUrl: liveEventAlbum2Cover,
            isPremiumOnly: false
        }
    ],
    type: 'album',
  }
];

export const mockAlbums: Album[] = [...baseAlbums, ...liveEventAlbums];


export let mockPlaylists: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'Chill Vibes',
    description: 'Relax and unwind with these calming tunes.',
    coverArtUrl: placeholderImage('Chill Vibes Playlist', 300, 300), 
    tracks: [
        mockAlbums[0].tracks[0], 
        mockAlbums[2].tracks[0], 
        mockAlbums[0].tracks[1], 
        mockAlbums[5].tracks[0], 
    ].filter(Boolean) as Track[], // Ensure no undefined tracks
    createdBy: 'SPIKETUNE Curators',
    type: 'playlist',
  },
  {
    id: 'playlist-2',
    name: 'Workout Beats',
    description: 'High-energy tracks to power your workout.',
    coverArtUrl: placeholderImage('Workout Beats Playlist', 300, 300), 
    tracks: [
        mockAlbums[1].tracks[0], 
        mockAlbums[3].tracks[0], 
        mockAlbums[1].tracks[2]  
    ].filter(Boolean) as Track[],
    createdBy: 'Fitness Gurus',
    type: 'playlist',
  },
  {
    id: 'playlist-3',
    name: 'Focus Flow',
    description: 'Instrumental tracks to help you concentrate.',
    coverArtUrl: placeholderImage('Focus Flow Playlist', 300, 300), 
    tracks: [
        mockAlbums[4].tracks[0], 
        mockAlbums[0].tracks[2], 
        mockAlbums[4].tracks[2], 
    ].filter(Boolean) as Track[],
    createdBy: 'Study AI',
    type: 'playlist',
  },
  { 
    id: 'playlist-4',
    name: 'Indie Coffeehouse',
    description: 'Acoustic melodies and indie gems for your coffee break.',
    coverArtUrl: placeholderImage('Indie Coffeehouse Playlist', 300, 300), 
    tracks: [
        mockAlbums[2].tracks[1], 
        mockAlbums[5].tracks[2], 
        mockAlbums[0].tracks[4], 
    ].filter(Boolean) as Track[],
    createdBy: 'SPIKETUNE Editors',
    type: 'playlist',
  },
];

let allTracksCache: Track[] | null = null;

export const invalidateAllTracksCache = () => {
  allTracksCache = null;
};

export const addPlaylistToMockData = (newPlaylist: Playlist): void => {
  if (!newPlaylist.coverArtUrl && newPlaylist.tracks.length > 0 && newPlaylist.tracks[0]) {
    newPlaylist.coverArtUrl = newPlaylist.tracks[0].coverArtUrl || placeholderImage(newPlaylist.name, 300, 300);
  } else if (!newPlaylist.coverArtUrl) {
    newPlaylist.coverArtUrl = placeholderImage(newPlaylist.name, 300, 300);
  }
  mockPlaylists.push(newPlaylist);
  invalidateAllTracksCache(); 
};

export const mockTrendingItems: (Album | Playlist)[] = [
  { ...(mockAlbums.find(a => a.id === 'album-2') || mockAlbums[1]), title: "This Month's Super Hits", coverArtUrl: placeholderImage("Super Hits Trend", 300, 300) },
  { ...(mockPlaylists.find(p => p.id === 'playlist-1')|| mockPlaylists[0]), name: "Top Trending Now", coverArtUrl: placeholderImage("Trending Now Playlist", 300, 300) },
  { ...(mockAlbums.find(a => a.id === 'album-4') || mockAlbums[3]), title: "Currently Hot", coverArtUrl: placeholderImage("Hot Now Album", 300, 300) },
  { ...(mockPlaylists.find(p => p.id === 'playlist-4') || mockPlaylists[3]), name: "Fresh Indie Finds", coverArtUrl: placeholderImage("Indie Finds Playlist", 300, 300) },
  { ...(mockAlbums.find(a => a.id === 'album-6') || mockAlbums[5]), title: "Night Grooves", coverArtUrl: placeholderImage("Night Grooves Album", 300, 300) },
].filter(item => item !== undefined && item.id !== undefined) as (Album | Playlist)[];


export const mockArtists: Artist[] = [
  { id: 'artist-1', name: 'Galaxy Drifters', coverArtUrl: placeholderImage('Galaxy Drifters Artist', 200, 200), type: 'artist', bio: 'Galaxy Drifters craft ethereal soundscapes that transport listeners to other dimensions. Known for their atmospheric and ambient electronic music.' },
  { id: 'artist-2', name: 'Synthwave Surfer', coverArtUrl: placeholderImage('Synthwave Surfer Artist', 200, 200), type: 'artist', bio: 'Riding the wave of 80s nostalgia, Synthwave Surfer delivers high-energy retro-futuristic tracks perfect for a midnight drive.' },
  { id: 'artist-3', name: 'Willow Creek Folk', coverArtUrl: placeholderImage('Willow Creek Folk Artist', 200, 200), type: 'artist', bio: 'Heartfelt lyrics and acoustic melodies define Willow Creek Folk. Their music is a blend of traditional folk and contemporary storytelling.' },
  { id: 'artist-4', name: 'Beat Alchemist', coverArtUrl: placeholderImage('Beat Alchemist Artist', 200, 200), type: 'artist', bio: 'Master of rhythm and samples, Beat Alchemist cooks up infectious grooves and experimental electronic beats.' },
  { id: 'artist-5', name: 'Coral Waves', coverArtUrl: placeholderImage('Coral Waves Artist', 200, 200), type: 'artist', bio: 'Dive into the soothing and immersive sounds of Coral Waves. Their music is inspired by the ocean and nature.' },
  { id: 'artist-6', name: 'EM XINH', coverArtUrl: placeholderImage('EM XINH Artist', 200, 200), type: 'artist', bio: 'A rising star in the pop scene, EM XINH combines catchy melodies with vibrant productions.' },
  { id: 'artist-7', name: 'J-Hope, GloRilla', coverArtUrl: placeholderImage('J-Hope GloRilla Artist', 200, 200), type: 'artist', bio: 'A dynamic collaboration bringing together unique styles from K-Pop and Hip Hop.' },
  { id: 'artist-8', name: 'Urban Nocturne', coverArtUrl: placeholderImage('Urban Nocturne Artist', 200, 200), type: 'artist', bio: 'Urban Nocturne captures the mood of the city at night with their blend of lo-fi hip hop and jazz-infused instrumentals.' },
];

export const mockSearchCategories: SearchCategory[] = [
  { id: 'cat-pop', name: 'Pop', color: 'bg-pink-600', themeColorName: 'pink', imageUrl: placeholderImage('Pop Category', 100, 100), to: '/category/cat-pop' },
  { id: 'cat-rock', name: 'Rock', color: 'bg-red-600', themeColorName: 'red', imageUrl: placeholderImage('Rock Category', 100, 100), to: '/category/cat-rock' },
  { id: 'cat-hiphop', name: 'Hip Hop', color: 'bg-orange-600', themeColorName: 'orange', imageUrl: placeholderImage('Hip Hop Category', 100, 100), to: '/category/cat-hiphop' },
  { id: 'cat-electronic', name: 'Electronic', color: 'bg-sky-600', themeColorName: 'sky', imageUrl: placeholderImage('Electronic Category', 100, 100), to: '/category/cat-electronic' },
  { id: 'cat-classical', name: 'Classical', color: 'bg-slate-600', themeColorName: 'slate', imageUrl: placeholderImage('Classical Category', 100, 100), to: '/category/cat-classical' },
  { id: 'cat-jazz', name: 'Jazz', color: 'bg-indigo-600', themeColorName: 'indigo', imageUrl: placeholderImage('Jazz Category', 100, 100), to: '/category/cat-jazz' },
  { id: 'cat-country', name: 'Country', color: 'bg-lime-600', themeColorName: 'lime', imageUrl: placeholderImage('Country Category', 100, 100), to: '/category/cat-country' },
  { id: 'cat-alternative', name: 'Alternative', color: 'bg-teal-600', themeColorName: 'teal', imageUrl: placeholderImage('Alternative Category', 100, 100), to: '/category/cat-alternative' },
];

export const mockPodcastCategories: PodcastCategory[] = [
  { id: 'pcat-news', name: 'News & Politics', color: 'bg-blue-700', themeColorName: 'blue', imageUrl: placeholderImage('News Podcast Category', 100, 100), to: '/podcast/category/pcat-news' },
  { id: 'pcat-comedy', name: 'Comedy', color: 'bg-yellow-500', themeColorName: 'orange', imageUrl: placeholderImage('Comedy Podcast Category', 100, 100), to: '/podcast/category/pcat-comedy' }, 
  { id: 'pcat-tech', name: 'Technology', color: 'bg-sky-600', themeColorName: 'sky', imageUrl: placeholderImage('Tech Podcast Category', 100, 100), to: '/podcast/category/pcat-tech' },
  { id: 'pcat-sports', name: 'Sports', color: 'bg-green-600', themeColorName: 'green', imageUrl: placeholderImage('Sports Podcast Category', 100, 100), to: '/podcast/category/pcat-sports' },
  { id: 'pcat-truecrime', name: 'True Crime', color: 'bg-red-700', themeColorName: 'red', imageUrl: placeholderImage('True Crime Podcast Category', 100, 100), to: '/podcast/category/pcat-truecrime' },
  { id: 'pcat-education', name: 'Education', color: 'bg-indigo-500', themeColorName: 'indigo', imageUrl: placeholderImage('Education Podcast Category', 100, 100), to: '/podcast/category/pcat-education' },
  { id: 'pcat-business', name: 'Business', color: 'bg-slate-500', themeColorName: 'slate', imageUrl: placeholderImage('Business Podcast Category', 100, 100), to: '/podcast/category/pcat-business' },
  { id: 'pcat-arts', name: 'Arts & Culture', color: 'bg-rose-500', themeColorName: 'rose', imageUrl: placeholderImage('Arts Podcast Category', 100, 100), to: '/podcast/category/pcat-arts' },
  { id: 'pcat-health', name: 'Health & Fitness', color: 'bg-emerald-500', themeColorName: 'emerald', imageUrl: placeholderImage('Health Podcast Category', 100, 100), to: '/podcast/category/pcat-health' },
  { id: 'pcat-history', name: 'History', color: 'bg-neutral-500', themeColorName: 'neutral', imageUrl: placeholderImage('History Podcast Category', 100, 100), to: '/podcast/category/pcat-history' },
];

export const generatePodcastShows = (
  categoryId: string,
  categoryName: string,
  numShows: number
): Album[] => {
  const shows: Album[] = [];
  for (let i = 1; i <= numShows; i++) {
    const showTitle = `${categoryName} Show ${i}`;
    const showCoverArt = placeholderImage(`${showTitle} Cover Art`, 300, 300);
    shows.push({
      id: `podcast-${categoryId}-show-${i}`,
      title: showTitle,
      artist: `Host of ${categoryName} ${i}`, // Or specific host names
      releaseDate: new Date(Date.now() - i * 1000 * 60 * 60 * 24 * 7).toISOString().split('T')[0], // Released weekly
      coverArtUrl: showCoverArt,
      // For podcasts, "tracks" are episodes. Here they are simplified.
      // A real podcast would have distinct episode URLs, descriptions, etc.
      tracks: generateTracks(
        `podcast-${categoryId}-show-${i}`, // Album ID for these "episodes"
        Math.floor(Math.random() * 5) + 3, // 3-7 episodes
        showTitle,
        `Host of ${categoryName} ${i}`,
        showCoverArt, // Episodes use show's cover art
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].sort(() => 0.5 - Math.random()), // Random soundhelix songs
        undefined,
        1,
        (Math.random() < 0.2) ? [Math.floor(Math.random()*3)] : [] // 20% chance of a premium episode
      ).map(track => ({...track, title: `Episode ${track.id.split('-').pop()}`})),
      type: 'album', // Treat podcast shows like albums for MediaItemCard compatibility
    });
  }
  return shows;
};

export const mockPodcastShows = mockPodcastCategories.reduce((acc, category) => {
  acc[category.id] = generatePodcastShows(category.id, category.name, Math.floor(Math.random() * 5) + 3); // 3-7 shows per category
  return acc;
}, {} as Record<string, Album[]>);


// --- Utility Functions ---

export const getAllTracks = (): Track[] => {
  if (allTracksCache) {
    return allTracksCache;
  }
  const tracks: Track[] = [];
  mockAlbums.forEach(album => tracks.push(...album.tracks));
  // Add tracks from playlists if they are not already in an album (though current structure assumes they are)
  // mockPlaylists.forEach(playlist => {
  //   playlist.tracks.forEach(track => {
  //     if (!tracks.find(t => t.id === track.id)) {
  //       tracks.push(track);
  //     }
  //   });
  // });
  allTracksCache = tracks;
  return tracks;
};

export const getTrackById = (id: string): Track | undefined => {
  return getAllTracks().find(track => track.id === id);
};

export const getAlbumById = (id: string): Album | undefined => {
  return mockAlbums.find(album => album.id === id);
};

export const getArtistById = (id: string): Artist | undefined => {
  return mockArtists.find(artist => artist.id === id);
};

export const getAlbumsByArtistName = (artistName: string): Album[] => {
  return mockAlbums.filter(album => album.artist === artistName);
};

export const getTopTracksByArtistName = (artistName: string, count: number = 5): Track[] => {
  const allArtistTracks = getAllTracks().filter(track => track.artist === artistName);
  // Simple "popularity" sort by ID for mock, or just take first few
  return allArtistTracks.sort((a,b) => a.id.localeCompare(b.id)).slice(0, count);
};


export const getPlaylistById = (id: string): Playlist | undefined => {
  const playlist = mockPlaylists.find(p => p.id === id);
    if (playlist) {
        // Ensure tracks in playlist have correct premium status from source by re-fetching them
        playlist.tracks = playlist.tracks
                            .map(t => getTrackById(t.id)) // Get fresh track data
                            .filter(track => track !== undefined) as Track[];
    }
  return playlist;
};

export const getSearchCategoryById = (id: string): SearchCategory | undefined => {
  return mockSearchCategories.find(category => category.id === id);
};

export const getPodcastCategoryById = (id: string): PodcastCategory | undefined => {
  return mockPodcastCategories.find(category => category.id === id);
};


export const getMockItemsForCategory = (categoryId: string): (Album | Playlist)[] => {
  // This is a simple mock. In a real app, this would be a more complex fetch or filter.
  // For now, return a slice of albums and playlists, maybe shuffled or based on categoryId.
  const category = getSearchCategoryById(categoryId);
  if (!category) return [];

  const numItems = Math.floor(Math.random() * 8) + 5; // 5-12 items

  // Shuffle all albums and playlists together
  const allContentItems = [...mockAlbums, ...mockPlaylists].sort(() => 0.5 - Math.random());
  
  // Try to find items that "match" the category name in a very loose way for variety.
  // This is highly artificial for mock data.
  const relevantItems = allContentItems.filter(item => {
    const title = 'title' in item ? item.title : item.name;
    const artistOrCreator = 'artist' in item ? item.artist : ('createdBy' in item ? item.createdBy : '');
    return title.toLowerCase().includes(category.name.toLowerCase().substring(0,3)) ||
           artistOrCreator.toLowerCase().includes(category.name.toLowerCase().substring(0,3));
  });

  if (relevantItems.length >= numItems) {
    return relevantItems.slice(0, numItems);
  } else {
    // If not enough "relevant" items, fill with other random items
    const remainingNeeded = numItems - relevantItems.length;
    const otherItems = allContentItems.filter(item => !relevantItems.includes(item));
    return [...relevantItems, ...otherItems.slice(0, remainingNeeded)];
  }
};

export const getMockPodcastsForCategory = (podcastCategoryId: string): Album[] => {
  return mockPodcastShows[podcastCategoryId] || [];
};

// Initial population of some library items for demonstration
export const initialLibraryItems = new Map<string, { type: 'album' | 'playlist' | 'track'; dateAdded: number }>();
if (mockAlbums.length > 1 && mockPlaylists.length > 0 && mockAlbums[0].tracks.length > 0) {
  initialLibraryItems.set(mockAlbums[1].id, { type: 'album', dateAdded: Date.now() - 100000 });
  initialLibraryItems.set(mockPlaylists[0].id, { type: 'playlist', dateAdded: Date.now() - 200000 });
  initialLibraryItems.set(mockAlbums[0].tracks[0].id, { type: 'track', dateAdded: Date.now() - 50000 });
}

// Ensure at least some liked songs for demonstration
export const initialLikedSongs = new Set<string>();
if (mockAlbums.length > 0 && mockAlbums[0].tracks.length > 2) {
    initialLikedSongs.add(mockAlbums[0].tracks[0].id);
    initialLikedSongs.add(mockAlbums[0].tracks[2].id);
}
if (mockAlbums.length > 1 && mockAlbums[1].tracks.length > 1) {
    initialLikedSongs.add(mockAlbums[1].tracks[1].id);
}
