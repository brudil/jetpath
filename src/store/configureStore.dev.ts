import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import {rootReducer} from '../reducers/index';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const reducers = combineReducers(rootReducer as any);

  const store = createStore(reducers, applyMiddleware(sagaMiddleware, ReduxThunk,       createLogger({
      collapsed: true,
    })
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');

      store.replaceReducer(nextRootReducer);
    });
  }

  (store as any).sagaMiddleware = sagaMiddleware;

  return store;
}
