import uuid from 'node-uuid';

export function action(type, payload = {}) {
  return { type, ...payload };
}

export function createTransaction(dispatch, actionType, sequenceData = {}) {
  const transactionId = uuid.v4();
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
