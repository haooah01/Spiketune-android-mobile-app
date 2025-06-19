
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'; // Updated imports for v6
import { AppProvider } from './context/AppContext';
import SplashScreen from './components/SplashScreen';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import LikedSongsPage from './pages/LikedSongsPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import UploadSongPage from './pages/UploadSongPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PodcastPage from './pages/PodcastPage';
import LyricsPage from './pages/LyricsPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import ArtistDetailPage from './pages/ArtistDetailPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import PodcastCategoryDetailPage from './pages/PodcastCategoryDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <AppProvider>
      <HashRouter>
        <ErrorBoundary> {/* ErrorBoundary can wrap Routes */}
          <Routes>
            {/* Standalone routes first */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Routes that use the main Layout */}
            {/* This Route will match all other paths and render the Layout.
                The Routes inside Layout will handle specific paths. */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  <Route path="/library/liked" element={<LikedSongsPage />} />
                  <Route path="/playlist/create" element={<CreatePlaylistPage />} />
                  <Route path="/upload" element={<UploadSongPage />} />
                  <Route path="/podcasts" element={<PodcastPage />} />
                  <Route path="/lyrics/:trackId" element={<LyricsPage />} />
                  <Route path="/album/:albumId" element={<AlbumDetailPage />} />
                  <Route path="/playlist/:playlistId" element={<PlaylistDetailPage />} />
                  <Route path="/artist/:artistId" element={<ArtistDetailPage />} />
                  <Route path="/profile/edit" element={<UpdateProfilePage />} />
                  <Route path="/category/:categoryId" element={<CategoryDetailPage />} />
                  <Route path="/podcast/category/:podcastCategoryId" element={<PodcastCategoryDetailPage />} />
                  {/* Catch-all for routes inside Layout (must be last in this inner Routes) */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </ErrorBoundary>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
