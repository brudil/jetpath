import { FETCH_TOPICS_FOR_KEYWORD } from '../constants/ActionTypes';

const initialState = {
  keywordMap: {},
  isLoading: true,
};

export default function TopicsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOPICS_FOR_KEYWORD.SUCCESS:
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
