import React from 'react';
import loSample from 'lodash/sample';
import logoQuotes from '../../lang/logo_quotes';

import jetpathLogo from 'logo.svg';
import styles from './JetpathLogo.css';

function JetpathLogo() {
  return (
    <img
      className={styles.root}
      src={jetpathLogo}
      alt="Jetpath"
      title={loSample(logoQuotes)}
    />
  );
}

export default JetpathLogo;
