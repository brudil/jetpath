import { takeLatest, put, call } from 'redux-saga/effects';
import { AuthorClient } from '../serverAPI';
import getVertical from '../sagas/getVertical';
import { Action, AnyAction } from 'redux';

export const AUTHOR_SUGGESTIONS_REQUEST = 'AUTHOR_SUGGESTIONS_REQUEST';
export const AUTHOR_SUGGESTIONS_FAILURE = 'AUTHOR_SUGGESTIONS_FAILURE';
export const AUTHOR_SUGGESTIONS_SUCCESS = 'AUTHOR_SUGGESTIONS_SUCCESS';

export const AUTHOR_FETCH_REQUEST = 'AUTHOR_FETCH_REQUEST';
export const AUTHOR_FETCH_FAILURE = 'AUTHOR_FETCH_FAILURE';
export const AUTHOR_FETCH_SUCCESS = 'AUTHOR_FETCH_SUCCESS';

export interface Author {
  id: number;
  name: string;
}

export const author = {
  request: (query: string) => ({
    type: AUTHOR_FETCH_REQUEST,
    payload: { query },
  }),
  success: (query: string, payload: any) => ({
    type: AUTHOR_FETCH_SUCCESS,
    payload: { query, payload },
  }),
  failure: (query: string, error: Error) => ({
    type: AUTHOR_FETCH_FAILURE,
    payload: { query, error },
  }),
};

export const requestSuggestions = (term: string) => ({
  type: AUTHOR_SUGGESTIONS_REQUEST,
  payload: { term },
});

// HELPERS
const receiveSuggestions = (term: string, payload: any) => ({
  type: AUTHOR_SUGGESTIONS_SUCCESS,
  payload: { term, ...payload },
});

const initialState = {
  suggestions: [],
};

export interface AuthorsState {
  suggestions: number[];
}

export interface Author {

}

export default function AuthorReducer(state = initialState, action: AnyAction) {
  const { payload } = action;
  switch (action.type) {
    case AUTHOR_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: payload.result,
      };
    default:
      return state;
  }
}

// SAGA

interface SearchAuthorsAction extends Action {
  payload: {
    term: string;
  };
}

function* searchAuthors({ payload: { term } }: SearchAuthorsAction) {
  const vertical = yield getVertical();
  const { payload } = yield call(AuthorClient.search, vertical, term);

  yield put(receiveSuggestions(term, payload));
}

export function* saga() {
  yield takeLatest(AUTHOR_SUGGESTIONS_REQUEST, searchAuthors);
}
