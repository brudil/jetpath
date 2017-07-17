import { MODAL_OPEN, MODAL_CLOSE } from '../constants/ActionTypes';

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
