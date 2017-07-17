import { FETCH_VERTICALS, SET_VERTICAL } from '../constants/ActionTypes';
import { action } from './utils';

export const getVerticals = () => action(FETCH_VERTICALS.REQUEST);
export const getVerticalsSuccess = payload =>
  action(FETCH_VERTICALS.SUCCESS, { payload });
export const setVertical = vertical => action(SET_VERTICAL, { vertical });
