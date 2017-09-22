import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as rootReducer from '../reducers/index';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore({ apolloClient }) {
  const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(ReduxThunk),
    applyMiddleware(apolloClient.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )(createStore);

  const store = finalCreateStore(
    combineReducers({
      ...rootReducer,
      apollo: apolloClient.reducer(),
    })
  );

  store.sagaMiddleware = sagaMiddleware;

  return store;
}
