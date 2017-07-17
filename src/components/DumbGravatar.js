import PropTypes from 'prop-types';
import React from 'react';
import without from 'lodash/without';

function DumbGravatar(props) {
  return (
    <img
      {...without(props, ['hash', 'size'])}
      src={`https://www.gravatar.com/avatar/${props.hash}?d=retro`}
      role="presentation"
    />
  );
}

DumbGravatar.propTypes = {
  hash: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default DumbGravatar;
