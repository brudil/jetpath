import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from '../components/DocumentTitle';
import { RootState } from '../types';
import { NotificationState, Notification } from '../ducks/Notification';

interface IProps {
  notification: NotificationState;
  notificationsList: Notification[]; // todo
}

class NotificationsPage extends React.Component<IProps> {
  render() {
    return (
      <DocumentTitle title="Works">
        <div>
          <header className="standard-header">
            <h2>Notifications</h2>
          </header>
          <div className="view-container">
            <div className="view-container__content">
              Your notifications!
              <ul>
                {this.props.notificationsList.map(notification => (
                  <li>ID: {notification.id}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect((state: RootState) => ({
  notification: state.notification,
  notificationsList: state.notification.unreadList.map(
    id => state.entities.notifications[id]
  ),
}))(NotificationsPage);
