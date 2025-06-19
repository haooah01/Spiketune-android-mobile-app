
// components/notifications/NotificationItem.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for v6
import { NotificationItem as NotificationItemData } from '../../types';
import FireIcon from '../icons/FireIcon';
import CloseIcon from '../icons/CloseIcon';

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>;
const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const WarningIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;
const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


interface NotificationItemProps {
  notification: NotificationItemData;
  onClose: (id: string) => void;
}

const ANIMATION_DURATION = 300; 

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // Changed from useHistory

  const handleClose = React.useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(notification.id);
    }, ANIMATION_DURATION);
  }, [notification.id, onClose]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    let timerId: number | undefined;
    if (notification.duration) {
      timerId = window.setTimeout(() => {
        handleClose();
      }, notification.duration);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [notification.duration, handleClose]);


  const typeStyles = useMemo(() => {
    switch (notification.type) {
      case 'trending':
        return {
          icon: <FireIcon className="w-5 h-5 text-purple-400" />,
          accentClass: 'bg-purple-500',
          iconBgClass: 'bg-purple-500/10',
        };
      case 'success':
        return {
          icon: <SuccessIcon className="w-5 h-5 text-green-400" />,
          accentClass: 'bg-green-500',
          iconBgClass: 'bg-green-500/10',
        };
      case 'warning':
        return {
          icon: <WarningIcon className="w-5 h-5 text-yellow-400" />,
          accentClass: 'bg-yellow-500',
          iconBgClass: 'bg-yellow-500/10',
        };
      case 'error':
        return {
          icon: <ErrorIcon className="w-5 h-5 text-red-400" />,
          accentClass: 'bg-red-500',
          iconBgClass: 'bg-red-500/10',
        };
      case 'info':
      default:
        return {
          icon: <InfoIcon className="w-5 h-5 text-blue-400" />,
          accentClass: 'bg-blue-500',
          iconBgClass: 'bg-blue-500/10',
        };
    }
  }, [notification.type]);

  const animationClass = isExiting
    ? 'notification-slide-exit'
    : isVisible
    ? 'notification-slide-enter'
    : 'opacity-0 translate-x-full';

  const handleNotificationClick = () => {
    if (notification.trackId) {
      navigate(`/lyrics/${notification.trackId}`); // Changed to navigate
      handleClose(); 
    }
  };

  const isClickable = !!notification.trackId;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={`relative w-80 sm:w-96 max-w-sm bg-neutral-800 shadow-xl rounded-lg overflow-hidden border border-neutral-700 mb-3 ${animationClass} ${isClickable ? 'cursor-pointer hover:bg-neutral-700/70 transition-colors' : ''}`}
      onClick={isClickable ? handleNotificationClick : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && handleNotificationClick() : undefined}
      tabIndex={isClickable ? 0 : -1}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${typeStyles.accentClass}`}></div>
      <div className="flex items-start p-3 pr-8">
        <div className={`mr-3 flex-shrink-0 p-2 rounded-full ${typeStyles.iconBgClass}`}>
          {typeStyles.icon}
        </div>
        <div className="flex-grow pt-0.5 min-w-0">
          {notification.trackId && notification.title ? (
            <>
              <p className="text-xs text-neutral-400 mb-0.5">{notification.message}</p>
              <p className="text-sm font-semibold text-neutral-100 truncate" title={notification.title}>
                {notification.title}
              </p>
              {notification.artist && (
                <p className="text-xs text-neutral-300 truncate" title={notification.artist}>
                  {notification.artist}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm font-medium text-neutral-100">{notification.message}</p>
          )}
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
        aria-label="Close notification"
        className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 rounded-full transition-colors"
      >
        <CloseIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NotificationItem;
