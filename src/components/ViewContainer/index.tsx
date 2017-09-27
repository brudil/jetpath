import React from 'react';

import styles from './ViewContainer.css';

interface IProps {
  children: JSX.Element,
}

function ViewContainer(props: IProps) {
  return (
    <div className={styles.root}>
      {props.children}
    </div>
  );
}

export default ViewContainer;