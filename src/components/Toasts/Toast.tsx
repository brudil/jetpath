import React from 'react';
import cx from 'classnames';

import style from './Toast.css';
import {ToastBase, dismissToastAction, Actionable, ButtonTypes} from '../../ducks/Toast';

interface IProps extends ToastBase {
  onRemove: (id: number) => void,
  dispatch: (action: Object) => void,
}

function Toast(props: IProps) {
  const { title, message, onRemove, actions, dispatch } = props;

  const handleRemove = () => onRemove(props.id);

  const handleAction = (action: Actionable) => {
    if (action.action === dismissToastAction) {
      handleRemove();
    }

    if (typeof action.action === 'function') {
      dispatch(action.action());
      handleRemove();
    }
  };

  return (
    <li className={cx(style.root)} onClick={actions ? () => null : handleRemove}>
      <div className={style.container}>
        <h1 className={style.title}>
          {title}
        </h1>
        <p className={style.content}>
          {message}
        </p>
      </div>
      {actions ? (
        <ul className={style.actionList}>
          {actions.map((action: Actionable) => (
            <li>
              <button className={cx(style.actionButton, {
                [style.dull]: action.type === ButtonTypes.DULL,
                [style.action]: action.type === ButtonTypes.ACTION,
              })} onClick={() => handleAction(action)}>{action.title}</button>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default Toast;
