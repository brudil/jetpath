import { MEDIA_LIST_FETCH, MEDIA_UPLOAD } from '../constants/ActionTypes';
import { sequence } from './utils';

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
