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
    interactives: {},
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
export { default as modalManager } from '../ducks/Modal';
export { default as mediamodal } from '../ducks/MediaEdit';
export { default as auth } from '../ducks/Auth';
export { default as topics } from '../ducks/Topic';
export { default as organisation } from '../ducks/Organisation';
export { default as editor } from '../ducks/Editor';
export { default as users } from '../ducks/User';
export { default as authors } from '../ducks/Authors';
export { default as interactives } from '../ducks/Interactives';
export { default as notification } from '../ducks/Notification';
export { default as toasts } from '../ducks/Toast';
export { default as verticals } from '../ducks/Vertical';

export const sectionEdit = modelReducer('sectionEdit');
export const sectionEditForm = formReducer('sectionEdit');

export const topicEdit = modelReducer('topicEdit');
export const topicEditForm = formReducer('topicEdit');
