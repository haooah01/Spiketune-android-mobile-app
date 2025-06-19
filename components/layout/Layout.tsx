import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import BottomPlayerBar from './BottomPlayerBar';
import Sidebar from './Sidebar.tsx'; // Import Sidebar with .tsx extension
import NotificationContainer from '../notifications/NotificationContainer'; // Import NotificationContainer
import BecomePremiumModal from '../premium/BecomePremiumModal'; // Import Premium Modal
import ShowPlayerButton from './ShowPlayerButton'; // Import ShowPlayerButton
import { useApp } from '../../context/AppContext'; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { showPremiumModal, isPlayerBarVisible, isSidebarOpen, setIsSidebarOpen } = useApp(); 

  return (
    <div className="h-screen flex flex-col bg-neutral-900">
      <Header />
      <div className="flex flex-1 overflow-hidden relative"> {/* Added relative for backdrop positioning */}
        {/* Sidebar */}
        <Sidebar />

        {/* Backdrop for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true" 
          ></div>
        )}
        
        {/* Main Content */}
        <MainContent>{children}</MainContent>
      </div>
      
      {/* Conditionally render BottomPlayerBar or ShowPlayerButton */}
      {isPlayerBarVisible ? (
        <BottomPlayerBar />
      ) : (
        <ShowPlayerButton />
      )}
      
      <NotificationContainer /> {/* Add NotificationContainer here */}
      {showPremiumModal && <BecomePremiumModal />} {/* Conditionally render Premium Modal */}
    </div>
  );
};

export default Layout;