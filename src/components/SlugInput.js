import PropTypes from 'prop-types';
import React from 'react';
import slug from 'slug';
import cx from 'classnames';

function removeStopWords(text) {
  return text;
}

function SlugInput(props) {
  function handleChange(event) {
    let text = event.target.value;
    if (props.removeStopWords) {
      text = removeStopWords(text);
    }
    text = text.replace(/\s+/g, '-').replace(/-+/g, '-').toLowerCase();

    props.onChange(text);
  }

  function handleBlur() {
    const text = slug(props.value);
    props.onChange(text);
  }

  return (
    <input
      className={cx(props.className)}
      type="text"
      value={props.value}
      onChange={handleChange}
      onBlur={handleBlur}
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
