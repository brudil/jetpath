import React from 'react';
import { connect } from 'react-redux';
import * as AuthActions from '../../ducks/Auth';

import styles from './UserMenu.css';

interface IProps {
  logout: () => any,
  auth: any, // todo
}

class UserMenu extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    if (this.props.auth.get('auth') === null) {
      return null;
    }

    return (
      <div className={styles.root}>
        <span>
          <a href="profile">{this.props.auth.get('auth').username}</a>{' '}
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

export default connect(state => ({
  auth: state.auth,
}), {
  logout: AuthActions.logout
})(UserMenu);
