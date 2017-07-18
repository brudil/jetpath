export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

// Actions
export function open(ref, conf = {}) {
  return {
    type: MODAL_OPEN,
    payload: {
      uuid: ref.state.uuid,
      conf,
    },
  };
}

export function close(ref) {
  return {
    type: MODAL_CLOSE,
    payload: {
      uuid: ref.state.uuid,
    },
  };
}

export function closeById(uuid) {
  return {
    type: MODAL_CLOSE,
    payload: {
      uuid,
    },
  };
}

// REDUCER
const initialState = {
  modals: {},
  modalsConf: {},
};

export default function ModalManagerReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        modals: {
          ...state.modals,
          [payload.uuid]: true,
        },
        modalsConf: {
          ...state.modals,
          [payload.uuid]: payload.conf,
        },
      };
    case MODAL_CLOSE:
      return {
        ...state,
        modals: {
          ...state.modals,
          [payload.uuid]: false,
        },
        modalsConf: {
          ...state.modals,
          [payload.uuid]: null,
        },
      };
    default:
      return state;
  }
}
