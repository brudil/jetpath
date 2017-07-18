import uuid from 'uuid/v4';

export function action(type, payload = {}) {
  return { type, ...payload };
}

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => {
    const constant = `${base}_${type}`;
    res[type] = constant;
    return constant;
  });
  return res;
}

export function createTransaction(dispatch, actionType, sequenceData = {}) {
  const transactionId = uuid();
  console.warn(
    `${actionType} is using deprecated transactions and thunk. Use React Saga for async.`
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
    progress(progress) {
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

export function sequence(state, action, methods) {
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
