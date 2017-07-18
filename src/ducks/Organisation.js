import { call, put, select, takeLatest } from 'redux-saga/effects';
import { actions as formActions } from 'react-redux-form';
import { normalize, schema } from 'normalizr';
import { SectionsClient, TopicsClient } from '../serverAPI';
import {
  topic as topicSchema,
  section as sectionSchema,
} from '../schema/index';
import {
  sequence,
  createTransaction,
  action as makeAction,
  createRequestTypes,
} from '../utils';
import getVertical from '../sagas/getVertical';

// CONSTANTS
export const GET_ALL_SECTIONS = 'GET_ALL_SECTIONS';
export const FETCH_ALL_SECTIONS = createRequestTypes('FETCH_ALL_SECTIONS');
export const ORGANISATION_SAVE_SECTION = createRequestTypes(
  'ORGANISATION_SAVE_SECTION'
);
export const ORGANISATION_SAVE_TOPIC = createRequestTypes(
  'ORGANISATION_SAVE_TOPIC'
);
export const ORGANISATION_SELECT_SECTION = 'ORGANISATION_SELECT_SECTION';
export const ORGANISATION_SELECT_TOPIC = 'ORGANISATION_SELECT_TOPIC';
export const ORGANISATION_SELECT_NEW_SECTION =
  'ORGANISATION_SELECT_NEW_SECTION';
export const ORGANISATION_SELECT_NEW_TOPIC = 'ORGANISATION_SELECT_NEW_TOPIC';
export const ORGANISATION_CREATE_TOPIC = 'ORGANISATION_CREATE_TOPIC';
export const ORGANISATION_UPDATE_TOPIC = 'ORGANISATION_UPDATE_TOPIC';
export const ORGANISATION_UPDATE_SECTION = 'ORGANISATION_UPDATE_SECTION';
export const ORGANISATION_TOPIC_BLANK = 'ORGANISATION_TOPIC_BLANK';
export const ORGANISATION_SECTION_BLANK = 'ORGANISATION_SECTION_BLANK';
export const ORGANISATION_GET_TOPICS_FOR_SECTION =
  'ORGANISATION_GET_TOPICS_FOR_SECTION';
export const ORGANISATION_FETCH_TOPICS_FOR_SECTION = createRequestTypes(
  'ORGANISATION_FETCH_TOPICS_FOR_SECTION'
);

// ACTIONS
export const getAllSections = () => makeAction(GET_ALL_SECTIONS);
export const fetchAllSections = () => makeAction(FETCH_ALL_SECTIONS.REQUEST);
export const fetchAllSectionsFailure = payload =>
  makeAction(FETCH_ALL_SECTIONS.FAILURE, { payload });
export const fetchAllSectionsSuccess = payload =>
  makeAction(FETCH_ALL_SECTIONS.SUCCESS, { payload });

export const fetchTopicsForSection = () =>
  makeAction(ORGANISATION_FETCH_TOPICS_FOR_SECTION.REQUEST);
export const fetchTopicsForSectionFailure = (id, payload) =>
  makeAction(ORGANISATION_FETCH_TOPICS_FOR_SECTION.FAILURE, { id, payload });
export const fetchTopicsForSectionSuccess = (id, payload) =>
  makeAction(ORGANISATION_FETCH_TOPICS_FOR_SECTION.SUCCESS, { id, payload });

export const selectSection = id =>
  makeAction(ORGANISATION_SELECT_SECTION, { id });
export const selectTopic = id => makeAction(ORGANISATION_SELECT_TOPIC, { id });
export const selectNewSection = id =>
  makeAction(ORGANISATION_SELECT_NEW_SECTION, { id });
export const selectNewTopic = id =>
  makeAction(ORGANISATION_SELECT_NEW_TOPIC, { id });

export const saveTopic = data =>
  makeAction(ORGANISATION_SAVE_TOPIC.REQUEST, { data });
export const saveSection = data =>
  makeAction(ORGANISATION_SAVE_SECTION.REQUEST, { data });
export const saveTopicSuccess = payload =>
  makeAction(ORGANISATION_SAVE_TOPIC.SUCCESS, { payload });
export const saveSectionSuccess = payload =>
  makeAction(ORGANISATION_SAVE_SECTION.SUCCESS, { payload });
export const saveTopicFailure = payload =>
  makeAction(ORGANISATION_SAVE_TOPIC.FAILURE, { payload });
export const saveSectionFailure = payload =>
  makeAction(ORGANISATION_SAVE_SECTION.FAILURE, { payload });

export function getTopicsForSection(sectionId) {
  return dispatch => {
    const transaction = createTransaction(
      dispatch,
      ORGANISATION_GET_TOPICS_FOR_SECTION,
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
      ORGANISATION_UPDATE_SECTION,
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
    const transaction = createTransaction(dispatch, ORGANISATION_UPDATE_TOPIC, {
      topicId,
    });

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
    const transaction = createTransaction(dispatch, ORGANISATION_CREATE_TOPIC, {
      sectionId,
    });

    TopicsClient.create(sectionId, data)
      .then(payload => {
        transaction.done(normalize(payload.data, topicSchema));
      })
      .catch(transaction.error);
  };
}

export function blankTopic() {
  return {
    type: ORGANISATION_TOPIC_BLANK,
  };
}

export function blankSection() {
  return {
    type: ORGANISATION_SECTION_BLANK,
  };
}

// REDUCER
const initialState = {
  sectionList: [],
  topicListMap: {},
  loading: false,
  selectedSectionId: null,
  selectedTopicId: null,
  blankOf: null,
};

export default function OrganisationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_SECTIONS.REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_ALL_SECTIONS.SUCCESS: {
      return {
        ...state,
        loading: false,
        sectionList: action.payload.result,
      };
    }
    case ORGANISATION_CREATE_TOPIC:
      return sequence(state, action, {
        done() {
          return {
            ...state,
            selectedTopicId: action.payload.result,
            blankOf: null,
            topicListMap: {
              ...state.topicListMap,
              [action.sequence.sectionId]: [
                ...state.topicListMap[action.sequence.sectionId],
                action.payload.result,
              ],
            },
          };
        },
      });
    case ORGANISATION_SELECT_SECTION:
      return {
        ...state,
        selectedSectionId: action.id,
        selectedTopicId: null,
        blankOf: null,
      };
    case ORGANISATION_SELECT_TOPIC:
      return {
        ...state,
        selectedTopicId: action.id,
        blankOf: null,
      };
    case ORGANISATION_SELECT_NEW_TOPIC:
      return {
        ...state,
        blankOf: 'topic',
        selectedTopicId: null,
      };
    case ORGANISATION_SELECT_NEW_SECTION:
      return {
        ...state,
        blankOf: 'section',
        selectedSectionId: null,
        selectedTopicId: null,
      };
    case ORGANISATION_SAVE_SECTION.SUCCESS: {
      const savedId = action.payload.result;
      if (state.sectionList.indexOf(savedId) > -1) {
        return state;
      }

      return {
        ...state,
        selectedSectionId: savedId,
        topicListMap: {
          ...state.topicListMap,
          [savedId]: {}.hasOwnProperty.call(state.topicListMap, savedId)
            ? state.topicListMap[savedId]
            : [],
        },
        sectionList: [...state.sectionList, savedId],
        blankOf: null,
      };
    }
    case ORGANISATION_SAVE_TOPIC.SUCCESS: {
      const savedId = action.payload.result;
      const savedTopic = action.payload.entities.topics[savedId];
      const sectionId = savedTopic.section;
      const topicList = state.topicListMap[sectionId];
      const hasIdAlready = topicList.indexOf(savedId) > -1;
      return {
        ...state,
        selectedTopicId: savedId,
        topicListMap: {
          ...state.topicListMap,
          [sectionId]: hasIdAlready ? topicList : [...topicList, savedId],
        },
        blankOf: null,
      };
    }
    case ORGANISATION_FETCH_TOPICS_FOR_SECTION.SUCCESS: {
      return {
        ...state,
        topicListMap: {
          ...state.topicListMap,
          [action.id]: action.payload.result,
        },
      };
    }
    default:
      return state;
  }
}

// SAGA
function* handleGetAllSections() {
  yield put(fetchAllSections());
  const vertical = yield getVertical();
  const payload = yield call(SectionsClient.getAll, vertical);

  if (payload.error) {
    yield put(fetchAllSectionsFailure(payload));
  } else {
    yield put(fetchAllSectionsSuccess(payload));
  }
}

function* handleSelectSection({ id }) {
  console.log(id);
  const response = yield call(SectionsClient.getTopicsFor, id);
  yield put(fetchTopicsForSectionSuccess(id, response));
  const section = yield select(state => state.entities.sections[id]);
  yield put(formActions.change('sectionEdit', section));
}

function* handleSelectTopic({ id }) {
  console.log(id);
  const topic = yield select(state => state.entities.topics[id]);
  yield put(formActions.change('topicEdit', topic));
}

function* handleSelectNewSection() {
  yield put(formActions.reset('sectionEdit'));
}

function* handleSelectNewTopic() {
  yield put(formActions.reset('topicEdit'));
}

function* handleSaveTopic({ data }) {
  let response = null;
  const [selectedSectionId, selectedTopicId] = yield select(state => [
    state.organisation.selectedSectionId,
    state.organisation.selectedTopicId,
  ]);
  console.log({ selectedSectionId, selectedTopicId });
  if (selectedTopicId === null) {
    response = yield call(TopicsClient.create, selectedSectionId, data);
  } else {
    const currentData = yield select(
      state => state.entities.topics[selectedTopicId]
    );
    response = yield call(TopicsClient.update, selectedTopicId, {
      ...currentData,
      ...data,
    });
  }

  if (response.error) {
    yield put(saveTopicFailure(response));
  } else {
    yield put(saveTopicSuccess(response));
  }
}

function* handleSaveSection({ data }) {
  let response = null;
  const selectedId = yield select(
    state => state.organisation.selectedSectionId
  );
  if (selectedId === null) {
    const vertical = yield getVertical();
    response = yield call(SectionsClient.create, vertical, data);
  } else {
    response = yield call(SectionsClient.update, selectedId, data);
  }

  if (response.error) {
    yield put(saveSectionFailure(response));
  } else {
    yield put(saveSectionSuccess(response));
  }
}

export function* saga() {
  yield takeLatest(GET_ALL_SECTIONS, handleGetAllSections);
  yield takeLatest(ORGANISATION_SELECT_SECTION, handleSelectSection);
  yield takeLatest(ORGANISATION_SELECT_TOPIC, handleSelectTopic);
  yield takeLatest(ORGANISATION_SELECT_NEW_SECTION, handleSelectNewSection);
  yield takeLatest(ORGANISATION_SELECT_NEW_TOPIC, handleSelectNewTopic);
  yield takeLatest(ORGANISATION_SAVE_TOPIC.REQUEST, handleSaveTopic);
  yield takeLatest(ORGANISATION_SAVE_SECTION.REQUEST, handleSaveSection);
}
