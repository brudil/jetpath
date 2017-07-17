import PropTypes from 'prop-types';
import React from 'react';
import omit from 'lodash/omit';

import styles from './Button.css';

function Button(props) {
  return (
    <button
      className={styles.button}
      {...omit(props, ['text', 'className'])}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.any,
  onClick: PropTypes.func,
};

export default Button;
