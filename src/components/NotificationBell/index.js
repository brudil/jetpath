import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadUnreadCount } from '../../actions/NotificationActions';

// eslint-disable-next-line
import bellIcon from 'icons/bell.svg';

import styles from './NotificationBell.css';

class NotificationBell extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadUnreadCount());
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

NotificationBell.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
};

export default connect(state => ({
  notification: state.notification,
}))(NotificationBell);
