import React from 'react';

import styles from './NoListItems.css';

interface IProps {
  text: string,
}

export function NoListItems(props: IProps) {
  return (
    <div className={styles.root}>
      <span className={styles.sad}>:(</span>
      <span className={styles.message}>
        {props.text}
      </span>
    </div>
  );
}
export default NoListItems;
