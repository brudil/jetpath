import Immutable from 'immutable';
import AT from '../constants/ActionTypes';
import { MediaClient } from '../serverAPI';
import { createTransaction } from './utils';

export function open() {}

export function save(data) {
  return dispatch => {
    const transaction = createTransaction(dispatch, AT.MEDIA_MODAL_SAVE);

    try {
      const payload = MediaClient.update(data.get('id'), data);
      transaction.done(Immutable.fromJS(payload.data));
    } catch (error) {
      transaction.error(error);
    }
  };
}

export function update(key, value) {
  return dispatch => {
    dispatch({
      type: AT.MEDIA_MODAL_UPDATE,
      payload: {
        key,
        value,
      },
    });
  };
}

export function close() {
  return {
    type: AT.MEDIA_MODAL_CLOSE,
  };
}
