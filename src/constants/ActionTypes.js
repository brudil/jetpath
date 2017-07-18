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
