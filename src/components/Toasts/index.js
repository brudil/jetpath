import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Toast from './Toast';
import { removeToast } from '../../ducks/Toast';

import styles from './ToastList.css';

function ToastList(props) {
  const handleRemove = id => props.dispatch(removeToast(id));

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

ToastList.propTypes = {
  toastList: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  toastList: state.toasts.get('toastList'),
}))(ToastList);
