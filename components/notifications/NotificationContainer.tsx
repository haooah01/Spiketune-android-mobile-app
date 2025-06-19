// components/notifications/NotificationContainer.tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import NotificationItem from './NotificationItem';

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useApp();

  if (!notifications.length) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="false" /* Individual notifications are atomic */
      className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-0" /* space-y-0 because NotificationItem has mb */
    >
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
