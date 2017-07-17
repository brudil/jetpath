import { MODAL_OPEN, MODAL_CLOSE } from '../constants/ActionTypes';

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
