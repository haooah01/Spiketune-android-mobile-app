
// components/icons/PodcastIcon.tsx
import React from 'react';

const PodcastIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 mr-3" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    {/* Corrected path data: removed underscores and ensured proper spacing */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5h.008v.008H12v-.008zm0 0 H12 m0-6a6 6 0 00-6 6v1.5m6-7.5 H5.25A2.25 2.25 0 003 11.25v1.5c0 .621.504 1.125 1.125 1.125 H5.25m6-7.5V6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6 H8.25 A2.25 2.25 0 006 8.25v7.5A2.25 2.25 0 008.25 18h7.5A2.25 2.25 0 0018 15.75v-7.5A2.25 2.25 0 0015.75 6z" />
  </svg>
);

export default PodcastIcon;
