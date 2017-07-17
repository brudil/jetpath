import {
  AUTH_RESTORE,
  AUTH_LOGOUT,
  AUTH_LOGIN,
} from '../constants/ActionTypes';

const initialState = {
  auth: null,
  loading: false,
  attempted: false,
  error: null,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN.FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case AUTH_LOGIN.SUCCESS:
      return {
        ...state,
        auth: action.payload.data,
      };
    case AUTH_RESTORE.SUCCESS:
      return {
        ...state,
        auth: action.payload.data,
        attempted: true,
      };
    case AUTH_RESTORE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_RESTORE.FAILURE:
      return {
        ...state,
        loading: false,
        attempted: true,
      };
    case AUTH_LOGOUT.SUCCESS:
      return {
        ...state,
        attemped: true,
        auth: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
