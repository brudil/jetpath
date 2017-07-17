import AT from '../constants/ActionTypes';
import { sequence } from './utils';

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
    case AT.MEDIA_MODAL_SHOW:
      return {
        ...state,
        id: payload.id,
        data: null,
        serverData: null,
      };
    case AT.MEDIA_MODAL_CLOSE:
      return {
        ...state,
        id: null,
        data: null,
        serverData: null,
      };
    case AT.MEDIA_MODAL_FETCH:
      return {
        ...state,
        data: payload,
        serverData: payload,
      };
    case AT.MEDIA_MODAL_SAVE:
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
    case AT.MEDIA_MODAL_UPDATE:
      return {
        ...state,
        data: state.data.set(payload.key, payload.value),
      };
    default:
      return state;
  }
}
