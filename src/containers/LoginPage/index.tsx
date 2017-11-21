import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import sample from 'lodash/sample';
import classnames from 'classnames';
import DocumentTitle from '../../components/DocumentTitle';
import loginButtonOptions from '../../lang/login';
import * as AuthActions from '../../ducks/Auth';
import Button from '../../components/Button';
import { compose } from 'redux';
import { Input } from '../../Textbox/index';
import styled from 'react-emotion';
import { RootState } from '../../types';

const InputLabel = styled.span`
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props: any) => props.theme.colors.grey_spring};
`;

interface IProps {
  login(username: string, password: string): void;
  location: {
    search: string;
  };
  auth: any;
  history: {
    replace(path: string): void;
  };
}

interface IState {
  loginPhrase: string;
  username: string;
  password: string;
}

class LoginPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      loginPhrase: sample(loginButtonOptions) as string,
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillMount() {
    this.handleCorrectRoute(this.props);
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.handleCorrectRoute(nextProps);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  handleCorrectRoute(props: IProps) {
    if (props.auth.get('auth') !== null) {
      const nextPath = new URLSearchParams(this.props.location.search).get(
        'nextLocation'
      );
      this.props.history.replace(nextPath || '/');
    }
  }

  handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: event.currentTarget.value });
  }

  handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: event.target.value });
  }

  render() {
    const buttonClass = classnames({ loading: this.props.auth.get('loading') });
    return (
      <DocumentTitle title="Login">
        <div>
          {this.props.auth.get('error') ? 'Error!' : ''}
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="usernameInput">
              <InputLabel>Username</InputLabel>
              <Input
                id="usernameInput"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                required
              />
            </label>
            <label htmlFor="passwordInput">
              <InputLabel>Password</InputLabel>
              <Input
                id="passwordInput"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                required
              />
            </label>
            <Button
              className={buttonClass}
              type="submit"
              disabled={this.props.auth.get('loading')}
              text={`${
                this.props.auth.get('loading') ? 'Logging in' : 'Log in'
              } ${this.state.loginPhrase}`}
            />
          </form>
        </div>
      </DocumentTitle>
    );
  }
}

export default compose(
  withRouter,
  connect(
    (state: RootState) => ({
      auth: state.auth,
    }),
    {
      login: AuthActions.login,
    }
  )
)(LoginPage);
