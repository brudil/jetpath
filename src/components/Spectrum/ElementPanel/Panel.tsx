import React from 'react';

import styles from './Panel.css';

function Panel(props: { title: string; children: any }) {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{props.title}</h1>
      {props.children}
    </div>
  );
}

export default Panel;

export function PanelControl(props: { title: string; children: any }) {
  return (
    <div className={styles.control}>
      <div className={styles.controlName}>{props.title}</div>
      {props.children}
    </div>
  );
}
