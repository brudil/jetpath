import React from 'react';
import { connect } from 'react-redux';
import Toast from './Toast';
import { removeToast, Toast as ToastObject } from '../../ducks/Toast';

import styles from './ToastList.css';

function ToastList(props: {
  toastList: Array<ToastObject>,
  removeToast: (id: number) => Object
}) {
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
          onRemove={handleRemove}
        />
      )}
    </ul>
  );
}

export default connect(state => ({
  toastList: state.toasts.get('toastList'),
}), {
  removeToast,
})(ToastList);
