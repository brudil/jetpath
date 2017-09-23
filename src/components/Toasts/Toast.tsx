import React from 'react';
import cx from 'classnames';

import style from './Toast.css';

interface IProps {
  id: number,
  title: string,
  message: string,
  preset: string,
  onRemove: (id: number) => void,
}

function Toast(props: IProps) {
  const { title, message, onRemove } = props;

  const handleRemove = () => onRemove(props.id);

  return (
    <li className={cx(style.root)} onClick={handleRemove}>
      <h1 className={style.title}>
        {title}
      </h1>
      <p className={style.content}>
        {message}
      </p>
    </li>
  );
}

export default Toast;
