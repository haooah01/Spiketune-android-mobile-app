
// pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // This import is fine for v5
import { SpiketuneLogo } from '../components/SpiketuneLogo';
import StyledZeroIcon from '../components/icons/StyledZeroIcon';

// Simple Back Arrow Icon
const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-neutral-100 p-6 sm:p-8 text-center bg-neutral-900 min-h-[calc(100vh-var(--header-height,64px)-var(--player-height,80px))]">
      <div className="mb-6 sm:mb-8">
        <SpiketuneLogo className="w-20 h-auto sm:w-24 text-purple-500" />
      </div>

      <div className="flex items-center justify-center mb-2 sm:mb-3">
        <span
            className="text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
            4
        </span>
        <StyledZeroIcon className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 mx-2 sm:mx-3 border-[3px] sm:border-4" />
        <span
            className="text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tighter"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
            4
        </span>
      </div>

      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-100 mb-3 sm:mb-4"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Page Not Found
      </h2>
      <p className="text-neutral-400 text-sm sm:text-base mb-8 max-w-md leading-relaxed">
        Oops! The page you're looking for doesn't seem to exist. It might have been moved, deleted, or maybe you just mistyped the URL.
      </p>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-xs sm:max-w-sm">
        <Link
          to="/"
          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition-colors duration-150 flex items-center justify-center shadow-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          Go to Homepage
        </Link>
        <button
          onClick={() => window.history.back()}
          className="w-full px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-full transition-colors duration-150 flex items-center justify-center shadow-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          <BackArrowIcon />
          <span className="ml-2">Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
