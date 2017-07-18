import { createRequestTypes } from '../constants/ActionTypes';
import { action as makeAction } from '../actions/utils';

export const AUTH_RESTORE = createRequestTypes('AUTH_RESTORE');
export const AUTH_LOGOUT = createRequestTypes('AUTH_LOGOUT');
export const AUTH_LOGIN = createRequestTypes('AUTH_LOGIN');

export const restoreAuth = () => makeAction(AUTH_RESTORE.REQUEST);
export const restoreAuthFailure = () => makeAction(AUTH_RESTORE.FAILURE);
export const restoreAuthSuccess = payload =>
  makeAction(AUTH_RESTORE.SUCCESS, { payload });

export const logout = () => makeAction(AUTH_LOGOUT.REQUEST);
export const logoutSuccess = () => makeAction(AUTH_LOGOUT.SUCCESS);

export const login = (username, password) =>
  makeAction(AUTH_LOGIN.REQUEST, { username, password });
export const loginSuccess = payload =>
  makeAction(AUTH_LOGIN.SUCCESS, { payload });

const initialState = {
  auth: null,
  loading: false,
  attempted: false,
  error: null,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN.FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case AUTH_LOGIN.SUCCESS:
      return {
        ...state,
        auth: action.payload.data,
      };
    case AUTH_RESTORE.SUCCESS:
      return {
        ...state,
        auth: action.payload.data,
        attempted: true,
      };
    case AUTH_RESTORE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_RESTORE.FAILURE:
      return {
        ...state,
        loading: false,
        attempted: true,
      };
    case AUTH_LOGOUT.SUCCESS:
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
