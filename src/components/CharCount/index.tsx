import React from 'react';

import styles from './CharCount.css';

export function CharCount({ value, max }: { value: string; max: number }) {
  const length = value ? value.length : 0;
  return (
    <div className={styles.root}>
      <span>{max - length}</span>
      <span>/</span>
      <span>{max}</span>
    </div>
  );
}

export default CharCount;
