import { action } from './utils';
import { CREATE_TOAST, REMOVE_TOAST } from '../constants/ActionTypes';

export const createToast = (title, message, preset) =>
  action(CREATE_TOAST, { title, message, preset });
export const removeToast = id => action(REMOVE_TOAST, { id });
