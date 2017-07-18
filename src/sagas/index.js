import { call, put, spawn, all } from 'redux-saga/effects';
import { WorksClient, MediaClient } from '../serverAPI';
import {
  content as contentEntity,
  saga as contentListSaga,
} from '../ducks/ContentList';
import {
  media as mediaEntity,
  saga as mediaListSaga,
} from '../ducks/MediaList';
import { saga as authSaga } from '../ducks/Auth';
import { saga as notificationSaga } from '../ducks/Notification';
import { saga as verticalSaga } from '../ducks/Vertical';
import { saga as topicSaga } from '../ducks/Topic';
import { saga as editorSaga } from '../ducks/Editor';
import { saga as organisationSaga } from '../ducks/Organisation';
import { saga as userSaga } from '../ducks/User';

function* fetchEntity(entity, apiFn, vertical, id, url) {
  yield put(entity.request(id));
  const { payload, error } = yield call(apiFn, vertical, id, url);
  if (payload) {
    yield put(entity.success(id, payload));
  } else {
    yield put(entity.failure(id, error));
  }
}

export const fetchContent = fetchEntity.bind(
  null,
  contentEntity,
  WorksClient.getByFilterForVertical
);

export const fetchMediaList = fetchEntity.bind(
  null,
  mediaEntity,
  MediaClient.getByFilter
);

export default function* root() {
  try {
    yield all([
      // our ducky sagas
      spawn(authSaga),
      spawn(contentListSaga),
      spawn(notificationSaga),
      spawn(verticalSaga),
      spawn(editorSaga),
      spawn(organisationSaga),
      spawn(topicSaga),
      spawn(mediaListSaga),
      spawn(userSaga),
    ]);
  } catch (error) {
    yield;
  }
}
