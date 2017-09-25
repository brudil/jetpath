import Immutable from 'immutable';
import {
  spawn,
  call,
  put,
  select,
  takeLatest,
  throttle,
} from 'redux-saga/effects';
import find from 'lodash/find';
import {
  SpectrumDocument,
  resources,
  subtypes,
  fields,
  blocks,
} from '@brudil/spectrum';
import { WorksClient, MediaClient, InteractivesClient } from '../serverAPI';
import { action as makeAction, createRequestTypes } from '../utils';
import getVertical from '../sagas/getVertical';
import { createToast } from './Toast';

const EDITOR_LOAD_CONTENT = createRequestTypes('EDITOR_LOAD_CONTENT');
const EDITOR_PUBLISH_CONTENT = createRequestTypes('EDITOR_PUBLISH_CONTENT');
const EDITOR_CHANGE_REVISION_STATUS = createRequestTypes(
  'EDITOR_CHANGE_REVISION_STATUS'
);
const EDITOR_CREATE_EMTPY_DOCUMENT = 'EDITOR_CREATE_EMTPY_DOCUMENT';
const EDITOR_DOCUMENT_CHANGE = 'EDITOR_DOCUMENT_CHANGE';
const EDITOR_REVISION_CHANGE = 'EDITOR_REVISION_CHANGE';
const EDITOR_REMOVE_AUTHOR = 'EDITOR_REMOVE_AUTHOR';
const EDITOR_UPDATE_STATS = 'EDITOR_UPDATE_STATS';
const EDITOR_ADD_AUTHOR = 'EDITOR_ADD_AUTHOR';
const EDITOR_CHANGE_STATE_CHANGED = 'EDITOR_CHANGE_STATE_CHANGED';
const EDITOR_SAVE = 'EDITOR_SAVE';
const EDITOR_SAVE_FAILURE = 'EDITOR_SAVE_FAILURE';
const EDITOR_CHANGE_SUBTYPE = 'EDITOR_CHANGE_SUBTYPE';
const EDITOR_CREATE_REVISION = createRequestTypes('EDITOR_CREATE_REVISION');
const EDITOR_CREATE_CONTENT = createRequestTypes('EDITOR_CREATE_CONTENT');
const EDITOR_OPEN_COMMENT_PANEL = 'EDITOR_OPEN_COMMENTS_PANEL';
const EDITOR_CLOSE_COMMENT_PANEL = 'EDITOR_CLOSE_COMMENTS_PANEL';

// ACTIONS
export const loadContent = contentId =>
  makeAction(EDITOR_LOAD_CONTENT.REQUEST, { contentId });
export const publish = () => makeAction(EDITOR_PUBLISH_CONTENT.REQUEST);
export const publishSuccess = payload =>
  makeAction(EDITOR_PUBLISH_CONTENT.SUCCESS, payload);

export const loadContentSuccess = payload =>
  makeAction(EDITOR_LOAD_CONTENT.SUCCESS, payload);

export const createEmptyDocument = () =>
  makeAction(EDITOR_CREATE_EMTPY_DOCUMENT);
export const updateSpectrumDocument = changeset =>
  makeAction(EDITOR_DOCUMENT_CHANGE, { changeset });
export const updateRevision = (path, value) =>
  makeAction(EDITOR_REVISION_CHANGE, { path, value });

export const changeDocumentSubtype = subtypeElement => ({
  type: EDITOR_CHANGE_SUBTYPE,
  payload: {
    element: subtypeElement,
  },
});

export const openCommentPanel = () => ({
  type: EDITOR_OPEN_COMMENT_PANEL,
});

export const closeCommentPanel = () => ({
  type: EDITOR_CLOSE_COMMENT_PANEL,
});

export const save = () => makeAction(EDITOR_SAVE);
export const createRevisionSuccess = payload =>
  makeAction(EDITOR_CREATE_REVISION.SUCCESS, payload);
export const createContentSuccess = payload =>
  makeAction(EDITOR_CREATE_CONTENT.SUCCESS, payload);

export const changeRevisionStatus = status =>
  makeAction(EDITOR_CHANGE_REVISION_STATUS.REQUEST, { status });
export const changeRevisionStatusSuccess = payload =>
  makeAction(EDITOR_CHANGE_REVISION_STATUS.SUCCESS, payload);

export const addAuthor = id => makeAction(EDITOR_ADD_AUTHOR, { id });
export const removeAuthor = id => makeAction(EDITOR_REMOVE_AUTHOR, { id });

// REDUCER
const initialState = new Immutable.Map({
  remoteId: null,
  isLocal: true,
  workingRevision: null,
  commentPanelOpen: false,
  workingDocument: null,
  savedRevision: null,
  savedDocument: null,
  editorialMetadata: null,
  isSaving: false,
  hasChangesFromSaved: false,
  stats: new Immutable.Map({
    wordCount: null,
  }),
});

function createEmptyDocumentUtil() {
  const document = new SpectrumDocument();
  document.content = new subtypes.ArticleSubtype();

  return Immutable.fromJS(document.toJS());
}

function createEmptyRevision() {
  return new Immutable.Map({
    authors: new Immutable.Set(),
    form: 1,
    headline: '',
    short_headline: '',
    poster_image: null,
    kicker: '',
    standfirst: '',
    slug: '',
    tone: 1,
    section: null,
    series: null,
    topics: new Immutable.Set(),
    status: 1,
    byline_markup: '',
  });
}

const applyDocumentChange = changeset => document => {
  switch (changeset.command) {
    case 'insert': {
      const elementStructure = Immutable.fromJS(
        new fields.ElementField().toJS(changeset.element)
      );
      return document.updateIn(changeset.path, arr => {
        console.log(arr.splice(changeset.position, 0, elementStructure));
        return arr.splice(changeset.position, 0, elementStructure);
      });
    }
    case 'update': {
      return document.setIn(changeset.path, changeset.value);
    }
    case 'remove': {
      const last = changeset.path.pop();
      const allBut = changeset.path;
      return document.updateIn(allBut, stream => stream.delete(last));
    }
    case 'move': {
      const last = changeset.path.pop();
      const allBut = changeset.path;
      return document.updateIn(allBut, stream => {
        const selectedElement = stream.get(last);
        return stream
          .splice(last, 1)
          .splice(last + changeset.position, 0, selectedElement);
      });
    }
    default: {
      throw new Error(`unsupported changeset command: ${changeset.command}`);
    }
  }
};

function createImmutableRevision(revision) {
  return Immutable.fromJS(revision, (key, value) => {
    if (Immutable.Iterable.isIndexed(value)) {
      if (['topics', 'authors'].indexOf(key) !== -1) {
        return value.toSet();
      }
      return value.toList();
    }

    return value.toMap();
  });
}

export default function EditorReducer(state = initialState, action) {
  switch (action.type) {
    case EDITOR_LOAD_CONTENT.REQUEST: {
      console.log(action);
      return state;
    }
    case EDITOR_LOAD_CONTENT.SUCCESS: {
      const revisionPayload = createImmutableRevision(action.revision);
      const document = revisionPayload.get('spectrum_document');
      const revision = revisionPayload.delete('spectrum_document');

      const editorialMetadata = Immutable.fromJS(action.editorialMetadata);

      return state.withMutations(map =>
        map
          .set('editorialMetadata', editorialMetadata)
          .set('workingDocument', document)
          .set('workingRevision', revision)
          .set('savedDocument', document)
          .set('savedRevision', revision)
          .set('remoteId', action.contentId)
          .set('isLocal', false)
      );
    }
    case EDITOR_CREATE_EMTPY_DOCUMENT: {
      const document = createEmptyDocumentUtil();
      const revision = createEmptyRevision();
      return state.withMutations(map =>
        map
          .set('editorialMetadata', null)
          .set('workingDocument', document)
          .set('workingRevision', revision)
          .set('savedDocument', document)
          .set('savedRevision', revision)
          .set('isLocal', true)
          .set('remoteId', null)
      );
    }
    case EDITOR_CHANGE_SUBTYPE:
      const subtype = action.payload.element;
      const subtypeVanilla = new fields.ElementField().toJS(subtype);
      const subtypeImmutable = Immutable.fromJS(subtypeVanilla);
      console.log(subtype, subtypeVanilla, subtypeImmutable);
      return state.setIn(['workingDocument', 'content'], subtypeImmutable);
    case EDITOR_SAVE: {
      return state.set('isSaving', true);
    }
    case EDITOR_SAVE_FAILURE: {
      return state.set('isSaving', false);
    }
    case EDITOR_UPDATE_STATS: {
      return state.set('stats', Immutable.fromJS(action.payload));
    }
    case EDITOR_CREATE_REVISION.SUCCESS: {
      const revisionPayload = createImmutableRevision(action.revision);
      const document = revisionPayload.get('spectrum_document');
      const revision = revisionPayload.delete('spectrum_document');
      console.log(revision.get('revision_number'));
      return state.withMutations(map =>
        map
          .set('isSaving', false)
          .set('isLocal', false)
          .set('remoteId', action.contentId)
          .set('savedDocument', document)
          .set('savedRevision', revision)
      );
    }
    case EDITOR_PUBLISH_CONTENT.SUCCESS: {
      return state.set(
        'editorialMetadata',
        Immutable.fromJS(action.editorialMetadata)
      );
    }
    case EDITOR_CREATE_CONTENT.SUCCESS: {
      const revisionPayload = createImmutableRevision(action.revision);
      const document = revisionPayload.get('spectrum_document');
      const revision = revisionPayload.delete('spectrum_document');
      const editorialMetadata = Immutable.fromJS(action.metadata);

      return state.withMutations(map =>
        map
          .set('isSaving', false)
          .set('isLocal', false)
          .set('remoteId', action.contentId)
          .set('savedDocument', document)
          .set('savedRevision', revision)
          .set('editorialMetadata', editorialMetadata)
      );
    }
    case EDITOR_DOCUMENT_CHANGE: {
      return state.updateIn(
        ['workingDocument'],
        applyDocumentChange(action.changeset)
      );
    }
    case EDITOR_REVISION_CHANGE: {
      return state.setIn(['workingRevision', ...action.path], action.value);
    }
    case EDITOR_CHANGE_REVISION_STATUS.SUCCESS: {
      return state.setIn(['savedRevision', 'status'], action.status);
    }
    case EDITOR_ADD_AUTHOR: {
      return state.update('workingRevision', rev =>
        rev.updateIn(['authors'], authorList => authorList.add(action.id))
      );
    }
    case EDITOR_REMOVE_AUTHOR: {
      return state.updateIn(['workingRevision', 'authors'], authorList =>
        authorList.delete(action.id)
      );
    }
    case EDITOR_CHANGE_STATE_CHANGED: {
      return state.set('hasChangesFromSaved', action.hasChangesFromSaved);
    }
    case EDITOR_OPEN_COMMENT_PANEL: {
      return state.set('commentPanelOpen', true);
    }
    case EDITOR_CLOSE_COMMENT_PANEL: {
      return state.set('commentPanelOpen', false);
    }
    default:
      return state;
  }
}

// SAGA
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

  try {
    if (!isLocal) {
      response = yield call(WorksClient.saveRevision, revisionWithDocument);
    } else {
      response = yield call(
        WorksClient.saveNewContent,
        vertical,
        revisionWithDocument
      );
    }
  } catch (error) {
    yield put(
      createToast(
        'Failed to save!',
        `An error occurred that stopped this being saved. ${JSON.stringify(
          error.json.data
        )}`,
        'error'
      )
    );
    yield put({
      type: EDITOR_SAVE_FAILURE,
    });
    return;
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

function* loadMissingResourcesForRevision(revision, spectrum_document) {
  console.log('LOADIN MISSING: rev: ', revision);

  const foundResources = SpectrumDocument.fromJS(spectrum_document)
    .getElements()
    .filter(
      el =>
        el instanceof resources.Resource ||
        el instanceof resources.LowdownInteractiveResource
    );

  // IMAGES
  const imageEntities = yield select(state => state.entities.media);

  const missingIds = [];

  const usedIds = foundResources.map(resource => resource.id);
  usedIds.push(revision.poster_image);
  usedIds.forEach(resourceId => {
    if (resourceId !== null && missingIds.indexOf(resourceId) < 0) {
      const isMissing = !Object.hasOwnProperty.call(imageEntities, resourceId);
      if (isMissing) {
        missingIds.push(resourceId);
      }
    }
  });

  if (missingIds.length > 0) {
    const payload = yield call(MediaClient.getMultiple, missingIds);
    yield put(entities(payload));
  }

  // INTERACTIVES
  const interactivesEntities = yield select(
    state => state.entities.interactivees
  );

  const missingSlugs = [];

  const usedSlugs = foundResources.map(resource => resource.slug);
  usedSlugs.forEach(interactiveSlug => {
    if (interactiveSlug !== null && missingSlugs.indexOf(interactiveSlug) < 0) {
      const isMissing =
        find(interactivesEntities, interactiveSlug) === undefined;
      if (isMissing) {
        missingSlugs.push(interactiveSlug);
      }
    }
  });

  if (missingSlugs.length > 0) {
    const payload = yield call(InteractivesClient.getMultiple, missingSlugs);
    console.log('missingSlugs', missingSlugs, payload);
    yield put(entities(payload));
  }
}

function* handleEditorChange() {
  yield call(delay, 200);
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

function* handleLoadResourcesOnChange() {
  const editorState = yield select(state => state.editor);

  const workingRev = editorState.get('workingRevision');
  const workingDoc = editorState.get('workingDocument');
  if (workingRev && workingDoc) {
    yield spawn(loadMissingResourcesForRevision, workingRev.toJS(), workingDoc.toJS());
  }
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
    spawn(loadMissingResourcesForRevision, revision, revision.spectrum_document),
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

function* updateStats() {
  const editor = yield select(state => state.editor);

  const filteredBlocks = SpectrumDocument.fromJS(
    editor.get('workingDocument').toJS()
  )
    .getElements()
    .filter(element => element instanceof blocks.TextBlock);
  const wordCount = filteredBlocks.reduce(
    (total, textBlock) =>
      total +
      textBlock.text.text.trim().replace(/\s+/gi, ' ').split(' ').length,
    0
  );

  yield put({ type: EDITOR_UPDATE_STATS, payload: { wordCount } });
}

export function* saga() {
  yield takeLatest(EDITOR_PUBLISH_CONTENT.REQUEST, handleEditorPublish);
  yield takeLatest(EDITOR_SAVE, handleEditorSave);
  yield takeLatest(EDITOR_LOAD_CONTENT.REQUEST, handleEditorLoad);
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
  yield throttle(
    2200,
    [
      EDITOR_DOCUMENT_CHANGE,
      EDITOR_REVISION_CHANGE,
      EDITOR_CREATE_EMTPY_DOCUMENT,
      EDITOR_LOAD_CONTENT.SUCCESS,
    ],
    handleLoadResourcesOnChange
  );
  yield throttle(
    2200,
    [
      EDITOR_DOCUMENT_CHANGE,
      EDITOR_CREATE_EMTPY_DOCUMENT,
      EDITOR_LOAD_CONTENT.SUCCESS,
    ],
    updateStats
  );
  try {
    yield takeLatest(
      EDITOR_CHANGE_REVISION_STATUS.REQUEST,
      handleEditorChangeRevisionStatus
    );
  } catch (error) {
    console.warn(error);
  }
}
