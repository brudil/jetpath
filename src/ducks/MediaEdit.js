import { call, put, select, takeLatest } from 'redux-saga/effects';
import Immutable from 'immutable';
import { sequence } from '../utils';
import { MediaClient } from '../serverAPI';

// TYPES
const MEDIA_MODAL_SHOW = 'MEDIA_MODAL_SHOW';
const MEDIA_MODAL_CLOSE = 'MEDIA_MODAL_CLOSE';
const MEDIA_MODAL_FETCH = 'MEDIA_MODAL_FETCH';
const MEDIA_MODAL_UPDATE = 'MEDIA_MODAL_UPDATE';
const MEDIA_MODAL_SAVE_REQUEST = 'MEDIA_MODAL_SAVE_REQUEST';
const MEDIA_MODAL_SAVE_FAILURE = 'MEDIA_MODAL_SAVE_FAILURE';
const MEDIA_MODAL_SAVE_SUCCESS = 'MEDIA_MODAL_SAVE_SUCCESS';

// ACTIONS
export const open = id => ({
  type: MEDIA_MODAL_SHOW,
  payload: {
    id,
  },
});

export const save = () => ({ type: MEDIA_MODAL_SAVE_REQUEST });

export function update(key, value) {
  return dispatch => {
    dispatch({
      type: MEDIA_MODAL_UPDATE,
      payload: {
        key,
        value,
      },
    });
  };
}

export function close() {
  return {
    type: MEDIA_MODAL_CLOSE,
  };
}

// REDUCER
const initialState = {
  data: null,
  serverData: null,
  syncingToServer: false,
  id: null,
  error: null,
};

export default function MediaEditModalReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case MEDIA_MODAL_SHOW:
      return {
        ...state,
        id: payload.id,
        data: null,
        serverData: null,
      };
    case MEDIA_MODAL_CLOSE:
      return {
        ...state,
        id: null,
        data: null,
        serverData: null,
      };
    case MEDIA_MODAL_FETCH:
      return {
        ...state,
        data: Immutable.fromJS(payload),
        serverData: Immutable.fromJS(payload),
      };
    case MEDIA_MODAL_SAVE_REQUEST:
      return {
        ...state,
        syncingToServer: true,
        id: null,
      };
    case MEDIA_MODAL_SAVE_FAILURE:
      return {
        ...state,
        error: action.error,
        syncingToServer: false,
      };
    case MEDIA_MODAL_SAVE_SUCCESS:
      return {
        ...state,
        serverData: payload,
        syncingToServer: false,
      };
    case MEDIA_MODAL_UPDATE:
      return {
        ...state,
        data: state.data.setIn(payload.key, payload.value),
      };
    default:
      return state;
  }
}

function* handleLoadMedia(action) {
  try {
    const media = yield call(MediaClient.get, action.payload.id);
    yield put({ type: MEDIA_MODAL_FETCH, payload: media.data });
  } catch (error) {}
}

function* handleSaveMedia() {
  try {
    const dataImmutable = yield select(state => state.mediamodal.data);
    const data = dataImmutable.toJS();
    const payload = yield call(MediaClient.update, data.id, data);
    yield put({
      type: MEDIA_MODAL_SAVE_SUCCESS,
      payload: payload.data,
    });
  } catch (error) {
    yield put({
      type: MEDIA_MODAL_SAVE_FAILURE,
      payload: error,
      error: true,
    });
  }
}

export function* saga() {
  yield takeLatest(MEDIA_MODAL_SHOW, handleLoadMedia);
  yield takeLatest(MEDIA_MODAL_SAVE_REQUEST, handleSaveMedia);
}
