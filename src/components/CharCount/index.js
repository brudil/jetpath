import PropTypes from 'prop-types';
import React from 'react';

import styles from './CharCount.css';

function CharCount({ value, max }) {
  const length = value ? value.length : 0;
  return (
    <div className={styles.root}>
      <span>
        {max - length}
      </span>
      <span>/</span>
      <span>
        {max}
      </span>
    </div>
  );
}

CharCount.propTypes = {
  max: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default CharCount;
