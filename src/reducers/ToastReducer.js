import Immutable from 'immutable';
import { CREATE_TOAST, REMOVE_TOAST } from '../constants/ActionTypes';

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
            id: toastCount++,
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
