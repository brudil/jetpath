import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Toast from './Toast';
import { removeToast } from '../../ducks/Toast';
import { bindActionCreators } from 'redux';
import { css } from 'emotion';
import { RootState } from '../../types';

const toastListStyles = css`
  list-style: none;

  position: fixed;
  top: 0;
  right: 0;
  margin-top: 5rem;
  margin-right: 0.7rem;
  max-width: 300px;
`;

interface IProps {
  toastList: Array<Immutable.Record.Instance<any>>;
  removeToast: (id: number) => Object;
  dispatch: (action: Object) => void;
}

function ToastList(props: IProps) {
  const handleRemove = (id: number) => props.removeToast(id);

  return (
    <ul className={toastListStyles}>
      {props.toastList.map(toast => (
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
      ))}
    </ul>
  );
}

export default connect(
  (state: RootState) => ({
    toastList: state.toasts.get('toastList'),
  }),
  dispatch => ({
    ...bindActionCreators({ removeToast }, dispatch),
    dispatch,
  })
)(ToastList);
