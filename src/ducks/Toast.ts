import Immutable from 'immutable';

export const CREATE_TOAST = 'CREATE_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export enum ButtonTypes {
  DULL = 'dull',
  ACTION = 'action'
}

export const dismissToastAction = 'DISMISS';

export interface Actionable {
  title: string,
  action: (() => Object) | string,
  type: ButtonTypes
}

export const createToast = (title: string, message: string, preset: string) =>
  ({ type: CREATE_TOAST, payload: { title, message, preset }});

export const createToastWithActionable = (payload: {title: string, message: string, preset: string, actions: Array<Actionable>}) =>
  ({ type: CREATE_TOAST, payload });

export const removeToast = (id: number) => ({ type: REMOVE_TOAST, payload: { id }});

let toastCount = 0;

export interface ToastBase {
  id: number,
  title: string,
  message: string,
  preset: string,
  actions?: Array<Actionable>
}

const ToastRecord = Immutable.Record({
  id: null,
  title: '',
  message: null,
  preset: 'log',
  actions: null,
});

export class Toast extends ToastRecord implements ToastBase {
  id: number;
  title: string;
  message: string;
  preset: string;
  actions?: Array<Actionable>;

  constructor(props: ToastBase) {
    super(props);
  }
}

interface Action {
  type: string,
  payload: {
    id: number,
    title: string,
    message: string,
    preset: string,
  }
}

const initialState = Immutable.Map({
  toastList: Immutable.List(),
});

export default function TopicsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case CREATE_TOAST: {
      return state.update('toastList', list =>
        list.push(
          new ToastRecord({
            ...action.payload,
            id: (toastCount += 1),
          })
        )
      );
    }
    case REMOVE_TOAST: {
      return state.update('toastList', (list: Immutable.List<Toast>) =>
        // todo: remove undefined check when facebook/immutable-js#1246 is fixed
        <Immutable.List<Toast>>list.filter(toast => toast !== undefined && toast.get('id') !== action.payload.id)
      );
    }
    default:
      return state;
  }
}
