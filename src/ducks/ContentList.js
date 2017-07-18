import { createRequestTypes } from '../constants/ActionTypes';
import { action as makeAction } from '../actions/utils';

export const CONTENT_LIST_FETCH = createRequestTypes('CONTENT_LIST_FETCH');
export const LOAD_CONTENT_LIST = 'LOAD_CONTENT_LIST';

export const loadContent = (vertical, query) =>
  makeAction(LOAD_CONTENT_LIST, { vertical, query });

export const content = {
  request: (vertical, query) =>
    makeAction(CONTENT_LIST_FETCH.REQUEST, { vertical, query }),
  success: (query, payload) =>
    makeAction(CONTENT_LIST_FETCH.SUCCESS, { query, payload }),
  failure: (query, error) =>
    makeAction(CONTENT_LIST_FETCH.FAILURE, { query, error }),
};

const initialState = {
  list: [],
  loading: false,
  count: 0,
  hasNext: false,
  hasPrevious: false,
};

export default function ContentListReducer(state = initialState, action) {
  switch (action.type) {
    case CONTENT_LIST_FETCH.SUCCESS:
      return {
        ...state,
        list: action.payload.result,
        count: action.payload.count,
        hasNext: action.payload.hasNext,
        hasPrevious: action.payload.hasPrevious,
        loading: false,
      };
    default:
      return state;
  }
}
