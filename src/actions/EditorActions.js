import {
  EDITOR_LOAD_CONTENT,
  EDITOR_CREATE_EMTPY_DOCUMENT,
  EDITOR_DOCUMENT_CHANGE,
  EDITOR_REVISION_CHANGE,
  EDITOR_SAVE,
  EDITOR_ADD_AUTHOR,
  EDITOR_REMOVE_AUTHOR,
  EDITOR_PUBLISH_CONTENT,
  EDITOR_CREATE_CONTENT,
  EDITOR_CREATE_REVISION,
  EDITOR_CHANGE_REVISION_STATUS,
} from '../constants/ActionTypes';
import { action } from './utils';

export const loadContent = contentId =>
  action(EDITOR_LOAD_CONTENT.REQUEST, { contentId });
export const publish = () => action(EDITOR_PUBLISH_CONTENT.REQUEST);
export const publishSuccess = payload =>
  action(EDITOR_PUBLISH_CONTENT.SUCCESS, payload);

export const loadContentSuccess = payload =>
  action(EDITOR_LOAD_CONTENT.SUCCESS, payload);

export const createEmptyDocument = () => action(EDITOR_CREATE_EMTPY_DOCUMENT);
export const updateSpectrumDocument = changeset =>
  action(EDITOR_DOCUMENT_CHANGE, { changeset });
export const updateRevision = (path, value) =>
  action(EDITOR_REVISION_CHANGE, { path, value });

export const save = () => action(EDITOR_SAVE);
export const createRevisionSuccess = payload =>
  action(EDITOR_CREATE_REVISION.SUCCESS, payload);
export const createContentSuccess = payload =>
  action(EDITOR_CREATE_CONTENT.SUCCESS, payload);

export const changeRevisionStatus = status =>
  action(EDITOR_CHANGE_REVISION_STATUS.REQUEST, { status });
export const changeRevisionStatusSuccess = payload =>
  action(EDITOR_CHANGE_REVISION_STATUS.SUCCESS, payload);

export const addAuthor = id => action(EDITOR_ADD_AUTHOR, { id });
export const removeAuthor = id => action(EDITOR_REMOVE_AUTHOR, { id });
