import flow from 'lodash/flow';

import * as formly from './middleware';

export { formly };

export function createChangeHandler(dispatch, action) {
  return (path, ...middleware) => event => {
    let value = event;
    if (middleware.length > 0) {
      value = flow(middleware)(value);
    }
    dispatch(action(Array.isArray(path) ? path : [path], value));
  };
}
