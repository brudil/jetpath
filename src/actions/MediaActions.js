import { MEDIA_LIST_FETCH, MEDIA_UPLOAD } from '../constants/ActionTypes';
import { action } from './utils';

export const media = {
  request: query => action(MEDIA_LIST_FETCH.REQUEST, { query }),
  success: (query, payload) =>
    action(MEDIA_LIST_FETCH.SUCCESS, { query, payload }),
  failure: (query, error) => action(MEDIA_LIST_FETCH.FAILURE, { query, error }),
};

export const upload = {
  request: file => action(MEDIA_UPLOAD.REQUEST, { file }),
  success: payload => action(MEDIA_UPLOAD.SUCCESS, { payload }),
  failure: error => action(MEDIA_UPLOAD.FAILURE, { error }),
};
