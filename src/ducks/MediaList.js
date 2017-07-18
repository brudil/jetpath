import { sequence } from '../reducers/utils';
import { createRequestTypes } from '../constants/ActionTypes';
import { action as makeAction } from '../actions/utils';

export const LOAD_MEDIA_LIST = 'LOAD_MEDIA_LIST';
export const MEDIA_LIST_FETCH = createRequestTypes('MEDIA_LIST_FETCH');
export const MEDIA_UPLOAD = createRequestTypes('MEDIA_UPLOAD');

export const loadMediaList = (vertical, query, limit) =>
  makeAction(LOAD_MEDIA_LIST, { vertical, query, limit });
export const media = {
  request: query => makeAction(MEDIA_LIST_FETCH.REQUEST, { query }),
  success: (query, payload) =>
    makeAction(MEDIA_LIST_FETCH.SUCCESS, { query, payload }),
  failure: (query, error) =>
    makeAction(MEDIA_LIST_FETCH.FAILURE, { query, error }),
};

export const upload = {
  request: file => makeAction(MEDIA_UPLOAD.REQUEST, { file }),
  success: payload => makeAction(MEDIA_UPLOAD.SUCCESS, { payload }),
  failure: error => makeAction(MEDIA_UPLOAD.FAILURE, { error }),
};

const initialState = {
  list: [],
  loading: false,
  count: 0,
  hasNext: false,
  hasPrevious: false,
};

export default function MediaListReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case MEDIA_LIST_FETCH.SUCCESS:
      return {
        ...state,
        list: payload.result,
        count: payload.count,
        hasNext: payload.hasNext,
        hasPrevious: payload.hasPrevious,
        loading: false,
      };
    case MEDIA_UPLOAD.SUCCESS:
      return {
        ...state,
        list: [payload.result, ...state.list],
      };
    case MEDIA_UPLOAD:
      return sequence(state, action, {
        done() {
          const list = state.list.slice(0);
          list.unshift(action.payload.result);

          return {
            ...state,
            list,
          };
        },
      });
    default:
      return state;
  }
}
