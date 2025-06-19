
import React, { useState, useEffect, useRef } from 'react';
import { SpiketuneLogo } from '../SpiketuneLogo';
import { Link, useNavigate } from 'react-router-dom'; // Updated imports for v6
import { useApp } from '../../context/AppContext';
import MenuIcon from '../icons/MenuIcon';
import UserIcon from '../icons/UserIcon';
import GearIcon from '../icons/GearIcon'; 
import UserEditIcon from '../icons/UserEditIcon'; 

// Placeholder Search Icon
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-neutral-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Changed from useHistory
  const { toggleSidebar, isAuthenticated, currentUser, logoutUser } = useApp();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`); // Changed to navigate
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setIsProfileDropdownOpen(false); 
    navigate('/login'); // Changed to navigate
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <header className="h-16 bg-neutral-900/80 backdrop-blur-md shadow-md flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
      {/* Left side: Menu Toggle (mobile) & Logo */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-2 p-2 text-neutral-300 hover:text-white md:hidden focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 rounded-md"
          aria-label="Toggle navigation menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center mr-6">
          <SpiketuneLogo className="h-8 w-auto text-purple-400 mr-2" />
          <h1 className="text-xl font-semibold text-neutral-100 hidden sm:block" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            SPIKETUNE
          </h1>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="block w-full pl-10 pr-3 py-2.5 rounded-full text-sm bg-neutral-800 text-neutral-200 placeholder-neutral-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="What do you want to listen to?"
            aria-label="Search for music, podcasts, artists"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>

      {/* Right side: Auth buttons or User Info & Dropdown */}
      <div className="flex items-center space-x-2">
        {isAuthenticated && currentUser ? (
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-2 p-1 pr-2.5 sm:pr-3 rounded-full hover:bg-neutral-700/70 transition-colors mr-1 sm:mr-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Open user menu"
              aria-expanded={isProfileDropdownOpen}
              aria-haspopup="true"
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="User avatar"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-neutral-600"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ) : null}
              {!currentUser.photoURL && <UserIcon className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-400 p-0.5 border-2 border-neutral-600 rounded-full" />}
              <span className="text-sm text-neutral-200 hidden md:block">
                {currentUser.displayName || currentUser.email}
              </span>
            </button>

            {isProfileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-72 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl py-2 z-30 animate-profile-dropdown"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div className="flex flex-col items-center px-4 pt-3 pb-4 border-b border-neutral-700">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="User avatar" className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-neutral-600" />
                  ) : (
                    <UserIcon className="w-16 h-16 text-neutral-400 p-1 border-2 border-neutral-600 rounded-full mb-2" />
                  )}
                  <p className="text-md font-semibold text-neutral-100">{currentUser.displayName || currentUser.email}</p>
                  <p className="text-xs text-neutral-400">{currentUser.email}</p>
                </div>

                <Link
                  to="/profile/edit"
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="flex items-center px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
                  role="menuitem"
                >
                  <UserEditIcon className="w-5 h-5 mr-3 text-neutral-400" />
                  Update Profile
                </Link>
                <Link
                  to="/settings" // Placeholder, adjust as needed
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="flex items-center px-4 py-2.5 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
                  role="menuitem"
                >
                  <GearIcon className="w-5 h-5 mr-3 text-neutral-400" />
                  Settings
                </Link>
                <div className="border-t border-neutral-700 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-neutral-700 hover:text-red-300 transition-colors"
                  role="menuitem"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
                to="/signup"
                className="px-3 py-2 text-sm font-medium text-neutral-300 hover:text-white rounded-full transition-colors hidden sm:block"
            >
              Sign up
            </Link>
            <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-neutral-100 bg-white hover:bg-neutral-200 text-black rounded-full transition-colors"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
