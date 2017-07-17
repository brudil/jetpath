import { LOAD_MEDIA_LIST } from '../constants/ActionTypes';
import { action } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const loadMediaList = (vertical, query, limit) =>
  action(LOAD_MEDIA_LIST, { vertical, query, limit });
