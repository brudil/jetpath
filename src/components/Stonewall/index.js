import PropTypes from 'prop-types';
import React from 'react';

import styles from './Stonewall.css';

function Stonewall(props) {
  return (
    <div className={styles.root}>
      <h1>
        <img
          className={styles.logo}
          // eslint-disable-next-line
          src={require('logo.svg')}
          role="presentation"
        />
      </h1>
      {props.subtitle
        ? <h2 className={styles.subtitle}>
            {props.subtitle}
          </h2>
        : null}
      {props.children ? props.children : null}
    </div>
  );
}

Stonewall.propTypes = {
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

export default Stonewall;
