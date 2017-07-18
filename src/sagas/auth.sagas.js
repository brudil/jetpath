import { spawn, take, put } from 'redux-saga/effects';
import { AuthClient } from '../serverAPI';
import {
  AUTH_RESTORE,
  AUTH_LOGOUT,
  AUTH_LOGIN,
  restoreAuthSuccess,
  restoreAuthFailure,
  logoutSuccess,
  loginSuccess,
} from '../ducks/Auth';
import { createToast } from '../ducks/Toast';

function* restoreAuth() {
  while (true) {
    // eslint-disable-line no-constant-condition
    yield take(AUTH_RESTORE.REQUEST);
    const response = yield AuthClient.restore();

    if (response !== null) {
      yield put(restoreAuthSuccess(response));
    } else {
      yield put(restoreAuthFailure(response));
    }
  }
}

function* logoutAuth() {
  while (true) {
    // eslint-disable-line no-constant-condition
    yield take(AUTH_LOGOUT.REQUEST);
    AuthClient.logout();
    yield put(logoutSuccess());
  }
}

function* loginAuth() {
  while (true) {
    // eslint-disable-line no-constant-condition
    const { username, password } = yield take(AUTH_LOGIN.REQUEST);
    const payload = yield AuthClient.login(username, password);
    yield put(loginSuccess(payload));
    yield put(
      createToast(
        'Welcome back!',
        'Remember, an article a day keeps the rickets away.',
        'message'
      )
    );
  }
}

export default [spawn(restoreAuth), spawn(logoutAuth), spawn(loginAuth)];
