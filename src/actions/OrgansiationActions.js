import { normalize, schema } from 'normalizr';
import AT, {
  FETCH_ALL_SECTIONS,
  GET_ALL_SECTIONS,
  ORGANISATION_SELECT_SECTION,
  ORGANISATION_SELECT_TOPIC,
  ORGANISATION_SELECT_NEW_SECTION,
  ORGANISATION_SELECT_NEW_TOPIC,
  ORGANISATION_SAVE_SECTION,
  ORGANISATION_SAVE_TOPIC,
  ORGANISATION_FETCH_TOPICS_FOR_SECTION,
} from '../constants/ActionTypes';
import { SectionsClient, TopicsClient } from '../serverAPI';
import {
  topic as topicSchema,
  section as sectionSchema,
} from '../schema/index';
import { createTransaction, action } from './utils';

export function getSectionIndex(queryParams) {
  return dispatch => {
    const transaction = createTransaction(dispatch, AT.SECTION_LIST_FETCH);
    SectionsClient.getAll(queryParams)
      .then(payload => {
        transaction.done(
          normalize(payload.data, new schema.Array(sectionSchema))
        );
      })
      .catch(transaction.error);
  };
}

export const getAllSections = () => action(GET_ALL_SECTIONS);
export const fetchAllSections = () => action(FETCH_ALL_SECTIONS.REQUEST);
export const fetchAllSectionsFailure = payload =>
  action(FETCH_ALL_SECTIONS.FAILURE, { payload });
export const fetchAllSectionsSuccess = payload =>
  action(FETCH_ALL_SECTIONS.SUCCESS, { payload });

export const fetchTopicsForSection = () =>
  action(ORGANISATION_FETCH_TOPICS_FOR_SECTION.REQUEST);
export const fetchTopicsForSectionFailure = (id, payload) =>
  action(ORGANISATION_FETCH_TOPICS_FOR_SECTION.FAILURE, { id, payload });
export const fetchTopicsForSectionSuccess = (id, payload) =>
  action(ORGANISATION_FETCH_TOPICS_FOR_SECTION.SUCCESS, { id, payload });

export const selectSection = id => action(ORGANISATION_SELECT_SECTION, { id });
export const selectTopic = id => action(ORGANISATION_SELECT_TOPIC, { id });
export const selectNewSection = id =>
  action(ORGANISATION_SELECT_NEW_SECTION, { id });
export const selectNewTopic = id =>
  action(ORGANISATION_SELECT_NEW_TOPIC, { id });

export const saveTopic = data =>
  action(ORGANISATION_SAVE_TOPIC.REQUEST, { data });
export const saveSection = data =>
  action(ORGANISATION_SAVE_SECTION.REQUEST, { data });
export const saveTopicSuccess = payload =>
  action(ORGANISATION_SAVE_TOPIC.SUCCESS, { payload });
export const saveSectionSuccess = payload =>
  action(ORGANISATION_SAVE_SECTION.SUCCESS, { payload });
export const saveTopicFailure = payload =>
  action(ORGANISATION_SAVE_TOPIC.FAILURE, { payload });
export const saveSectionFailure = payload =>
  action(ORGANISATION_SAVE_SECTION.FAILURE, { payload });

export function getTopicsForSection(sectionId) {
  return dispatch => {
    const transaction = createTransaction(
      dispatch,
      AT.ORGANISATION_GET_TOPICS_FOR_SECTION,
      {
        sectionId,
      }
    );

    SectionsClient.getTopicsFor(sectionId)
      .then(payload => {
        transaction.done(
          normalize(payload.data, new schema.Array(topicSchema))
        );
      })
      .catch(transaction.error);
  };
}

export function updateSection(sectionId, sectionData) {
  return (dispatch, getState) => {
    const state = getState();
    const transaction = createTransaction(
      dispatch,
      AT.ORGANISATION_UPDATE_SECTION,
      {
        sectionId,
      }
    );

    SectionsClient.update(sectionId, {
      ...state.entities.sections[sectionId],
      ...sectionData,
    })
      .then(payload => {
        transaction.done(normalize(payload.data, sectionSchema));
      })
      .catch(transaction.error);
  };
}
export function updateTopic(topicId, sectionData) {
  return (dispatch, getState) => {
    const state = getState();
    const transaction = createTransaction(
      dispatch,
      AT.ORGANISATION_UPDATE_TOPIC,
      {
        topicId,
      }
    );

    TopicsClient.update(topicId, {
      ...state.entities.topics[topicId],
      ...sectionData,
    })
      .then(payload => {
        transaction.done(normalize(payload.data, topicSchema));
      })
      .catch(transaction.error);
  };
}

export function createTopic(sectionId, data) {
  return dispatch => {
    const transaction = createTransaction(
      dispatch,
      AT.ORGANISATION_CREATE_TOPIC,
      {
        sectionId,
      }
    );

    TopicsClient.create(sectionId, data)
      .then(payload => {
        transaction.done(normalize(payload.data, topicSchema));
      })
      .catch(transaction.error);
  };
}

export function blankTopic() {
  return {
    type: AT.ORGANISATION_TOPIC_BLANK,
  };
}

export function blankSection() {
  return {
    type: AT.ORGANISATION_SECTION_BLANK,
  };
}
