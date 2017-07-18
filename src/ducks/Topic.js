import { call, put, takeEvery } from 'redux-saga/effects';
import { action as makeAction } from '../actions/utils';
import { TopicsClient } from '../serverAPI';
import getVertical from '../sagas/getVertical';

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

export const getTopicsForKeyword = keyword =>
  makeAction(FETCH_TOPICS_FOR_KEYWORD_REQUEST, { keyword });

// HELPERS
export const getSuggestedTopicsSuccess = payload =>
  makeAction(FETCH_SUGGESTED_TOPICS_SUCCESS, { payload });
export const getSuggestedTopicsFailure = () =>
  makeAction(FETCH_SUGGESTED_TOPICS_FAILURE);

export const getTopicsForKeywordSuccess = payload =>
  makeAction(FETCH_TOPICS_FOR_KEYWORD_SUCCESS, { payload });
export const getTopicsForKeywordFailure = () =>
  makeAction(FETCH_TOPICS_FOR_KEYWORD_FAILURE);

// REDUCER
const initialState = {
  keywordMap: {},
  isLoading: true,
};

export default function TopicsReducer(state = initialState, action) {
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

// SAGA
function* handleFetchTopicsForKeyword({ keyword }) {
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
