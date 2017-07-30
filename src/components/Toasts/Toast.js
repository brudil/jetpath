import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import style from './Toast.css';

function Toast(props) {
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

Toast.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  preset: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Toast;
