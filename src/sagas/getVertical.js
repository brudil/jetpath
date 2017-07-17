import { select } from 'redux-saga/effects';

export default function* getVertical() {
  return yield select(state => state.verticals.selectedVertical.identifier);
}
