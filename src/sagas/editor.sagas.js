import { spawn, call, put, select, takeLatest } from 'redux-saga/effects';
import Immutable from 'immutable';
import getVertical from './getVertical';
// eslint-disable-next-line no-unused-vars
import { SpectrumDocument, resources } from '@brudil/spectrum';
import { WorksClient, MediaClient } from '../serverAPI';
import {
  EDITOR_SAVE,
  EDITOR_LOAD_CONTENT,
  EDITOR_REVISION_CHANGE,
  EDITOR_DOCUMENT_CHANGE,
  EDITOR_CHANGE_STATE_CHANGED,
  EDITOR_PUBLISH_CONTENT,
  EDITOR_CREATE_EMTPY_DOCUMENT,
  EDITOR_REMOVE_AUTHOR,
  EDITOR_ADD_AUTHOR,
  EDITOR_CREATE_REVISION,
  EDITOR_CREATE_CONTENT,
  EDITOR_CHANGE_REVISION_STATUS,
  loadContentSuccess,
  createRevisionSuccess,
  createContentSuccess,
  changeRevisionStatusSuccess,
  publishSuccess,
} from '../ducks/Editor';

/* // TODO: currently assuming only image resources, this map will be needed when we have other resources, e.g: videos
const spectrumResourcesMap = new Map();
spectrumResourcesMap.set(resources.LowdownImageResouce)
*/

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function entities(payload) {
  return { type: 'ENTITIES', payload };
}

function* handleEditorSave() {
  const vertical = yield getVertical();
  const editorState = yield select(state => state.editor);
  const isLocal = editorState.get('isLocal');
  let response;

  const revision = editorState.get('workingRevision');
  const document = editorState.get('workingDocument');
  const revisionWithDocument = revision
    .set('spectrum_document', document)
    .set('content', editorState.get('remoteId'))
    .toJS();
  if (!isLocal) {
    response = yield call(WorksClient.saveRevision, revisionWithDocument);
  } else {
    response = yield call(
      WorksClient.saveNewContent,
      vertical,
      revisionWithDocument
    );
  }

  const revisionResponse =
    response.payload.entities.contentRevision[response.payload.result];

  if (!isLocal) {
    yield put(
      createRevisionSuccess({
        contentId: revisionResponse.content,
        revision: revisionResponse,
      })
    );
  } else {
    const metadataResponse = yield call(
      WorksClient.getEditorialMetadata,
      revisionResponse.content
    );
    const metadata =
      metadataResponse.payload.entities.editorialMetadata[
        metadataResponse.payload.result
      ];
    yield put(
      createContentSuccess({
        contentId: revisionResponse.content,
        revision: revisionResponse,
        metadata,
      })
    );
  }
}

function* handleEditorPublish() {
  const editorState = yield select(state => state.editor);

  const response = yield call(
    WorksClient.publishRevision,
    editorState.getIn(['savedRevision', 'id'])
  );
  const editorialMetadata =
    response.payload.entities.editorialMetadata[response.payload.result];
  yield put(publishSuccess({ editorialMetadata }));
}

function* handleEditorChange() {
  yield call(delay, 80);
  const editorState = yield select(state => state.editor);

  const serverMutableFields = [
    'updated',
    'created',
    'id',
    'content',
    'revision_number',
  ];
  const removeServerMutableFields = rev =>
    rev.merge(
      serverMutableFields.reduce(
        (state, fieldName) => state.set(fieldName, null),
        new Immutable.Map()
      )
    );

  const documentEqual = Immutable.is(
    editorState.get('workingDocument'),
    editorState.get('savedDocument')
  );
  const revisionEqual = Immutable.is(
    removeServerMutableFields(editorState.get('workingRevision')),
    removeServerMutableFields(editorState.get('savedRevision'))
  );

  /*
  console.log(diff(
    removeServerMutableFields(editorState.get('workingRevision')).toJS(),
    removeServerMutableFields(editorState.get('savedRevision')).toJS()
  ));
  */

  const hasChangesFromSaved = !documentEqual || !revisionEqual;

  if (editorState.hasChangesFromSaved !== hasChangesFromSaved) {
    yield put({ type: EDITOR_CHANGE_STATE_CHANGED, hasChangesFromSaved });
  }
}

function* loadMissingResourcesForRevision(revision) {
  const foundResources = SpectrumDocument.fromJS(revision.spectrum_document)
    .getElements()
    .filter(el => el instanceof resources.Resource);

  const imageEntities = yield select(state => state.entities.media);

  const missingIds = [];

  const usedIds = foundResources.map(resource => resource.id);
  usedIds.push(revision.poster_image);

  for (const resourceId of usedIds) {
    if (resourceId !== null && missingIds.indexOf(resourceId) >= 0) {
      const isMissing = !{}.hasOwnProperty.call(imageEntities, resourceId);

      if (isMissing) {
        missingIds.push(resourceId);
      }
    }
  }

  const payload = yield call(MediaClient.getMultiple, missingIds);

  yield put(entities(payload));
}

function* handleEditorChangeRevisionStatus({ status }) {
  const editorState = yield select(state => state.editor);

  yield call(
    WorksClient.revisionStatusChange,
    editorState.getIn(['savedRevision', 'id']),
    status
  );
  yield put(changeRevisionStatusSuccess({ status }));
}

function* handleEditorLoad({ contentId }) {
  const [revisionPayload, editorialMetadataPayload] = yield [
    call(WorksClient.getRevision, contentId),
    call(WorksClient.getEditorialMetadata, contentId),
  ];
  const revision =
    revisionPayload.payload.entities.contentRevision[
      revisionPayload.payload.result
    ];
  const metaEntities =
    editorialMetadataPayload.payload.entities.editorialMetadata;
  const editorialMetadata =
    metaEntities[editorialMetadataPayload.payload.result];
  yield [
    spawn(loadMissingResourcesForRevision, revision),
    put(entities(revisionPayload.payload)),
    put(entities(editorialMetadataPayload.payload)),
    put(
      loadContentSuccess({
        contentId: parseInt(contentId, 10),
        editorialMetadata,
        revision,
      })
    ),
  ];
}

function* watchEditorChange() {
  yield takeLatest(
    [
      EDITOR_DOCUMENT_CHANGE,
      EDITOR_REVISION_CHANGE,
      EDITOR_CREATE_REVISION.SUCCESS,
      EDITOR_CREATE_CONTENT.SUCCESS,
      EDITOR_LOAD_CONTENT.SUCCESS,
      EDITOR_CREATE_EMTPY_DOCUMENT,
      EDITOR_REMOVE_AUTHOR,
      EDITOR_ADD_AUTHOR,
    ],
    handleEditorChange
  );
}

function* watchEditorPublish() {
  yield takeLatest(EDITOR_PUBLISH_CONTENT.REQUEST, handleEditorPublish);
}

function* watchEditorSave() {
  yield takeLatest(EDITOR_SAVE, handleEditorSave);
}

function* watchEditorLoad() {
  yield takeLatest(EDITOR_LOAD_CONTENT.REQUEST, handleEditorLoad);
}

function* watchEditorChangeRevisionStatus() {
  yield takeLatest(
    EDITOR_CHANGE_REVISION_STATUS.REQUEST,
    handleEditorChangeRevisionStatus
  );
}

export default [
  spawn(watchEditorPublish),
  spawn(watchEditorSave),
  spawn(watchEditorLoad),
  spawn(watchEditorChange),
  spawn(watchEditorChangeRevisionStatus),
];
