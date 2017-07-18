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

// modal
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

// topics component

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
