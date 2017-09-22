import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import * as rootReducer from '../reducers/index';

export default function configureStore({ apolloClient }) {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const finalCreateStore = composeEnhancers(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(ReduxThunk),
    applyMiddleware(
      createLogger({
        collapsed: true,
      })
    ),
    applyMiddleware(apolloClient.middleware()),
  )(createStore);

  const store = finalCreateStore(
    combineReducers({
      ...rootReducer,
      apollo: apolloClient.reducer(),
    })
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
