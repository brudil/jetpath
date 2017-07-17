import AT, { NOTIFICATION_UNREAD_COUNT } from '../constants/ActionTypes';
import { sequence } from './utils';

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
