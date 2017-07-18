import { takeLatest, put } from 'redux-saga/effects';
import { AuthClient } from '../serverAPI';
import { createToast } from '../ducks/Toast';

// CONSTANTS
const AUTH_RESTORE_REQUEST = 'AUTH_RESTORE_REQUEST';
const AUTH_RESTORE_FAILURE = 'AUTH_RESTORE_FAILURE';
const AUTH_RESTORE_SUCCESS = 'AUTH_RESTORE_SUCCESS';

const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST';
const AUTH_LOGOUT_FAILURE = 'AUTH_LOGOUT_FAILURE';
const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';

const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';

// ACTIONS
export const restoreAuth = () => ({
  type: AUTH_RESTORE_REQUEST,
});
export const logout = () => ({
  type: AUTH_LOGOUT_REQUEST,
});
export const login = (username, password) => ({
  type: AUTH_LOGIN_REQUEST,
  payload: { username, password },
});

// HELPERS
const restoreAuthFailure = error => ({
  type: AUTH_RESTORE_FAILURE,
  payload: error,
});
const restoreAuthSuccess = payload => ({ type: AUTH_RESTORE_SUCCESS, payload });
const logoutSuccess = () => ({ type: AUTH_LOGOUT_SUCCESS });
const loginSuccess = payload => ({ type: AUTH_LOGIN_SUCCESS, payload });
const loginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
});

// REDUCER
const initialState = {
  auth: null,
  loading: false,
  attempted: false,
  error: null,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.payload.data,
      };
    case AUTH_RESTORE_SUCCESS:
      return {
        ...state,
        auth: action.payload.data,
        attempted: true,
      };
    case AUTH_RESTORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_RESTORE_FAILURE:
      return {
        ...state,
        loading: false,
        attempted: true,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        attemped: true,
        auth: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}

// SAGAS
function* handleRestoreAuth() {
  const response = yield AuthClient.restore();

  if (response !== null) {
    yield put(restoreAuthSuccess(response));
  } else {
    yield put(restoreAuthFailure(response));
  }
}

function* logoutAuth() {
  AuthClient.logout();
  yield put(logoutSuccess());
}

function* loginAuth({ payload: { username, password } }) {
  try {
    const payload = yield AuthClient.login(username, password);
    yield put(loginSuccess(payload));
    yield put(
      createToast(
        'Welcome back!',
        'Remember, an article a day keeps the rickets away.',
        'message'
      )
    );
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* saga() {
  yield takeLatest(AUTH_RESTORE_REQUEST, handleRestoreAuth);
  yield takeLatest(AUTH_LOGOUT_REQUEST, logoutAuth);
  yield takeLatest(AUTH_LOGIN_REQUEST, loginAuth);
}
