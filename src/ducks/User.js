import { createRequestTypes } from '../constants/ActionTypes';
import { action as makeAction } from '../actions/utils';

export const USER_SUGGESTIONS = createRequestTypes('USER_SUGGESTIONS');
export const USER_FETCH = createRequestTypes('USER_FETCH');

export const user = {
  request: query => makeAction(USER_FETCH.REQUEST, { query }),
  success: (query, payload) => makeAction(USER_FETCH.SUCCESS, { query, payload }),
  failure: (query, error) => makeAction(USER_FETCH.FAILURE, { query, error }),
};

export const requestSuggestions = term =>
  makeAction(USER_SUGGESTIONS.REQUEST, { term });
export const receiveSuggestions = (term, payload) =>
  makeAction(USER_SUGGESTIONS.SUCCESS, { term, payload });


const initialState = {
  suggestions: [],
};

export default function UserReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case USER_SUGGESTIONS.SUCCESS:
      return {
        ...state,
        suggestions: payload.result,
      };
    default:
      return state;
  }
}
