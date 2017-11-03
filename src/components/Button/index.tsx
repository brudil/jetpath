import React from 'react';
import cx from 'classnames';
import omit from 'lodash/omit';

import styles from './Button.css';

export function Button(props: {
  text: string,
  className?: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
  type?: string,
  danger?: boolean
}) {
  return (
    <button
      className={cx(styles.button, {[styles.buttonDanger]: props.danger === true })}
      {...omit(props, ['text', 'className'])}
    >
      {props.text}
    </button>
  );
}

export default Button;
