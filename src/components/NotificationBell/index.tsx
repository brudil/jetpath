import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUnreadCount } from '../../ducks/Notification';

// eslint-disable-next-line
import bellIcon from 'icons/bell.svg';

import styles from './NotificationBell.css';

interface IProps {
  loadUnreadCount: () => any;
  notification: {
    unreadCount: number;
  };
}

export class NotificationBell extends React.Component<IProps> {
  componentDidMount() {
    this.props.loadUnreadCount();
  }

  render() {
    return (
      <Link to="/notifications">
        <div className={styles.root}>
          <img className={styles.icon} src={bellIcon} role="presentation" />
          <span className={styles.badge}>
            {this.props.notification.unreadCount}
          </span>
        </div>
      </Link>
    );
  }
}

export default connect(
  state => ({
    notification: state.notification,
  }),
  {
    loadUnreadCount,
  }
)(NotificationBell);
