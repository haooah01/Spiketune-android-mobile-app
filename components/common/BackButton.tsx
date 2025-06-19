
// components/common/BackButton.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Updated import for v6

const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

interface BackButtonProps {
  className?: string;
  text?: string;
  defaultPath?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  className = "mb-6 inline-flex items-center text-sm text-purple-300 hover:text-purple-200 transition-colors focus:outline-none group bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full",
  text = "Back",
  defaultPath = "/"
}) => {
  const navigate = useNavigate(); // Changed from useHistory
  const location = useLocation();

  const handleBack = () => {
    // Check if there's a page to go back to in the current session history by looking at the key.
    // 'default' is the key for the first entry in the history stack.
    if (location.key !== 'default') { 
      navigate(-1); // Go back one step
    } else {
      navigate(defaultPath); // Navigate to default path if no history to go back to
    }
  };

  return (
    <button
      onClick={handleBack}
      className={className}
      aria-label={text === "Back" ? "Go back" : `Go back to ${text.toLowerCase()}`}
    >
      <BackArrowIcon />
      <span className="ml-2 group-hover:underline">{text}</span>
    </button>
  );
};

export default BackButton;
