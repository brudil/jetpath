import PropTypes from 'prop-types';
import React from 'react';

import styles from './ViewContainer.css';

function ViewContainer(props) {
  return (
    <div className={styles.root}>
      {props.children}
    </div>
  );
}

ViewContainer.propTypes = {
  children: PropTypes.node,
};

export default ViewContainer;
