import { spawn, take, put } from 'redux-saga/effects';
import { NOTIFICATION_UNREAD_COUNT } from '../constants/ActionTypes';
import { NotificationClient } from '../serverAPI';
import { loadUnreadCountSuccess } from '../actions/NotificationActions';

function* loadUnreadCount() {
  while (true) {
    // eslint-disable-line no-constant-condition
    yield take(NOTIFICATION_UNREAD_COUNT.REQUEST);
    const response = yield NotificationClient.getUnreadCount();
    yield put(loadUnreadCountSuccess(response));
  }
}

export default [
  spawn(loadUnreadCount),
  // fork(loadUnread)
];
