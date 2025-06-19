
import React from 'react';
import { SpiketuneLogo } from './SpiketuneLogo';

const SplashScreen: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes logoBloom {
            0% { transform: scale(0.8) translateY(10px); opacity: 0; }
            60% { transform: scale(1.05) translateY(0); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          @keyframes textFadeInUp {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes loadingBarFill {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animation-delay-300ms { animation-delay: 300ms; }
          .animation-delay-600ms { animation-delay: 600ms; }
          .animate-fade-in-splash { animation: fadeIn 0.5s ease-out forwards; }
          .animate-logo-bloom { animation: logoBloom 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms forwards; }
          .animate-text-fade-in-up { animation: textFadeInUp 0.8s ease-out forwards; }
          .animate-loading-bar-fill { animation: loadingBarFill 2.3s linear forwards; }

          .logo-glow {
            filter: drop-shadow(0 0 15px rgba(96, 165, 250, 0.5)) drop-shadow(0 0 30px rgba(129, 140, 248, 0.3));
          }
        `}
      </style>
      <div 
        className="flex flex-col h-screen w-screen bg-gradient-to-b from-neutral-900 to-black items-center justify-center p-4 text-center select-none overflow-hidden animate-fade-in-splash"
      >
        {/* Main Content (Logo, Name, Slogan) */}
        <div className="flex flex-col items-center mb-20"> {/* Added mb for spacing from loading bar */}
          {/* Logo with Bloom Animation and Glow */}
          <div className="relative mb-6 sm:mb-8 animate-logo-bloom">
            <SpiketuneLogo className="w-28 h-[74px] sm:w-36 sm:h-[96px] md:w-40 md:h-[106px] logo-glow" />
          </div>

          {/* App Name */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-300 opacity-0 animate-text-fade-in-up animation-delay-300ms"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            SPIKETUNE
          </h1>

          {/* Slogan */}
          <p 
            className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-neutral-400 tracking-wide opacity-0 animate-text-fade-in-up animation-delay-600ms"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            YOUR SOUNDTRACK, YOUR STORY
          </p>
        </div>

        {/* Loading Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-neutral-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-loading-bar-fill"></div>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;
      