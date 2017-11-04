import { takeLatest, put, call } from 'redux-saga/effects';
import { UserClient } from '../serverAPI';

export const USER_SUGGESTIONS_REQUEST = 'USER_SUGGESTIONS_REQUEST';
export const USER_SUGGESTIONS_FAILURE = 'USER_SUGGESTIONS_FAILURE';
export const USER_SUGGESTIONS_SUCCESS = 'USER_SUGGESTIONS_SUCCESS';

export const USER_FETCH_REQUEST = 'USER_FETCH_REQUEST';
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';

export const user = {
  request: query => ({ type: USER_FETCH_REQUEST, payload: { query } }),
  success: (query, payload) => ({
    type: USER_FETCH_SUCCESS,
    payload: { query, payload },
  }),
  failure: (query, error) => ({
    type: USER_FETCH_FAILURE,
    payload: { query, error },
  }),
};

export const requestSuggestions = term => ({
  type: USER_SUGGESTIONS_REQUEST,
  payload: { term },
});
export const receiveSuggestions = (term, payload) => ({
  type: USER_SUGGESTIONS_SUCCESS,
  payload: { term, ...payload },
});

const initialState = {
  suggestions: [],
};

export default function UserReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case USER_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: payload.result,
      };
    default:
      return state;
  }
}

// SAGA

function* searchUsers({ payload: { term } }) {
  const { payload } = yield call(UserClient.search, term);

  yield put(receiveSuggestions(term, payload));
}

export function* saga() {
  yield takeLatest(USER_SUGGESTIONS_REQUEST, searchUsers);
}
