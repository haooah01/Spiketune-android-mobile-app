// components/premium/BecomePremiumModal.tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { SpiketuneLogo } from '../SpiketuneLogo';
import PremiumIcon from '../icons/PremiumIcon'; // Main premium icon for title
import CheckCircleIcon from '../icons/CheckCircleIcon'; // For benefit list
import CloseIcon from '../icons/CloseIcon';

const BecomePremiumModal: React.FC = () => {
  const { setShowPremiumModal, setIsPremium } = useApp();

  const handleUpgrade = () => {
    setIsPremium(true);
    setShowPremiumModal(false);
    // Potentially, navigate to a payment page or show a success message
  };

  const handleClose = () => {
    setShowPremiumModal(false);
  };

  const benefits = [
    "Unlock High-Fidelity Sound: Hear music like never before.",
    "Ad-Free Listening: Enjoy uninterrupted music.",
    "Download Your Favorites: Listen offline, anytime, anywhere.",
    "Access Exclusive Content: Get early access to new releases and premium tracks.",
    "Support Artists Directly: A larger share of your subscription goes to the artists you love.",
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-modal-title"
    >
      <div className="bg-neutral-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg relative border border-neutral-700 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear">
        {/* Standard style tag for animations */}
        <style>
          {`
            @keyframes modal-appear {
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            .animate-modal-appear {
              animation: modal-appear 0.3s forwards;
            }
          `}
        </style>
        
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-full transition-colors"
          aria-label="Close premium dialog"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full mb-3 shadow-lg">
            <PremiumIcon className="w-8 h-8 text-white" />
          </div>
          <h2 id="premium-modal-title" className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Unlock SPIKETUNE Premium
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base">
            Experience music at its best. Upgrade your listening journey.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2.5 mt-0.5 flex-shrink-0" />
              <p className="text-neutral-200 text-sm sm:text-base">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleClose}
            className="w-full px-6 py-3 text-sm font-medium bg-neutral-700 hover:bg-neutral-600 text-neutral-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
          >
            Maybe Later
          </button>
          <button
            onClick={handleUpgrade}
            className="w-full px-6 py-3 text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full transition-all duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-neutral-800"
          >
            Go Premium Now
          </button>
        </div>
        
        <div className="mt-6 text-center">
            <SpiketuneLogo className="h-6 w-auto inline-block text-neutral-500" />
        </div>
      </div>
    </div>
  );
};

export default BecomePremiumModal;