import { takeLatest, put, call } from 'redux-saga/effects';
import find from 'lodash/find';
import { VerticalClient } from '../serverAPI';

export const FETCH_VERTICALS_REQUEST = 'FETCH_VERTICALS_REQUEST';
export const FETCH_VERTICALS_FAILURE = 'FETCH_VERTICALS_FAILURE';
export const FETCH_VERTICALS_SUCCESS = 'FETCH_VERTICALS_SUCCESS';
export const SET_VERTICAL = 'SET_VERTICAL';

// ACTIONS
export const getVerticals = () => ({ type: FETCH_VERTICALS_REQUEST });

export const setVertical = (vertical: any) => ({
  // todo
  type: SET_VERTICAL,
  payload: { vertical },
});

// HELPERS
const getVerticalsSuccess = (payload: any) => ({
  // todo
  type: FETCH_VERTICALS_SUCCESS,
  payload,
});

const initialState = {
  list: [],
  isLoading: true,
  selectedVertical: null,
  selectedVerticalIdentifier: null,
};

export interface Vertical {
  identifier: string;
  content_tones: number[];
  content_forms: number[];
}

export interface VerticalState {
  list: Vertical[];
  isLoading: boolean;
  selectedVertical: Vertical | null;
  selectedVerticalIdentifier: string | null;
}

export default function VerticalReducer(
  state: VerticalState = initialState,
  action: any
) {
  switch (action.type) {
    case FETCH_VERTICALS_SUCCESS: {
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
      const found =
        find(state.list, { identifier: action.payload.vertical }) || null;
      return {
        ...state,
        selectedVerticalIdentifier: action.payload.vertical,
        selectedVertical: found,
      };
    }
    default:
      return state;
  }
}

// SAGA
function* handleFetchVerticals() {
  const response = yield call(VerticalClient.getAll);
  yield put(getVerticalsSuccess(response));
}

export function* saga() {
  yield takeLatest(FETCH_VERTICALS_REQUEST, handleFetchVerticals);
}
