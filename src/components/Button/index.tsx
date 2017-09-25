import React from 'react';
import omit from 'lodash/omit';

import styles from './Button.css';

function Button(props: {
  text: string,
  className?: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
}) {
  return (
    <button
      className={styles.button}
      {...omit(props, ['text', 'className'])}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
