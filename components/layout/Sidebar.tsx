
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Updated imports for v6
import PlusIcon from '../icons/PlusIcon';
import HeartIcon from '../icons/HeartIcon';
import UploadIcon from '../icons/UploadIcon';
import PremiumIcon from '../icons/PremiumIcon';
import ChevronLeftIcon from '../icons/ChevronLeftIcon'; 
import { SpiketuneLogo } from '../SpiketuneLogo'; 
import { useApp } from '../../context/AppContext';

// Placeholder Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

const SearchIconSidebar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const LibraryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
);


const NavItem: React.FC<{ to: string; icon: JSX.Element; label: string; onClick?: () => void; end?: boolean }> = ({ to, icon, label, onClick, end = false }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end={end} // Use end prop for exact matching in v6 if needed
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
        ${isActive
          ? 'text-white bg-neutral-700'
          : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const { setShowPremiumModal, isPremium, isSidebarOpen, setIsSidebarOpen } = useApp();
  const navigate = useNavigate(); // Changed from useHistory

  const handleGoPremiumClick = () => {
    setShowPremiumModal(true);
    if (window.innerWidth < 768) setIsSidebarOpen(false); 
  };

  const closeMobileSidebar = () => {
     if (window.innerWidth < 768) setIsSidebarOpen(false);
  }

  const handleNavigateAndClose = (path: string) => {
    navigate(path); // Changed to navigate
    closeMobileSidebar();
  }

  return (
    <aside
      className={`
        bg-neutral-900 text-neutral-100 flex flex-col border-r border-neutral-800 shadow-lg
        transform transition-transform duration-300 ease-in-out
        md:w-60 md:static md:translate-x-0 md:flex md:h-auto md:z-auto md:shadow-lg md:border-r md:border-neutral-800
        fixed top-0 left-0 h-full w-64 z-50 p-4 space-y-1
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      aria-hidden={!isSidebarOpen && window.innerWidth < 768}
    >
      {/* Mobile Header for Sidebar */}
      <div className="md:hidden flex items-center justify-between mb-4 p-0">
        <NavLink to="/" end onClick={closeMobileSidebar} className="flex items-center"> {/* Added end for root NavLink */}
            <SpiketuneLogo className="h-7 w-auto text-purple-400 mr-2" />
            <span className="text-lg font-semibold text-neutral-100" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                SPIKETUNE
            </span>
        </NavLink>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-full"
          aria-label="Close navigation menu"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-grow">
        <NavItem end to="/" icon={<HomeIcon />} label="Home" onClick={() => handleNavigateAndClose('/')} /> {/* Added end for root NavItem */}
        <NavItem to="/search" icon={<SearchIconSidebar />} label="Search" onClick={() => handleNavigateAndClose('/search')}/>

        <div className="mt-4 pt-4 border-t border-neutral-700/50">
          <h3 className="px-3 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Library
          </h3>
          <NavItem to="/library" icon={<LibraryIcon />} label="Your Library" onClick={() => handleNavigateAndClose('/library')}/>
          <NavItem to="/playlist/create" icon={<PlusIcon />} label="Create Playlist" onClick={() => handleNavigateAndClose('/playlist/create')}/>
          <NavItem to="/library/liked" icon={<HeartIcon />} label="Liked Songs" onClick={() => handleNavigateAndClose('/library/liked')}/>
          <NavItem to="/upload" icon={<UploadIcon />} label="Upload Song" onClick={() => handleNavigateAndClose('/upload')}/>
        </div>
      </nav>

      {!isPremium && (
        <div className="mt-auto pt-4 border-t border-neutral-700/50">
          <button
            onClick={handleGoPremiumClick}
            className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-md transition-colors duration-150 ease-in-out bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-neutral-900"
          >
            <PremiumIcon className="w-5 h-5 mr-2" />
            Go Premium
          </button>
        </div>
      )}
       {isPremium && (
         <div className="mt-auto pt-4 border-t border-neutral-700/50 text-center">
            <div className="flex items-center justify-center px-3 py-2 text-sm text-yellow-400">
                <PremiumIcon className="w-5 h-5 mr-2 text-yellow-400" />
                <span>Premium Member</span>
            </div>
         </div>
       )}
    </aside>
  );
};

export default Sidebar;
