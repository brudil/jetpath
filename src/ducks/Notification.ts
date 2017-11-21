import { takeLatest, put } from 'redux-saga/effects';
import { createRequestTypes } from '../utils';
import { NotificationClient } from '../serverAPI';

const NOTIFICATION_UNREAD_COUNT_REQUEST = 'NOTIFICATION_UNREAD_COUNT_REQUEST';
// const NOTIFICATION_UNREAD_COUNT_FAILURE = 'NOTIFICATION_UNREAD_COUNT_FAILURE';
const NOTIFICATION_UNREAD_COUNT_SUCCESS = 'NOTIFICATION_UNREAD_COUNT_SUCCESS';

// seemingly this was missing?
export const NOTIFICATION_UNREAD = createRequestTypes('NOTIFICATION_UNREAD');

// ACTIONS
export const loadUnreadCount = () => ({
  type: NOTIFICATION_UNREAD_COUNT_REQUEST,
});

// HELPERS
const loadUnreadCountSuccess = (payload: any) => ({
  // todo
  type: NOTIFICATION_UNREAD_COUNT_SUCCESS,
  payload,
});

const initialState = {
  unreadCount: null,
  unreadList: [],
};

type Action = any;

export default function NotificationReducer(
  state = initialState,
  action: Action
) {
  switch (action.type) {
    case NOTIFICATION_UNREAD_COUNT_SUCCESS:
      return {
        ...state,
        unreadCount: action.payload.data.count,
      };
    default:
      return state;
  }
}

// SAGA
function* handleLoadUnreadCount() {
  const response = yield NotificationClient.getUnreadCount();
  yield put(loadUnreadCountSuccess(response));
}

export function* saga() {
  yield takeLatest(NOTIFICATION_UNREAD_COUNT_REQUEST, handleLoadUnreadCount);
}
