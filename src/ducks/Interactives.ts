import { takeLatest, fork } from 'redux-saga/effects';
import {
  action as makeAction,
  createRequestTypes,
  fetchEntity,
} from '../utils';
import { InteractivesClient } from '../serverAPI';
import { Action, AnyAction } from 'redux';

export const LOAD_INTERACTIVES_LIST = 'LOAD_INTERACTIVES_LIST';
export const INTERACTIVES_LIST_FETCH_REQUEST =
  'INTERACTIVES_LIST_FETCH_REQUEST';
export const INTERACTIVES_LIST_FETCH_FAILURE =
  'INTERACTIVES_LIST_FETCH_FAILURE';
export const INTERACTIVES_LIST_FETCH_SUCCESS =
  'INTERACTIVES_LIST_FETCH_SUCCESS';

export const MEDIA_UPLOAD = createRequestTypes('MEDIA_UPLOAD');

export const loadInteractivesList = (query: string, limit: number) => ({
  type: LOAD_INTERACTIVES_LIST,
  query,
  limit,
});

export const interactive = {
  request: (query: string) =>
    makeAction(INTERACTIVES_LIST_FETCH_REQUEST, { query }),
  success: (query: string, payload: any) =>
    makeAction(INTERACTIVES_LIST_FETCH_SUCCESS, { query, payload }),
  failure: (query: string, error: Error) =>
    makeAction(INTERACTIVES_LIST_FETCH_FAILURE, { query, error }),
};

export const fetchInteractivesList = fetchEntity.bind(
  null,
  interactive,
  InteractivesClient.getByFilter
);

const initialState = {
  list: [],
  loading: false,
  count: 0,
  hasNext: false,
  hasPrevious: false,
};

export default function MediaListReducer(
  state = initialState,
  action: AnyAction
) {
  const { payload } = action;

  switch (action.type) {
    case INTERACTIVES_LIST_FETCH_SUCCESS:
      return {
        ...state,
        list: payload.result,
        count: payload.count,
        hasNext: payload.hasNext,
        hasPrevious: payload.hasPrevious,
        loading: false,
      };
    default:
      return state;
  }
}

// SAGA

interface InteractiveLoadAction extends Action {
  query: string;
  limit: number;
}

function* handleLoadInteractivesList(action: InteractiveLoadAction) {
  yield fork(fetchInteractivesList, action.query, action.limit);
}

export function* saga() {
  yield takeLatest(LOAD_INTERACTIVES_LIST, handleLoadInteractivesList);
}
