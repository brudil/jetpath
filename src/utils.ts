import uuid from 'uuid/v4';
import { call, put } from 'redux-saga/effects';
import { Dispatch } from 'redux';

export function action(type: string, payload = {}) {
  return { type, ...payload };
}

interface RequestTypes {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}

export function createRequestTypes(base: string): RequestTypes {
  return {
    REQUEST: `${base}_REQUEST`,
    SUCCESS: `${base}_SUCCESS`,
    FAILURE: `${base}_FAILURE`,
  };
}

export function createTransaction(
  dispatch: Dispatch<any>,
  actionType: string,
  sequenceData = {}
) {
  const transactionId = uuid();
  console.warn(
    `${
      actionType
    } is using deprecated transactions and thunk. Use React Saga for async.`
  );

  dispatch({
    type: actionType,
    sequence: {
      type: 'start',
      transactionId,
      ...sequenceData,
    },
  });

  return {
    done(payload = {}) {
      dispatch({
        type: actionType,
        payload,
        sequence: {
          type: 'done',
          transactionId,
          ...sequenceData,
        },
      });
    },
    progress(progress: any) {
      dispatch({
        type: actionType,
        sequence: {
          type: 'progress',
          progress,
          transactionId,
          ...sequenceData,
        },
      });
    },
    error(payload = {}) {
      dispatch({
        type: actionType,
        error: true,
        payload,
        sequence: {
          type: 'fail',
          transactionId,
          ...sequenceData,
        },
      });
    },
  };
}

export function sequence(state: any, action: any, methods: any) {
  // trying to get rid of this. not typing
  if (action.error && {}.hasOwnProperty.call(methods, 'error')) {
    return methods.error();
  }

  if (!{}.hasOwnProperty.call(action, 'sequence')) {
    throw new Error('Sequence action has no sequence data!');
  }

  if ({}.hasOwnProperty.call(methods, action.sequence.type)) {
    return methods[action.sequence.type]();
  }

  return state;
}

export function* fetchEntity(
  entity: any,
  apiFn: any,
  vertical: string,
  id: string,
  url: string
) {
  yield put(entity.request(id));
  const { payload, error } = yield call(apiFn, vertical, id, url);
  if (payload) {
    yield put(entity.success(id, payload));
  } else {
    yield put(entity.failure(id, error));
  }
}
