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
  ChangesetInstruction,
  ElementPath,
} from '../libs/spectrum2/interfaces';
import { ArticleSubtype } from '../libs/spectrum2/structure';
import { applyChangeset, changeSubtype } from '../libs/spectrum2/changes';
import { createDocument, filterDocument } from '../libs/spectrum2/helpers';
import { getWordCount } from '../libs/spectrum2/utils';
import { WorksClient, MediaClient, InteractivesClient } from '../serverAPI';
import { action as makeAction, createRequestTypes } from '../utils';
import getVertical from '../sagas/getVertical';
import {
  createToast,
  createToastWithActionable,
  dismissToastAction,
  ButtonTypes,
} from './Toast';

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
const EDITOR_SEEN_HINT = 'EDITOR_SEEN_HINT';
const EDITOR_SET_FOCUS = 'EDITOR_SET_FOCUS';
const EDITOR_TOGGLE_COMMAND_PALETTE = 'EDITOR_TOGGLE_COMMAND_PALETTE';
const EDITOR_ELEMENT_PANEL = 'EDITOR_ELEMENT_PANEL';

// ACTIONS
export const loadContent = (contentId: number) =>
  makeAction(EDITOR_LOAD_CONTENT.REQUEST, { contentId });
export const publish = () => makeAction(EDITOR_PUBLISH_CONTENT.REQUEST);
export const publishSuccess = (
  payload: any // todo: these payload: any
) => makeAction(EDITOR_PUBLISH_CONTENT.SUCCESS, payload);

export const loadContentSuccess = (payload: any) =>
  makeAction(EDITOR_LOAD_CONTENT.SUCCESS, payload);

export const createEmptyDocument = () =>
  makeAction(EDITOR_CREATE_EMTPY_DOCUMENT);
export const updateSpectrumDocument = (changeset: any) =>
  makeAction(EDITOR_DOCUMENT_CHANGE, { changeset });
export const updateRevision = (path: any, value: any) =>
  makeAction(EDITOR_REVISION_CHANGE, { path, value });

export const changeDocumentSubtype = (subtypeElement: any) => ({
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
export const createRevisionSuccess = (payload: any) =>
  makeAction(EDITOR_CREATE_REVISION.SUCCESS, payload);
export const createContentSuccess = (payload: any) =>
  makeAction(EDITOR_CREATE_CONTENT.SUCCESS, payload);

export const changeRevisionStatus = (status: any) =>
  makeAction(EDITOR_CHANGE_REVISION_STATUS.REQUEST, { status });
export const changeRevisionStatusSuccess = (payload: any) =>
  makeAction(EDITOR_CHANGE_REVISION_STATUS.SUCCESS, payload);

export const addAuthor = (id: number) => makeAction(EDITOR_ADD_AUTHOR, { id });
export const removeAuthor = (id: number) =>
  makeAction(EDITOR_REMOVE_AUTHOR, { id });

export const seenHint = (name: string) => ({
  type: EDITOR_SEEN_HINT,
  payload: { name },
});

export const setInsertFocus = (path: ElementPath) => ({
  type: EDITOR_SET_FOCUS,
  payload: { path, focusType: 'INSERTER' },
});

export const setElementFocus = (path: ElementPath) => ({
  type: EDITOR_SET_FOCUS,
  payload: { path, focusType: 'ELEMENT' },
});

export const togglePanel = (options: { open: boolean }) => ({
  type: EDITOR_ELEMENT_PANEL,
  payload: { open: options.open },
});

export const toggleCommandPalette = (options: { open: boolean }) => ({
  type: EDITOR_TOGGLE_COMMAND_PALETTE,
  payload: { open: options.open },
});

const EditorHints = Immutable.Record({
  moveToDraftingWordCount: false,
});

// REDUCER
const initialState = Immutable.Map({
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
  stats: Immutable.Map({
    wordCount: null,
  }),
  hints: new EditorHints(),
  focus: Immutable.Map({
    focusPath: Immutable.List(['content']),
    focusType: 'INSERTER',
    hasPanelOpen: false,
    commandPaletteOpen: false,
    commandPaletteCommand: '',
  }),
});

function createEmptyDocumentUtil() {
  return applyChangeset(createDocument(), changeSubtype(ArticleSubtype));
}

function createEmptyRevision() {
  return Immutable.Map({
    authors: Immutable.Set(),
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
    topics: Immutable.Set(),
    status: 1,
    byline_markup: '',
  });
}

function createImmutableRevision(revision: Object) {
  return Immutable.fromJS(revision, (key, value) => {
    if (Immutable.isIndexed(value)) {
      if (['topics', 'authors'].indexOf(`${key}`) !== -1) {
        return value.toSet();
      }
      return value.toList();
    }

    return value.toMap();
  });
}

export default function EditorReducer(state = initialState, action: any) {
  switch (action.type) {
    case EDITOR_LOAD_CONTENT.REQUEST: {
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
          .set('hints', new EditorHints())
      );
    }
    case EDITOR_CREATE_EMTPY_DOCUMENT: {
      const document = createEmptyDocumentUtil();
      const revision = createEmptyRevision();
      return state.withMutations(map =>
        map
          .set('editorialMetadata', null)
          .set('workingDocument', document)
          .set('workingRevision', revision as any) // todo: anys
          .set('savedDocument', document)
          .set('savedRevision', revision as any)
          .set('isLocal', true)
          .set('remoteId', null)
          .set('hints', new EditorHints())
      );
    }
    case EDITOR_SAVE: {
      return state.set('isSaving', true);
    }
    case EDITOR_SAVE_FAILURE: {
      return state.set('isSaving', false);
    }
    case EDITOR_SET_FOCUS: {
      const prevElement = state.getIn(['focus', 'focusPath']);
      let nextState = state
        .setIn(['focus', 'focusPath'], Immutable.fromJS(action.payload.path))
        .setIn(['focus', 'focusType'], action.payload.focusType)
        .setIn(['focus', 'commandPaletteOpen'], false);

      if (prevElement.equals(state.getIn(['focus', 'focusPath']))) {
        nextState = nextState.setIn(['focus', 'hasPanelOpen'], false);
      }

      return nextState;
    }
    case EDITOR_UPDATE_STATS: {
      return state.set('stats', Immutable.fromJS(action.payload));
    }
    case EDITOR_CREATE_REVISION.SUCCESS: {
      const revisionPayload = createImmutableRevision(action.revision);
      const document = revisionPayload.get('spectrum_document');
      const revision = revisionPayload.delete('spectrum_document');
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
      let newState = state.updateIn(['workingDocument'], document =>
        applyChangeset(document, action.changeset)
      );

      if (action.changeset.instruction === ChangesetInstruction.INSERT) {
        newState = newState
          .setIn(
            ['focus', 'focusPath'],
            Immutable.fromJS(action.changeset.path).push(
              action.changeset.position
            )
          )
          .setIn(['focus', 'focusType'], 'ELEMENT')
          .setIn(['focus', 'commandPaletteOpen'], false);
      }

      return newState;
    }
    case EDITOR_TOGGLE_COMMAND_PALETTE: {
      return state.setIn(['focus', 'commandPaletteOpen'], action.payload.open);
    }
    case EDITOR_ELEMENT_PANEL: {
      return state.setIn(['focus', 'hasPanelOpen'], action.payload.open);
    }
    case EDITOR_REVISION_CHANGE: {
      return state.setIn(['workingRevision', ...action.path], action.value);
    }
    case EDITOR_CHANGE_REVISION_STATUS.SUCCESS: {
      return state
        .setIn(['savedRevision', 'status'], action.status)
        .setIn(['workingRevision', 'status'], action.status);
    }
    case EDITOR_ADD_AUTHOR: {
      return state.update('workingRevision', (
        rev: any // todo: anys
      ) =>
        rev.updateIn(['authors'], (authorList: any) =>
          authorList.add(action.id)
        )
      );
    }
    case EDITOR_SEEN_HINT: {
      return state.setIn(['hints', action.payload.name], true);
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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function entities(payload: any) {
  return { type: 'ENTITIES', payload };
}

function* handleEditorSave() {
  const vertical = yield getVertical();
  const editorState = yield select((state: any) => state.editor);
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

    if (
      editorState.getIn(['editorialMetadata', 'published_revision']) !== null
    ) {
      yield put(
        createToastWithActionable({
          title: 'New revisions are not published automatically',
          message: 'Would you like to publish this revision?',
          preset: 'info',
          actions: [
            {
              title: 'Dismiss',
              action: dismissToastAction,
              type: ButtonTypes.DULL,
            },
            {
              title: 'Publish new revision',
              action: () => publish(),
              type: ButtonTypes.ACTION,
            },
          ],
        })
      );
    }
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
  const editorState = yield select((state: any) => state.editor);

  const response = yield call(
    WorksClient.publishRevision,
    editorState.getIn(['savedRevision', 'id'])
  );
  const editorialMetadata =
    response.payload.entities.editorialMetadata[response.payload.result];
  yield put(publishSuccess({ editorialMetadata }));
}

function* loadMissingResourcesForRevision(
  revision: any,
  spectrum_document: any
) {
  // todo: anys
  const foundResources = filterDocument(
    spectrum_document,
    _el => true
    //      el instanceof resources.Resource ||
    //      el instanceof resources.LowdownInteractiveResource
  );

  // IMAGES
  const imageEntities = yield select((state: any) => state.entities.media);

  const missingIds: number[] = [];

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
    (state: any) => state.entities.interactivees
  );

  const missingSlugs: string[] = [];

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
    yield put(entities(payload));
  }
}

function* handleEditorChange() {
  yield call(delay, 200);
  const editorState = yield select((state: any) => state.editor);

  const serverMutableFields = [
    'updated',
    'created',
    'id',
    'content',
    'revision_number',
    'preview_key',
  ];
  const removeServerMutableFields = (
    rev: any // todo
  ) =>
    rev.merge(
      serverMutableFields.reduce(
        (state: any, fieldName) => state.set(fieldName, null), // todo: state: any
        Immutable.Map()
      )
    );

  const serverMutableDocumentFields = ['version'];
  const removeServerMutableDocumentFields = (
    rev: any // todo
  ) =>
    rev.merge(
      serverMutableDocumentFields.reduce(
        (state: any, fieldName) => state.set(fieldName, null), // todo: state: any
        Immutable.Map()
      )
    );

  const documentEqual = Immutable.is(
    removeServerMutableDocumentFields(editorState.get('workingDocument')),
    removeServerMutableDocumentFields(editorState.get('savedDocument'))
  );
  const revisionEqual = Immutable.is(
    removeServerMutableFields(editorState.get('workingRevision')),
    removeServerMutableFields(editorState.get('savedRevision'))
  );

  if (!documentEqual) {
    console.log({
      workingDocument: JSON.stringify(
        removeServerMutableDocumentFields(
          editorState.get('workingDocument')
        ).toJSON()
      ),
      savedDocument: JSON.stringify(
        removeServerMutableDocumentFields(
          editorState.get('savedDocument')
        ).toJSON()
      ),
    });
  }

  if (!revisionEqual) {
    console.log({
      workingRevision: JSON.stringify(
        removeServerMutableFields(editorState.get('workingRevision')).toJSON()
      ),
      savedRevision: JSON.stringify(
        removeServerMutableFields(editorState.get('savedRevision')).toJSON()
      ),
    });
  }

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
  const editorState = yield select((state: any) => state.editor);

  const workingRev = editorState.get('workingRevision');
  const workingDoc = editorState.get('workingDocument');
  if (workingRev && workingDoc) {
    yield spawn(loadMissingResourcesForRevision, workingRev, workingDoc);
  }
}

function* handleEditorChangeRevisionStatus({ status }: { status: number }) {
  const editorState = yield select((state: any) => state.editor);

  yield call(
    WorksClient.revisionStatusChange,
    editorState.getIn(['savedRevision', 'id']),
    status
  );
  yield put(changeRevisionStatusSuccess({ status }));
}

function* handleEditorLoad({ contentId }: { contentId: string }) {
  const [revisionPayload, editorialMetadataPayload] = yield [
    call(WorksClient.getRevision as any, contentId), // todo
    call(WorksClient.getEditorialMetadata as any, contentId),
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
    spawn(
      loadMissingResourcesForRevision,
      Immutable.fromJS(revision),
      Immutable.fromJS(revision.spectrum_document)
    ),
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
  const editor = yield select((state: any) => state.editor);

  const wordCount = getWordCount(editor.get('workingDocument'));

  if (
    !editor.get('isLocal') &&
    wordCount > 60 &&
    editor.getIn(['hints', 'moveToDraftingWordCount']) !== true &&
    editor.getIn(['savedRevision', 'status']) < 5
  ) {
    yield put(
      createToastWithActionable({
        title: 'Move to drafting?',
        message: 'There are words now! Stubs are just for headline ideas.',
        preset: 'info',
        actions: [
          {
            title: 'Keep as idea',
            action: dismissToastAction,
            type: ButtonTypes.DULL,
          },
          {
            title: 'Move to drafts',
            action: () => changeRevisionStatus(5),
            type: ButtonTypes.ACTION,
          },
        ],
      })
    );
    yield put(seenHint('moveToDraftingWordCount'));
  }

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
