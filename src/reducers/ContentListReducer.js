import { CONTENT_LIST_FETCH } from '../constants/ActionTypes';

const initialState = {
  list: [],
  loading: false,
  count: 0,
  hasNext: false,
  hasPrevious: false,
};

export default function ContentListReducer(state = initialState, action) {
  switch (action.type) {
    case CONTENT_LIST_FETCH.SUCCESS:
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
