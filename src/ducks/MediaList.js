import { takeLatest, takeEvery, put, call, fork } from 'redux-saga/effects';
import { sequence, action as makeAction, createRequestTypes } from '../utils';
import { fetchMediaList } from '../sagas/index';
import getVertical from '../sagas/getVertical';
import { MediaClient } from '../serverAPI';

export const LOAD_MEDIA_LIST = 'LOAD_MEDIA_LIST';
export const MEDIA_LIST_FETCH_REQUEST = 'MEDIA_LIST_FETCH_REQUEST';
export const MEDIA_LIST_FETCH_FAILURE = 'MEDIA_LIST_FETCH_FAILURE';
export const MEDIA_LIST_FETCH_SUCCESS = 'MEDIA_LIST_FETCH_SUCCESS';
export const MEDIA_UPLOAD = createRequestTypes('MEDIA_UPLOAD');

export const loadMediaList = (vertical, query, limit) =>
  makeAction(LOAD_MEDIA_LIST, { vertical, query, limit });
export const media = {
  request: query => makeAction(MEDIA_LIST_FETCH_REQUEST, { query }),
  success: (query, payload) =>
    makeAction(MEDIA_LIST_FETCH_SUCCESS, { query, payload }),
  failure: (query, error) =>
    makeAction(MEDIA_LIST_FETCH_FAILURE, { query, error }),
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
    case MEDIA_LIST_FETCH_SUCCESS:
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

// SAGA

function* handleLoadMediaList(action) {
  yield fork(fetchMediaList, action.vertical, action.query, action.limit);
}

function* mediaUpload({ file }) {
  const vertical = yield getVertical();
  const { payload, error } = yield call(MediaClient.upload, vertical, file);

  if (payload) {
    yield put({ type: MEDIA_UPLOAD.SUCCESS, payload });
  } else {
    yield put({ type: MEDIA_UPLOAD.FAILURE, error });
  }
}

export function* saga() {
  yield takeEvery(MEDIA_UPLOAD.REQUEST, mediaUpload);
  yield takeLatest(LOAD_MEDIA_LIST, handleLoadMediaList);
}
