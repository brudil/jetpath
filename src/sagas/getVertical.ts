import { select } from 'redux-saga/effects';
import { RootState } from '../types';

export default function* getVertical() {
  return yield select(
    (state: RootState) => state.verticals.selectedVertical.identifier
  );
}
