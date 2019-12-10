import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from '../reducers/index';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {

  const reducer = combineReducers(rootReducer as any);
  const store = createStore(reducer, applyMiddleware(ReduxThunk, sagaMiddleware));

  (store as any).sagaMiddleware = sagaMiddleware;

  return store;
}
