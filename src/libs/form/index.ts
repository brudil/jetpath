import flow from 'lodash/flow';

import * as formly from './middleware';
import {RootState} from "../../types";
import {Dispatch} from "redux";
import {Middleware} from "./middleware";

export { formly };

export function createChangeHandler(dispatch: Dispatch<RootState>, action: any) { // todo
  return (path: string[] | string, ...middleware: Middleware[]) => (event: any) => {
    let value = event;
    if (middleware.length > 0) {
      value = flow(middleware)(value);
    }
    dispatch(action(Array.isArray(path) ? path : [path], value));
  };
}

export function createChangeHandlerBound(action: any) { // todo
  return (path: string[] | string, ...middleware: Middleware[]) => (event: any) => {
    let value = event;
    if (middleware.length > 0) {
      value = flow(middleware)(value);
    }
    action(Array.isArray(path) ? path : [path], value);
  };
}
