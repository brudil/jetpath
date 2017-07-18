import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as rootReducer from '../reducers/index';

const sagaMiddleware = createSagaMiddleware();

const finalCreateStore = compose(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(ReduxThunk),
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(
    combineReducers({
      ...rootReducer,
    }),
    initialState
  );

  store.sagaMiddleware = sagaMiddleware;

  return store;
}
