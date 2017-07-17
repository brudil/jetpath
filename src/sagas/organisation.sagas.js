import { spawn, call, put, select, takeLatest } from 'redux-saga/effects';
import { actions as formActions } from 'react-redux-form';
import {
  GET_ALL_SECTIONS,
  ORGANISATION_SELECT_SECTION,
  ORGANISATION_SELECT_TOPIC,
  ORGANISATION_SELECT_NEW_SECTION,
  ORGANISATION_SELECT_NEW_TOPIC,
  ORGANISATION_SAVE_TOPIC,
  ORGANISATION_SAVE_SECTION,
} from '../constants/ActionTypes';
import { SectionsClient, TopicsClient } from '../serverAPI';
import getVertical from './getVertical';
import {
  fetchAllSections,
  fetchAllSectionsSuccess,
  fetchAllSectionsFailure,
  fetchTopicsForSectionSuccess,
  saveTopicSuccess,
  saveTopicFailure,
  saveSectionSuccess,
  saveSectionFailure,
} from '../actions/OrgansiationActions';

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

function* watchGetAllSections() {
  yield* takeLatest(GET_ALL_SECTIONS, handleGetAllSections);
}

function* handleSelectSection({ id }) {
  console.log(id);
  const response = yield call(SectionsClient.getTopicsFor, id);
  yield put(fetchTopicsForSectionSuccess(id, response));
  const section = yield select(state => state.entities.sections[id]);
  yield put(formActions.change('sectionEdit', section));
}

function* watchSelectSection() {
  yield* takeLatest(ORGANISATION_SELECT_SECTION, handleSelectSection);
}

function* handleSelectTopic({ id }) {
  console.log(id);
  const topic = yield select(state => state.entities.topics[id]);
  yield put(formActions.change('topicEdit', topic));
}

function* watchSelectTopic() {
  yield* takeLatest(ORGANISATION_SELECT_TOPIC, handleSelectTopic);
}

function* handleSelectNewSection() {
  yield put(formActions.reset('sectionEdit'));
}

function* watchSelectNewSection() {
  yield* takeLatest(ORGANISATION_SELECT_NEW_SECTION, handleSelectNewSection);
}

function* handleSelectNewTopic() {
  yield put(formActions.reset('topicEdit'));
}

function* watchSelectNewTopic() {
  yield* takeLatest(ORGANISATION_SELECT_NEW_TOPIC, handleSelectNewTopic);
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

function* watchSaveTopic() {
  yield* takeLatest(ORGANISATION_SAVE_TOPIC.REQUEST, handleSaveTopic);
}

function* handleSaveSection({ data }) {
  let response = null;
  console.log(data);
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

function* watchSaveSection() {
  yield* takeLatest(ORGANISATION_SAVE_SECTION.REQUEST, handleSaveSection);
}

export default [
  spawn(watchGetAllSections),
  spawn(watchSelectSection),
  spawn(watchSelectTopic),
  spawn(watchSelectNewSection),
  spawn(watchSelectNewTopic),
  spawn(watchSaveTopic),
  spawn(watchSaveSection),
];
