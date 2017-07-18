import AT, { createRequestTypes } from '../constants/ActionTypes';
import { sequence } from '../reducers/utils';
import { NotificationClient } from '../serverAPI';
import { createTransaction, action as makeAction } from '../actions/utils';

export const NOTIFICATION_UNREAD_COUNT = createRequestTypes(
  'NOTIFICATION_UNREAD_COUNT'
);

// seemingly this was missing?
export const NOTIFICATION_UNREAD = createRequestTypes('NOTIFICATION_UNREAD');

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

export const loadUnreadCount = () =>
  makeAction(NOTIFICATION_UNREAD_COUNT.REQUEST);
export const loadUnreadCountSuccess = payload =>
  makeAction(NOTIFICATION_UNREAD_COUNT.SUCCESS, { payload });

export const unread = () => makeAction(NOTIFICATION_UNREAD.REQUEST);
export const unreadSuccess = payload =>
  makeAction(NOTIFICATION_UNREAD.SUCCESS, { payload });

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

const initialState = {
  unreadCount: null,
  unreadList: [],
};

export default function NotificationReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_UNREAD_COUNT.SUCCESS:
      return {
        ...state,
        unreadCount: action.payload.data.count,
      };
    case AT.NOTIFICATION_FETCH_UNREAD:
      return sequence(state, action, {
        done() {
          return {
            ...state,
            unreadList: action.payload.result,
          };
        },
      });
    default:
      return state;
  }
}
