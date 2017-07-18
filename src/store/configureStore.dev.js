import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import * as rootReducer from '../reducers/index';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const finalCreateStore = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(ReduxThunk),
  applyMiddleware(
    createLogger({
      collapsed: true,
    })
  )
  // DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(
    combineReducers({
      ...rootReducer,
    }),
    initialState
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers'); // eslint-disable-line global-require

      store.replaceReducer(nextRootReducer);
    });
  }

  store.sagaMiddleware = sagaMiddleware;

  return store;
}
