import { spawn, all } from 'redux-saga/effects';
import { saga as contentListSaga } from '../ducks/ContentList';
import { saga as mediaListSaga } from '../ducks/MediaList';
import { saga as authSaga } from '../ducks/Auth';
import { saga as notificationSaga } from '../ducks/Notification';
import { saga as verticalSaga } from '../ducks/Vertical';
import { saga as topicSaga } from '../ducks/Topic';
import { saga as editorSaga } from '../ducks/Editor';
import { saga as organisationSaga } from '../ducks/Organisation';
import { saga as userSaga } from '../ducks/User';

export default function* root() {
  try {
    yield all([
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
