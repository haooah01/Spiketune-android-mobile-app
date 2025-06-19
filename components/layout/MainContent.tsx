
import React from 'react';
import { useLocation } from 'react-router-dom'; // This import is fine for v5

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const location = useLocation(); // Get location object

  return (
    // This component will take up remaining space and allow its content to scroll.
    // The parent div of Sidebar and MainContent uses overflow-hidden, so this needs overflow-y-auto.
    <main className="flex-1 bg-neutral-900 overflow-y-auto">
      {/* Keyed wrapper for page transitions. Animation class applied in global CSS. */}
      <div key={location.pathname} className="page-content-wrapper">
        {/* Content will be directly inside, padding applied by pages if needed or globally here */}
        <div className="p-4 sm:p-6"> {/* Add some padding around content */}
          {children}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
