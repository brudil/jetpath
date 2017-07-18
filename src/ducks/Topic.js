import { action as makeAction } from '../actions/utils';
import { createRequestTypes } from '../constants/ActionTypes';

export const FETCH_SUGGESTED_TOPICS = createRequestTypes(
  'FETCH_SUGGESTED_TOPICS'
);
export const FETCH_TOPICS_FOR_KEYWORD = createRequestTypes(
  'FETCH_TOPICS_FOR_KEYWORD'
);

export const getSuggestedTopics = () =>
  makeAction(FETCH_SUGGESTED_TOPICS.REQUEST);
export const getSuggestedTopicsSuccess = payload =>
  makeAction(FETCH_SUGGESTED_TOPICS.SUCESS, { payload });
export const getSuggestedTopicsFailure = () =>
  makeAction(FETCH_SUGGESTED_TOPICS.FAILURE);

export const getTopicsForKeyword = keyword =>
  makeAction(FETCH_TOPICS_FOR_KEYWORD.REQUEST, { keyword });
export const getTopicsForKeywordSuccess = payload =>
  makeAction(FETCH_TOPICS_FOR_KEYWORD.SUCESS, { payload });
export const getTopicsForKeywordFailure = () =>
  makeAction(FETCH_TOPICS_FOR_KEYWORD.FAILURE);

const initialState = {
  keywordMap: {},
  isLoading: true,
};

export default function TopicsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOPICS_FOR_KEYWORD.SUCCESS:
      return {
        ...state,
        isLoading: false,
        keywordMap: {
          ...state.keywordMap,
          [action.keyword]: action.payload.result,
        },
      };
    default:
      return state;
  }
}
