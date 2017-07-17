import {
  FETCH_SUGGESTED_TOPICS,
  FETCH_TOPICS_FOR_KEYWORD,
} from '../constants/ActionTypes';
import { action } from './utils';

export const getSuggestedTopics = () => action(FETCH_SUGGESTED_TOPICS.REQUEST);
export const getSuggestedTopicsSuccess = payload =>
  action(FETCH_SUGGESTED_TOPICS.SUCESS, { payload });
export const getSuggestedTopicsFailure = () =>
  action(FETCH_SUGGESTED_TOPICS.FAILURE);

export const getTopicsForKeyword = keyword =>
  action(FETCH_TOPICS_FOR_KEYWORD.REQUEST, { keyword });
export const getTopicsForKeywordSuccess = payload =>
  action(FETCH_TOPICS_FOR_KEYWORD.SUCESS, { payload });
export const getTopicsForKeywordFailure = () =>
  action(FETCH_TOPICS_FOR_KEYWORD.FAILURE);
