import { USER_SUGGESTIONS, USER_FETCH } from '../constants/ActionTypes';
import { action } from './utils';

export const user = {
  request: query => action(USER_FETCH.REQUEST, { query }),
  success: (query, payload) => action(USER_FETCH.SUCCESS, { query, payload }),
  failure: (query, error) => action(USER_FETCH.FAILURE, { query, error }),
};

export const requestSuggestions = term =>
  action(USER_SUGGESTIONS.REQUEST, { term });
export const receiveSuggestions = (term, payload) =>
  action(USER_SUGGESTIONS.SUCCESS, { term, payload });
