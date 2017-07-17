import {
  AUTH_RESTORE,
  AUTH_LOGOUT,
  AUTH_LOGIN,
} from '../constants/ActionTypes';
import { action } from './utils';

export const restoreAuth = () => action(AUTH_RESTORE.REQUEST);
export const restoreAuthFailure = () => action(AUTH_RESTORE.FAILURE);
export const restoreAuthSuccess = payload =>
  action(AUTH_RESTORE.SUCCESS, { payload });

export const logout = () => action(AUTH_LOGOUT.REQUEST);
export const logoutSuccess = () => action(AUTH_LOGOUT.SUCCESS);

export const login = (username, password) =>
  action(AUTH_LOGIN.REQUEST, { username, password });
export const loginSuccess = payload => action(AUTH_LOGIN.SUCCESS, { payload });
