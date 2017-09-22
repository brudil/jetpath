import Immutable from 'immutable';
import { action } from '../utils';

export const CREATE_TOAST = 'CREATE_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export const createToast = (title: string, message: string, preset: string) =>
  action(CREATE_TOAST, { title, message, preset });
export const removeToast = (id: number) => action(REMOVE_TOAST, { id });

let toastCount = 0;

interface ToastBase {
  id: number,
  title: string,
  message: string,
  preset: string,
}

const ToastRecord = Immutable.Record({
  id: null,
  title: '',
  message: null,
  preset: 'log',
});

class Toast extends ToastRecord implements ToastBase {
  id: number;
  title: string;
  message: string;
  preset: string;

  constructor(props: ToastBase) {
    super(props);
  }
}

interface Action {
  id: number,
  type: string,
  title: string,
  message: string,
  preset: string,
}

const initialState = Immutable.Map({
  toastList: Immutable.List(),
});

export default function TopicsReducer(state = initialState, action: Action) {
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
      return state.update('toastList', (list: Immutable.List<Toast>) =>
        // todo: remove undefined check when facebook/immutable-js#1246 is fixed
        <Immutable.List<Toast>>list.filter(toast => toast !== undefined && toast.get('id') !== action.id)
      );
    }
    default:
      return state;
  }
}
