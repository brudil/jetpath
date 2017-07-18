import merge from 'lodash/merge';
import { modelReducer, formReducer } from 'react-redux-form';

export function entities(
  state = {
    users: {},
    contentList: {},
    media: {},
    notifications: {},
    sections: {},
    topics: {},
    content: {},
    vertical: {},
    contentRevision: {},
  },
  action
) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }

  return state;
}

export { default as contentList } from '../ducks/ContentList';
export { default as mediaList } from '../ducks/MediaList';
export { default as modalManager } from './ModalManagerReducer';
export { default as mediamodal } from './MediaEditModalReducer';
export { default as auth } from '../ducks/Auth';
export { default as topics } from '../ducks/Topic';
export { default as organisation } from '../ducks/Organisation';
// export { default as uploadProgress } from './UploadProgressReducer';
export { default as editor } from './EditorReducer';
export { default as users } from '../ducks/User';
export { default as notification } from '../ducks/Notification';
export { default as toasts } from '../ducks/Toast';
export { default as verticals } from '../ducks/Vertical';

export const sectionEdit = modelReducer('sectionEdit');
export const sectionEditForm = formReducer('sectionEdit');

export const topicEdit = modelReducer('topicEdit');
export const topicEditForm = formReducer('topicEdit');
