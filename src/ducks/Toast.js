import Immutable from 'immutable';
import { action } from '../actions/utils';

export const CREATE_TOAST = 'CREATE_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export const createToast = (title, message, preset) =>
  action(CREATE_TOAST, { title, message, preset });
export const removeToast = id => action(REMOVE_TOAST, { id });

let toastCount = 0;

const initialState = new Immutable.Map({
  toastList: new Immutable.List(),
});

const ToastRecord = new Immutable.Record({
  id: null,
  title: '',
  message: null,
  preset: 'log',
});

export default function TopicsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TOAST: {
      const { title, message, preset } = action;
      return state.update('toastList', list =>
        list.push(
          new ToastRecord({
            id: (toastCount += 1),
            title,
            message,
            preset,
          })
        )
      );
    }
    case REMOVE_TOAST: {
      return state.update('toastList', list =>
        list.filter(toast => toast.get('id') !== action.id)
      );
    }
    default:
      return state;
  }
}
