import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import sample from 'lodash/sample';
import classnames from 'classnames';
import DocumentTitle from '../../components/DocumentTitle';
import loginButtonOptions from '../../lang/login';
import * as AuthActions from '../../actions/AuthActions';
import Button from '../../components/Button';

import styles from './LoginPage.css';
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
  constructor(x, y) {
    super(x, y);
    this.state = {
      loginPhrase: sample(loginButtonOptions),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.handleCorrectRoute(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleCorrectRoute(nextProps);
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this._username.value;
    const password = this._password.value;
    this.props.dispatch(AuthActions.login(username, password));
  }

  handleCorrectRoute(props) {
    if (props.auth.auth !== null) {
      const nextPath = new URLSearchParams(this.props.location.search).get('nextLocation');
      this.props.history.replace(nextPath || '/');
    }
  }

  render() {
    const buttonClass = classnames({ loading: this.props.auth.loading });
    return (
      <DocumentTitle title="Login">
        <div>
          {this.props.auth.error ? 'Error!' : ''}
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="usernameInput">
              <span className={styles.inputLabel}>Username</span>
              <input
                id="usernameInput"
                className={styles.input}
                type="text"
                ref={el => {
                  this._username = el;
                }}
                placeholder="Username"
                required
              />
            </label>
            <label htmlFor="passwordInput">
              <span className={styles.inputLabel}>Password</span>
              <input
                id="passwordInput"
                className={styles.input}
                type="password"
                ref={el => {
                  this._password = el;
                }}
                placeholder="Password"
                required
              />
            </label>
            <Button
              className={buttonClass}
              type="submit"
              disabled={this.props.auth.loading}
              text={`${this.props.auth.loading ? 'Logging in' : 'Log in'} ${this
                .state.loginPhrase}`}
            />
          </form>
        </div>
      </DocumentTitle>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default withRouter(
  connect(state => ({
    auth: state.auth,
  }))(LoginPage)
);
