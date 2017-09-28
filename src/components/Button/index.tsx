import React from 'react';
import omit from 'lodash/omit';

import styles from './Button.css';

function Button(props: {
  text: string,
  className?: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
  type?: string,
}) {
  return (
    <button
      className={styles.button}
      {...omit(props, ['text', 'className'])}
    >
      {props.text}
    </button>
  );
}

export default Button;
