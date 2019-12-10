import React, { useCallback } from 'react';
import { RootState } from '../types';
import Helmet from 'react-helmet';
import { useMappedState } from 'redux-react-hook';

const NotificationsPage: React.FC = () => {
  const mappedState = useCallback((state: RootState) => ({
    notification: state.notification,
    notificationsList: state.notification.unreadList.map(
      id => state.entities.notifications[id]
    ),
  }), []);

  const { notificationsList } = useMappedState(mappedState);
    return (
      <div>
        <Helmet>
          <title>Works</title>
        </Helmet>

        <header className="standard-header">
          <h2>Notifications</h2>
        </header>
        <div className="view-container">
          <div className="view-container__content">
            Your notifications!
            <ul>
              {notificationsList.map(notification => (
                <li>ID: {notification.id}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
}

export default NotificationsPage;
