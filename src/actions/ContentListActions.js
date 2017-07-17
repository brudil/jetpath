import {
  CONTENT_LIST_FETCH,
  LOAD_CONTENT_LIST,
} from '../constants/ActionTypes';
import { action } from './utils';

export const loadContent = (vertical, query) =>
  action(LOAD_CONTENT_LIST, { vertical, query });

export const content = {
  request: (vertical, query) =>
    action(CONTENT_LIST_FETCH.REQUEST, { vertical, query }),
  success: (query, payload) =>
    action(CONTENT_LIST_FETCH.SUCCESS, { query, payload }),
  failure: (query, error) =>
    action(CONTENT_LIST_FETCH.FAILURE, { query, error }),
};
