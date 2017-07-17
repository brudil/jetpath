import PropTypes from 'prop-types';
import React from 'react';

// eslint-disable-next-line
export const elementPath = PropTypes.arrayOf(
  PropTypes.oneOfType([PropTypes.number, PropTypes.string])
);
