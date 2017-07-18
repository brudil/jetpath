import { spawn, take, put } from 'redux-saga/effects';
import { NotificationClient } from '../serverAPI';
import {
  NOTIFICATION_UNREAD_COUNT,
  loadUnreadCountSuccess,
} from '../ducks/Notification';

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
