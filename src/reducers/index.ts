import merge from 'lodash/merge';
import { modelReducer, formReducer } from 'react-redux-form';

function entities(
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
  action: any // todo
) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }

  return state;
}
import { reducer as form } from 'redux-form';

import { default as contentList } from '../ducks/ContentList';
import { default as mediaList } from '../ducks/MediaList';
import { default as auth } from '../ducks/Auth';
import { default as topics } from '../ducks/Topic';
import { default as organisation } from '../ducks/Organisation';
import { default as editor } from '../ducks/Editor';
import { default as users } from '../ducks/User';
import { default as authors } from '../ducks/Authors';
import { default as interactives } from '../ducks/Interactives';
import { default as notification } from '../ducks/Notification';
import { default as toasts } from '../ducks/Toast';
import { default as verticals } from '../ducks/Vertical';

const sectionEdit = modelReducer('sectionEdit');
const sectionEditForm = formReducer('sectionEdit');

const topicEdit = modelReducer('topicEdit');
const topicEditForm = formReducer('topicEdit');


export const rootReducer = {
  entities,
  form,
  contentList,
  mediaList,
  auth,
  topics,
  organisation,
  editor,
  users,
  authors,
  interactives,
  notification,
  toasts,
  verticals,
  
  sectionEdit,
  sectionEditForm,
  topicEdit,
  topicEditForm

}

