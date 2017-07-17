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

export { default as contentList } from './ContentListReducer';
export { default as mediaList } from './MediaListReducer';
export { default as modalManager } from './ModalManagerReducer';
export { default as mediamodal } from './MediaEditModalReducer';
export { default as auth } from './AuthReducer';
export { default as topics } from './TopicsReducer';
export { default as organisation } from './OrganisationReducer';
// export { default as uploadProgress } from './UploadProgressReducer';
export { default as editor } from './EditorReducer';
export { default as users } from './UserReducer';
export { default as notification } from './NotificationReducer';
export { default as toasts } from './ToastReducer';
export { default as verticals } from './VerticalReducer';

export const sectionEdit = modelReducer('sectionEdit');
export const sectionEditForm = formReducer('sectionEdit');

export const topicEdit = modelReducer('topicEdit');
export const topicEditForm = formReducer('topicEdit');
