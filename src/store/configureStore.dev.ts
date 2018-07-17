import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import * as rootReducer from '../reducers/index';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const finalCreateStore = composeEnhancers(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(ReduxThunk),
    applyMiddleware(
      createLogger({
        collapsed: true,
      })
    )
  )(createStore);

  const store = finalCreateStore(
    combineReducers({
      ...rootReducer,
    })
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');

      store.replaceReducer(nextRootReducer);
    });
  }

  store.sagaMiddleware = sagaMiddleware;

  return store;
}
