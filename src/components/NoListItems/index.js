import PropTypes from 'prop-types';
import React from 'react';

import styles from './NoListItems.css';

function NoListItems(props) {
  return (
    <div className={styles.root}>
      <span className={styles.sad}>:(</span>
      <span className={styles.message}>
        {props.text}
      </span>
    </div>
  );
}

NoListItems.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NoListItems;
