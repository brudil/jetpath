import { takeLatest, takeEvery, put, call, fork } from 'redux-saga/effects';
import {
  sequence,
  action as makeAction,
  createRequestTypes,
  fetchEntity,
} from '../utils';
import getVertical from '../sagas/getVertical';
import { MediaClient } from '../serverAPI';
import { Action, AnyAction } from 'redux';

export const LOAD_MEDIA_LIST = 'LOAD_MEDIA_LIST';
export const MEDIA_LIST_FETCH_REQUEST = 'MEDIA_LIST_FETCH_REQUEST';
export const MEDIA_LIST_FETCH_FAILURE = 'MEDIA_LIST_FETCH_FAILURE';
export const MEDIA_LIST_FETCH_SUCCESS = 'MEDIA_LIST_FETCH_SUCCESS';

export const MEDIA_DELETE_REQUEST = 'MEDIA_DELETE_REQUEST';
export const MEDIA_DELETE_FAILURE = 'MEDIA_DELETE_FAILURE';
export const MEDIA_DELETE_SUCCESS = 'MEDIA_DELETE_SUCCESS';

export const MEDIA_UPLOAD = createRequestTypes('MEDIA_UPLOAD');

export const loadMediaList = (query: string, limit: number) =>
  makeAction(LOAD_MEDIA_LIST, { query, limit });

export const deleteMedia = (id: number) => ({
  type: MEDIA_DELETE_REQUEST,
  payload: { id },
});

export const media = {
  request: (query: string) => makeAction(MEDIA_LIST_FETCH_REQUEST, { query }),
  success: (query: string, payload: any) =>
    makeAction(MEDIA_LIST_FETCH_SUCCESS, { query, payload }),
  failure: (query: string, error: Error) =>
    makeAction(MEDIA_LIST_FETCH_FAILURE, { query, error }),
};

export const upload = {
  // todo
  request: (file: any) => makeAction(MEDIA_UPLOAD.REQUEST, { file }),
  success: (payload: any) => makeAction(MEDIA_UPLOAD.SUCCESS, { payload }),
  failure: (error: any) => makeAction(MEDIA_UPLOAD.FAILURE, { error }),
};

export const fetchMediaList = fetchEntity.bind(
  null,
  media,
  MediaClient.getByFilter
);

const initialState = {
  list: [],
  loading: false,
  count: 0,
  hasNext: false,
  hasPrevious: false,
};

interface MediaListStore {
  list: object[];
  loading: boolean;
  count: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function MediaListReducer(
  state: MediaListStore = initialState,
  action: AnyAction
) {
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
    case MEDIA_DELETE_SUCCESS: {
      return {
        ...state,
        list: state.list.filter(id => id !== payload.id),
      };
    }
    default:
      return state;
  }
}

// SAGA

interface LoadMediaListAction extends Action {
  query: string;
  limit: number;
}

interface UploadMediaAction extends Action {
  file: any; // todo
}

interface MediaDeleteAction extends Action {
  payload: {
    id: number;
  };
}

function* handleLoadMediaList(action: LoadMediaListAction) {
  const vertical = yield getVertical();
  yield fork(fetchMediaList, vertical, action.query, action.limit);
}

function* mediaUpload({ file }: UploadMediaAction) {
  const vertical = yield getVertical();
  const { payload, error } = yield call(MediaClient.upload, vertical, file);

  if (payload) {
    yield put({ type: MEDIA_UPLOAD.SUCCESS, payload });
  } else {
    yield put({ type: MEDIA_UPLOAD.FAILURE, error });
  }
}

function* mediaDelete({ payload: { id } }: MediaDeleteAction) {
  try {
    yield call(MediaClient.delete, id);
    yield put({ type: MEDIA_DELETE_SUCCESS, payload: { id } });
  } catch (error) {
    yield put({
      type: MEDIA_DELETE_FAILURE,
      payload: { id, error },
      error: true,
    });
  }
}

export function* saga() {
  yield takeEvery(MEDIA_DELETE_REQUEST, mediaDelete);
  yield takeEvery(MEDIA_UPLOAD.REQUEST, mediaUpload);
  yield takeLatest(LOAD_MEDIA_LIST, handleLoadMediaList);
}
