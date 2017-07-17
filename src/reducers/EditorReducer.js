import Immutable from 'immutable';
import { SpectrumDocument, subtypes, fields } from '@brudil/spectrum';
import {
  EDITOR_CREATE_EMTPY_DOCUMENT,
  EDITOR_DOCUMENT_CHANGE,
  EDITOR_REVISION_CHANGE,
  EDITOR_LOAD_CONTENT,
  EDITOR_ADD_AUTHOR,
  EDITOR_REMOVE_AUTHOR,
  EDITOR_SAVE,
  EDITOR_CREATE_REVISION,
  EDITOR_CREATE_CONTENT,
  EDITOR_CHANGE_STATE_CHANGED,
  EDITOR_CHANGE_REVISION_STATUS,
  EDITOR_PUBLISH_CONTENT,
} from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  remoteId: null,
  isLocal: true,
  workingRevision: null,
  workingDocument: null,
  savedRevision: null,
  savedDocument: null,
  editorialMetadata: null,
  isSaving: false,
  hasChangesFromSaved: false,
});

function createEmptyDocument() {
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
      const document = createEmptyDocument();
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
    case EDITOR_SAVE: {
      return state.set('isSaving', true);
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
    default:
      return state;
  }
}
