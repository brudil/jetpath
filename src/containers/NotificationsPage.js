import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from '../components/DocumentTitle';
import { getUnread } from '../actions/NotificationActions';

class NotificationsPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(getUnread());
  }

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
                {this.props.notificationsList.map(notification =>
                  <li>
                    ID: {notification.id}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

NotificationsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notificationsList: PropTypes.array.isRequired,
  notification: PropTypes.object.isRequired,
};

export default connect(state => ({
  notification: state.notification,
  notificationsList: state.notification.unreadList.map(
    id => state.entities.notifications[id]
  ),
}))(NotificationsPage);
