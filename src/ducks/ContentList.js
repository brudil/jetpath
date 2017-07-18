import { takeLatest, fork } from 'redux-saga/effects';
import { action as makeAction, fetchEntity } from '../utils';
import { WorksClient } from '../serverAPI';
import getVertical from "../sagas/getVertical";

const CONTENT_LIST_FETCH_REQUEST = 'CONTENT_LIST_FETCH_REQUEST';
const CONTENT_LIST_FETCH_FAILURE = 'CONTENT_LIST_FETCH_FAILURE';
const CONTENT_LIST_FETCH_SUCCESS = 'CONTENT_LIST_FETCH_SUCCESS';

const LOAD_CONTENT_LIST = 'LOAD_CONTENT_LIST';

export const loadContent = query => ({
  type: LOAD_CONTENT_LIST,
  payload: { query },
});

const content = {
  request: query => makeAction(CONTENT_LIST_FETCH_REQUEST, { query }),
  success: (query, payload) =>
    makeAction(CONTENT_LIST_FETCH_SUCCESS, { query, payload }),
  failure: (query, error) =>
    makeAction(CONTENT_LIST_FETCH_FAILURE, { query, error }),
};

const fetchContent = fetchEntity.bind(
  null,
  content,
  WorksClient.getByFilterForVertical
);

const initialState = {
  list: [],
  loading: false,
  count: 0,
  hasNext: false,
  hasPrevious: false,
};

export default function ContentListReducer(state = initialState, action) {
  switch (action.type) {
    case CONTENT_LIST_FETCH_REQUEST:
      return {
        ...state,
        list: [],
      };
    case CONTENT_LIST_FETCH_SUCCESS:
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

// SAGAS
function* handleLoadContentList({ payload: { query } }) {
  const vertical = yield getVertical();
  yield fork(fetchContent, vertical, query);
}

export function* saga() {
  yield takeLatest(LOAD_CONTENT_LIST, handleLoadContentList);
}
