import { call, put, takeEvery } from 'redux-saga/effects';
import { action as makeAction } from '../utils';
import { TopicsClient } from '../serverAPI';
import getVertical from '../sagas/getVertical';
import { Action, AnyAction } from 'redux';

// CONSTANTS
const FETCH_SUGGESTED_TOPICS_REQUEST = 'FETCH_SUGGESTED_TOPICS_REQUEST';
const FETCH_SUGGESTED_TOPICS_FAILURE = 'FETCH_SUGGESTED_TOPICS_FAILURE';
const FETCH_SUGGESTED_TOPICS_SUCCESS = 'FETCH_SUGGESTED_TOPICS_SUCCESS';

const FETCH_TOPICS_FOR_KEYWORD_REQUEST = 'FETCH_TOPICS_FOR_KEYWORD_REQUEST';
const FETCH_TOPICS_FOR_KEYWORD_FAILURE = 'FETCH_TOPICS_FOR_KEYWORD_FAILURE';
const FETCH_TOPICS_FOR_KEYWORD_SUCCESS = 'FETCH_TOPICS_FOR_KEYWORD_SUCCESS';

// ACTIONS
export const getSuggestedTopics = () =>
  makeAction(FETCH_SUGGESTED_TOPICS_REQUEST);

export const getTopicsForKeyword = (keyword: string) =>
  makeAction(FETCH_TOPICS_FOR_KEYWORD_REQUEST, { keyword });

// HELPERS
export const getSuggestedTopicsSuccess = (payload: any) =>
  makeAction(FETCH_SUGGESTED_TOPICS_SUCCESS, { payload });
export const getSuggestedTopicsFailure = () =>
  makeAction(FETCH_SUGGESTED_TOPICS_FAILURE);

export const getTopicsForKeywordSuccess = (payload: any) =>
  makeAction(FETCH_TOPICS_FOR_KEYWORD_SUCCESS, { payload });
export const getTopicsForKeywordFailure = () =>
  makeAction(FETCH_TOPICS_FOR_KEYWORD_FAILURE);

// REDUCER
const initialState = {
  keywordMap: {},
  isLoading: true,
};

export interface TopicsStore {
  keywordMap: {
    [keyword: string]: Object;
  };
  isLoading: boolean;
}

export default function TopicsReducer(
  state: TopicsStore = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case FETCH_TOPICS_FOR_KEYWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        keywordMap: {
          ...state.keywordMap,
          [action.keyword]: action.payload.result,
        },
      };
    default:
      return state;
  }
}

interface FetchTopicsForKeywordAction extends Action {
  keyword: string;
}

// SAGA
function* handleFetchTopicsForKeyword({
  keyword,
}: FetchTopicsForKeywordAction) {
  const vertical = yield getVertical();
  const payload = yield call(TopicsClient.forKeyword, vertical, keyword);
  if (!payload.error) {
    yield put({ type: FETCH_TOPICS_FOR_KEYWORD_SUCCESS, payload, keyword });
  } else {
    yield put({ type: FETCH_TOPICS_FOR_KEYWORD_FAILURE, error: payload.error });
  }
}

export function* saga() {
  yield takeEvery(
    FETCH_TOPICS_FOR_KEYWORD_REQUEST,
    handleFetchTopicsForKeyword
  );
}
