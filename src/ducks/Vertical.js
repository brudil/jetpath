import find from 'lodash/find';
import { createRequestTypes } from '../constants/ActionTypes';
import { action as makeAction } from '../actions/utils';

export const FETCH_VERTICALS = createRequestTypes('FETCH_VERTICALS');
export const SET_VERTICAL = 'SET_VERTICAL';

export const getVerticals = () => makeAction(FETCH_VERTICALS.REQUEST);
export const getVerticalsSuccess = payload =>
  makeAction(FETCH_VERTICALS.SUCCESS, { payload });
export const setVertical = vertical => makeAction(SET_VERTICAL, { vertical });

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
