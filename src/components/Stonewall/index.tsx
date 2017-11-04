import React from 'react';

import jetpathLogo from 'logo.svg';
import styles from './Stonewall.css';

interface IProps {
  subtitle?: string;
  children?: any;
}

export function Stonewall(props: IProps) {
  return (
    <div className={styles.root}>
      <h1>
        <img className={styles.logo} src={jetpathLogo} role="presentation" />
      </h1>
      {props.subtitle ? (
        <h2 className={styles.subtitle}>{props.subtitle}</h2>
      ) : null}
      {props.children ? props.children : null}
    </div>
  );
}

export default Stonewall;
