import PropTypes from 'prop-types';
import React from 'react';
import slug from 'slug';
import cx from 'classnames';
import slugify from '../libs/slugify';

function performRemoveStopWords(text) {
  return text;
}

function SlugInput({ onChange, removeStopWords, value, ...props }) {
  function handleChange(event) {
    let text = event.target.value;
    if (removeStopWords) {
      text = performRemoveStopWords(text);
    }
    text = slugify(text);

    onChange(text);
  }

  function handleBlur() {
    const text = slug(value);
    onChange(text);
  }

  return (
    <input
      className={cx(props.className)}
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  );
}

SlugInput.propTypes = {
  value: PropTypes.string.isRequired,
  autoValue: PropTypes.string,
  removeStopWords: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default SlugInput;
