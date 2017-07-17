import find from 'lodash/find';
import { FETCH_VERTICALS, SET_VERTICAL } from '../constants/ActionTypes';

const initialState = {
  list: [],
  isLoading: true,
  selectedVertical: null,
  selectedVerticalIdentifier: null,
};

export default function VerticalReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VERTICALS.SUCCESS: {
      const found =
        find(action.payload, {
          identifier: state.selectedVerticalIdentifier,
        }) || null;
      return {
        ...state,
        isLoading: false,
        list: action.payload,
        selectedVertical: found,
      };
    }
    case SET_VERTICAL: {
      const found = find(state.list, { identifier: action.vertical }) || null;
      return {
        ...state,
        selectedVerticalIdentifier: action.vertical,
        selectedVertical: found,
      };
    }
    default:
      return state;
  }
}
