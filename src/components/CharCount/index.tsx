import React from 'react';
import cx from 'classnames';

import styles from './CharCount.css';

export function CharCount({ value, max }: { value: string; max: number }) {
  const length = value ? value.length : 0;
  return (
    <div className={cx(styles.root,  {[styles.warning]: length > (max * 0.8), [styles.danger]: length > max,  })}>
      <span>{max - length}</span>
      <span>/</span>
      <span>{max}</span>
    </div>
  );
}

export default CharCount;
