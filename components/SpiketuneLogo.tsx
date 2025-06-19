// SpiketuneLogo.tsx
import React from 'react';

interface SpiketuneLogoProps {
  className?: string; // For applying size
}

export const SpiketuneLogo: React.FC<SpiketuneLogoProps> = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 75 50" // Adjusted viewBox for a wider icon shape
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SPIKETUNE Icon"
    >
      <defs>
        <linearGradient id="spiketuneIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          {/* A nice blue gradient similar to the image */}
          <stop offset="0%" stopColor="#60A5FA" /> {/* Tailwind blue-400 */}
          <stop offset="100%" stopColor="#2563EB" /> {/* Tailwind blue-600 */}
        </linearGradient>
      </defs>
      {/* Play triangle */}
      <path d="M10 5 L10 45 L40 25 Z" fill="url(#spiketuneIconGradient)" />
      {/* Spikes (sound wave representation) */}
      <rect x="42" y="15" width="5" height="20" rx="1.5" fill="url(#spiketuneIconGradient)" />
      <rect x="50" y="10" width="5" height="30" rx="1.5" fill="url(#spiketuneIconGradient)" />
      <rect x="58" y="20" width="5" height="10" rx="1.5" fill="url(#spiketuneIconGradient)" />
    </svg>
  );
};