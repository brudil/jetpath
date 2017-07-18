import constance from 'constance';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => {
    const constant = `${base}_${type}`;
    res[type] = constant;
    return constant;
  });
  return res;
}

// sparkly new stuff
export const NOTIFICATION_UNREAD_COUNT = createRequestTypes(
  'NOTIFICATION_UNREAD_COUNT'
);

// new mishmash

export const GET_USER_SUGGESTIONS = 'GET_USER_SUGGESTIONS';

export const EDITOR_LOAD_CONTENT = createRequestTypes('EDITOR_LOAD_CONTENT');
export const EDITOR_PUBLISH_CONTENT = createRequestTypes(
  'EDITOR_PUBLISH_CONTENT'
);
export const EDITOR_CHANGE_REVISION_STATUS = createRequestTypes(
  'EDITOR_CHANGE_REVISION_STATUS'
);

export const EDITOR_CREATE_EMTPY_DOCUMENT = 'EDITOR_CREATE_EMTPY_DOCUMENT';
export const EDITOR_DOCUMENT_CHANGE = 'EDITOR_DOCUMENT_CHANGE';
export const EDITOR_REVISION_CHANGE = 'EDITOR_REVISION_CHANGE';
export const EDITOR_REMOVE_AUTHOR = 'EDITOR_REMOVE_AUTHOR';
export const EDITOR_ADD_AUTHOR = 'EDITOR_ADD_AUTHOR';
export const EDITOR_CHANGE_STATE_CHANGED = 'EDITOR_CHANGE_STATE_CHANGED';

export const EDITOR_SAVE = 'EDITOR_SAVE';
export const EDITOR_CREATE_REVISION = createRequestTypes(
  'EDITOR_CREATE_REVISION'
);
export const EDITOR_CREATE_CONTENT = createRequestTypes(
  'EDITOR_CREATE_CONTENT'
);

// organisational actions

export const GET_ALL_SECTIONS = 'GET_ALL_SECTIONS';
export const FETCH_ALL_SECTIONS = createRequestTypes('FETCH_ALL_SECTIONS');
export const ORGANISATION_SAVE_SECTION = createRequestTypes(
  'ORGANISATION_SAVE_SECTION'
);
export const ORGANISATION_SAVE_TOPIC = createRequestTypes(
  'ORGANISATION_SAVE_TOPIC'
);
export const ORGANISATION_SELECT_SECTION = 'ORGANISATION_SELECT_SECTION';
export const ORGANISATION_SELECT_TOPIC = 'ORGANISATION_SELECT_TOPIC';
export const ORGANISATION_SELECT_NEW_SECTION =
  'ORGANISATION_SELECT_NEW_SECTION';
export const ORGANISATION_SELECT_NEW_TOPIC = 'ORGANISATION_SELECT_NEW_TOPIC';
export const ORGANISATION_FETCH_TOPICS_FOR_SECTION = createRequestTypes(
  'ORGANISATION_FETCH_TOPICS_FOR_SECTION'
);

// modal
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

// topics component
export const FETCH_SUGGESTED_TOPICS = createRequestTypes(
  'FETCH_SUGGESTED_TOPICS'
);
export const FETCH_TOPICS_FOR_KEYWORD = createRequestTypes(
  'FETCH_TOPICS_FOR_KEYWORD'
);

// old

export default constance('jetpath/', {
  // Media Modal
  MEDIA_MODAL_SHOW: null,
  MEDIA_MODAL_CLOSE: null,
  MEDIA_MODAL_FETCH: null,
  MEDIA_MODAL_UPDATE: null,
  MEDIA_MODAL_SAVE: null,

  // Notification
  NOTIFICATION_UNREAD_COUNT: null,
  NOTIFICATION_FETCH_UNREAD: null,
});
