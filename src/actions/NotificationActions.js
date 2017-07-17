import AT, {
  NOTIFICATION_UNREAD_COUNT,
  NOTIFICATION_UNREAD,
} from '../constants/ActionTypes';
import { NotificationClient } from '../serverAPI';
import { createTransaction, action } from './utils';

export function getUnreadCount() {
  return dispatch => {
    const transaction = createTransaction(dispatch, NOTIFICATION_UNREAD_COUNT);

    NotificationClient.getUnreadCount()
      .then(response => {
        transaction.done(response.data);
      })
      .catch(transaction.error);
  };
}

export const loadUnreadCount = () => action(NOTIFICATION_UNREAD_COUNT.REQUEST);
export const loadUnreadCountSuccess = payload =>
  action(NOTIFICATION_UNREAD_COUNT.SUCCESS, { payload });

export const unread = () => action(NOTIFICATION_UNREAD.REQUEST);
export const unreadSuccess = payload =>
  action(NOTIFICATION_UNREAD.SUCCESS, { payload });

export function getUnread() {
  return dispatch => {
    const transaction = createTransaction(
      dispatch,
      AT.NOTIFICATION_FETCH_UNREAD
    );

    NotificationClient.getUnread()
      .then(() => {
        transaction.done();
      })
      .catch(transaction.error);
  };
}
