import Immutable from 'immutable';
import { sequence } from '../reducers/utils';
import { MediaClient } from '../serverAPI';
import { createTransaction } from '../utils';

// TYPES
const MEDIA_MODAL_SHOW = 'MEDIA_MODAL_SHOW';
const MEDIA_MODAL_CLOSE = 'MEDIA_MODAL_CLOSE';
const MEDIA_MODAL_FETCH = 'MEDIA_MODAL_FETCH';
const MEDIA_MODAL_UPDATE = 'MEDIA_MODAL_UPDATE';
const MEDIA_MODAL_SAVE = 'MEDIA_MODAL_SAVE';

// ACTIONS
export function open() {}

export function save(data) {
  return dispatch => {
    const transaction = createTransaction(dispatch, MEDIA_MODAL_SAVE);

    try {
      const payload = MediaClient.update(data.get('id'), data);
      transaction.done(Immutable.fromJS(payload.data));
    } catch (error) {
      transaction.error(error);
    }
  };
}

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
        data: payload,
        serverData: payload,
      };
    case MEDIA_MODAL_SAVE:
      return sequence(state, action, {
        start() {
          return {
            ...state,
            syncingToServer: true,
            id: null,
          };
        },
        done() {
          return {
            ...state,
            serverData: payload,
            syncingToServer: false,
          };
        },
        error() {
          return {
            ...state,
            error: action.error,
            syncingToServer: false,
          };
        },
      });
    case MEDIA_MODAL_UPDATE:
      return {
        ...state,
        data: state.data.set(payload.key, payload.value),
      };
    default:
      return state;
  }
}
