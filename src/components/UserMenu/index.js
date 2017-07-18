import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as AuthActions from '../../ducks/Auth';

import styles from './UserMenu.css';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(AuthActions.logout());
  }

  render() {
    if (this.props.auth.auth === null) {
      return null;
    }

    return (
      <div className={styles.root}>
        <span>
          <a href="profile">{this.props.auth.auth.username}</a>{' '}
        </span>
        <span>
          <a href="/logout" target="_self">
            settings
          </a>{' '}
        </span>
        <span>
          <a onClick={this.handleLogout} href="/logout" target="_self">
            logout
          </a>
        </span>
      </div>
    );
  }
}

UserMenu.propTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  auth: state.auth,
}))(UserMenu);
