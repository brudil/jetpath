import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as AuthActions from '../../ducks/Auth';
import { RootState } from '../../types';

const Container = styled.div`
  text-align: right;
  font-size: 0.8em;
  opacity: 0.6;
  padding-right: 10px;

  & a {
    color: var(--color__black);
    text-decoration: underline;
  }

  & span {
    vertical-align: middle;
  }
`;

interface IProps {
  logout: any;
  auth: any; // todo
}

class UserMenu extends React.Component<IProps, {}> {
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
      <Container>
        <span>
          <a href="profile">{this.props.auth.get('auth').username}</a>{' '}
        </span>
        <span>
          <a onClick={this.handleLogout} href="/logout" target="_self">
            logout
          </a>
        </span>
      </Container>
    );
  }
}

export default connect(
  (state: RootState) => ({
    auth: state.auth,
  }),
  {
    logout: AuthActions.logout,
  }
)(UserMenu);
