import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Toast from './Toast';
import { removeToast } from '../../ducks/Toast';

import styles from './ToastList.css';
import {bindActionCreators} from "redux";

interface IProps {
  toastList: Array<Immutable.Record.Instance<any>>,
  removeToast: (id: number) => Object,
  dispatch: (action: Object) => void
}

function ToastList(props: IProps) {
  const handleRemove = (id: number) => props.removeToast(id);

  return (
    <ul className={styles.root}>
      {props.toastList.map(toast =>
        <Toast
          key={toast.get('id')}
          id={toast.get('id')}
          title={toast.get('title')}
          message={toast.get('message')}
          preset={toast.get('preset')}
          actions={toast.get('actions')}
          dispatch={props.dispatch}
          onRemove={handleRemove}
        />
      )}
    </ul>
  );
}

export default connect(state => ({
  toastList: state.toasts.get('toastList'),
} as any), (dispatch) => ({
  ...bindActionCreators({ removeToast }, dispatch),
  dispatch
}))(ToastList);
