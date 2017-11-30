import { takeLatest, fork } from 'redux-saga/effects';
import { action as makeAction, fetchEntity } from '../utils';
import { WorksClient } from '../serverAPI';
import getVertical from '../sagas/getVertical';
import { Action, AnyAction } from 'redux';

const CONTENT_LIST_FETCH_REQUEST = 'CONTENT_LIST_FETCH_REQUEST';
const CONTENT_LIST_FETCH_FAILURE = 'CONTENT_LIST_FETCH_FAILURE';
const CONTENT_LIST_FETCH_SUCCESS = 'CONTENT_LIST_FETCH_SUCCESS';

const LOAD_CONTENT_LIST = 'LOAD_CONTENT_LIST';

export const loadContent = (query: string) => ({
  // todo
  type: LOAD_CONTENT_LIST,
  payload: { query },
});

interface LoadContentListAction extends Action {
  payload: any; // todo
}

const content = {
  // todo
  request: (query: string) => makeAction(CONTENT_LIST_FETCH_REQUEST, { query }),
  success: (query: string, payload: any) =>
    makeAction(CONTENT_LIST_FETCH_SUCCESS, { query, payload }),
  failure: (query: string, error: Error) =>
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

export interface ContentListState {
  list: number[],
  loading: boolean,
  count: number,
  hasNext: boolean,
  hasPrevious: boolean,
}

export default function ContentListReducer(
  state: ContentListState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case CONTENT_LIST_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
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
function* handleLoadContentList({ payload: { query } }: LoadContentListAction) {
  const vertical = yield getVertical();
  yield fork(fetchContent, vertical, query);
}

export function* saga() {
  yield takeLatest(LOAD_CONTENT_LIST, handleLoadContentList);
}
