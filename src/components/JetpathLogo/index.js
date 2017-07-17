import React from 'react';
import loSample from 'lodash/sample';
import logoQuotes from '../../lang/logo_quotes';

import styles from './JetpathLogo.css';

function JetpathLogo() {
  return (
    <img
      className={styles.root}
      // eslint-disable-next-line
      src={require('logo.svg')}
      alt="Jetpath"
      title={loSample(logoQuotes)}
    />
  );
}

export default JetpathLogo;
