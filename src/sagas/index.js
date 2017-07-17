import {
  fork,
  take,
  call,
  put,
  spawn,
  takeEvery,
  takeLatest,
  all,
} from 'redux-saga/effects';
import {
  LOAD_CONTENT_LIST,
  LOAD_MEDIA_LIST,
  USER_SUGGESTIONS,
  MEDIA_UPLOAD,
  FETCH_VERTICALS,
  FETCH_TOPICS_FOR_KEYWORD,
} from '../constants/ActionTypes';
import {
  WorksClient,
  MediaClient,
  UserClient,
  TopicsClient,
  VerticalClient,
} from '../serverAPI';
import { content as contentEntity } from '../actions/ContentListActions';
import { media as mediaEntity } from '../actions/MediaActions';
import { receiveSuggestions } from '../actions/UserActions';
import { getVerticalsSuccess } from '../actions/VerticalActions';
import getVertical from './getVertical';
import authSagas from './auth.sagas';
import notificationSagas from './notifications.sagas';
import editorSagas from './editor.sagas';
import organsiationSagas from './organisation.sagas';

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

function* searchUsers() {
  while (true) {
    // eslint-disable-line no-constant-condition
    const { term } = yield take(USER_SUGGESTIONS.REQUEST);

    const { payload } = yield call(UserClient.search, term);

    yield put(receiveSuggestions(term, payload));
  }
}

function* handleLoadContentList(action) {
  yield fork(fetchContent, action.vertical, action.query);
}

function* watchLoadContentList() {
  yield takeLatest(LOAD_CONTENT_LIST, handleLoadContentList);
}

function* handleLoadMediaList(action) {
  yield fork(fetchMediaList, action.vertical, action.query, action.limit);
}

function* watchLoadMediaList() {
  yield takeLatest(LOAD_MEDIA_LIST, handleLoadMediaList);
}

function* mediaUpload({ file }) {
  const vertical = yield getVertical();
  const { payload, error } = yield call(MediaClient.upload, vertical, file);

  if (payload) {
    yield put({ type: MEDIA_UPLOAD.SUCCESS, payload });
  } else {
    yield put({ type: MEDIA_UPLOAD.FAILURE, error });
  }
}

function* watchMediaUpload() {
  yield* takeEvery(MEDIA_UPLOAD.REQUEST, mediaUpload);
}

function* handleFetchTopicsForKeyword({ keyword }) {
  const vertical = yield getVertical();
  const payload = yield call(TopicsClient.forKeyword, vertical, keyword);
  if (!payload.error) {
    yield put({ type: FETCH_TOPICS_FOR_KEYWORD.SUCCESS, payload, keyword });
  } else {
    yield put({ type: FETCH_TOPICS_FOR_KEYWORD.FAILURE, error: payload.error });
  }
}

function* watchFetchTopicsForKeyword() {
  yield* takeEvery(
    FETCH_TOPICS_FOR_KEYWORD.REQUEST,
    handleFetchTopicsForKeyword
  );
}

function* handleFetchVerticals() {
  const response = yield call(VerticalClient.getAll);
  yield put(getVerticalsSuccess(response));
}

function* watchGetVerticals() {
  yield* takeLatest(FETCH_VERTICALS.REQUEST, handleFetchVerticals);
}

export default function* root() {
  yield [
    all(...authSagas),
    all(...notificationSagas),
    all(...organsiationSagas),
    all(...editorSagas),
    spawn(searchUsers),
    spawn(watchLoadContentList),
    spawn(watchLoadMediaList),
    spawn(watchFetchTopicsForKeyword),
    spawn(watchMediaUpload),
    spawn(watchGetVerticals),
  ];
}
