import { takeLatest, put, call } from 'redux-saga/effects';
import { AuthorClient } from '../serverAPI';

export const AUTHOR_SUGGESTIONS_REQUEST = 'AUTHOR_SUGGESTIONS_REQUEST';
export const AUTHOR_SUGGESTIONS_FAILURE = 'AUTHOR_SUGGESTIONS_FAILURE';
export const AUTHOR_SUGGESTIONS_SUCCESS = 'AUTHOR_SUGGESTIONS_SUCCESS';

export const AUTHOR_FETCH_REQUEST = 'AUTHOR_FETCH_REQUEST';
export const AUTHOR_FETCH_FAILURE = 'AUTHOR_FETCH_FAILURE';
export const AUTHOR_FETCH_SUCCESS = 'AUTHOR_FETCH_SUCCESS';

export const author = {
  request: query => ({ type: AUTHOR_FETCH_REQUEST, payload: { query } }),
  success: (query, payload) => ({
    type: AUTHOR_FETCH_SUCCESS,
    payload: { query, payload },
  }),
  failure: (query, error) => ({
    type: AUTHOR_FETCH_FAILURE,
    payload: { query, error },
  }),
};

export const requestSuggestions = term => ({
  type: AUTHOR_SUGGESTIONS_REQUEST,
  payload: { term },
});
export const receiveSuggestions = (term, payload) => ({
  type: AUTHOR_SUGGESTIONS_SUCCESS,
  payload: { term, ...payload },
});

const initialState = {
  suggestions: [],
};

export default function AuthorReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case AUTHOR_SUGGESTIONS_SUCCESS:
      console.log(action);
      return {
        ...state,
        suggestions: payload.result,
      };
    default:
      return state;
  }
}

// SAGA

function* searchAuthors({ payload: { term } }) {
  const { payload } = yield call(AuthorClient.search, term);

  yield put(receiveSuggestions(term, payload));
}

export function* saga() {
  yield takeLatest(AUTHOR_SUGGESTIONS_REQUEST, searchAuthors);
}
