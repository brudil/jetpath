import { USER_SUGGESTIONS } from '../constants/ActionTypes';

const initialState = {
  suggestions: [],
};

export default function UserReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case USER_SUGGESTIONS.SUCCESS:
      return {
        ...state,
        suggestions: payload.result,
      };
    default:
      return state;
  }
}
