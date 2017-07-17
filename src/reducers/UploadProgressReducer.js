import { MEDIA_UPLOAD } from '../constants/ActionTypes';
import { sequence } from './utils';

const initialState = {
  transactionList: [],
  transactionMap: {},
};

export default function UploadProgressReducer(state = initialState, action) {
  switch (action.type) {
    case MEDIA_UPLOAD:
      return sequence(state, action, {
        start() {
          return {
            ...state,
            transactionMap: {
              ...state.transactionMap,
              [action.sequence.transactionId]: {
                progress: 0,
              },
            },
            // eslint-disable-next-line no-undef
            transactionList: update(state.transactionList, {
              $push: [action.sequence.transactionId],
            }),
          };
        },
        progress() {
          return {
            ...state,
            transactionMap: {
              ...state.transactionMap,
              [action.sequence.transactionId]: {
                progress: action.sequence.progress,
              },
            },
          };
        },
        done() {
          const position = state.transactionList.indexOf(
            action.sequence.transactionId
          );
          return {
            ...state,
            // eslint-disable-next-line no-undef
            transactionList: update(state.transactionList, {
              $splice: [[position, 1]],
            }),
            transactionMap: {
              [action.sequence.transactionId]: undefined,
            },
          };
        },
        error() {
          // eslint-disable-next-line no-undef
          return update(state, {
            transactionMap: {
              [action.sequence.transactionId]: {
                progress: 0,
                error: true,
              },
            },
          });
        },
      });
    default:
      return state;
  }
}
