import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as rootReducer from '../reducers/index';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(ReduxThunk),
    // If you are using the devToolsExtension, you can add it here also
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )(createStore);

  const store = finalCreateStore(
    combineReducers({
      ...rootReducer,
    })
  );

  store.sagaMiddleware = sagaMiddleware;

  return store;
}
