import PropTypes from 'prop-types';
import React from 'react';
import chunk from 'lodash/chunk';
import cx from 'classnames';

import styles from './SegmentedControl.css';

function SegmentedControl(props) {
  function handleChange(optionId) {
    if (optionId !== props.value) {
      props.onChange(optionId);
    }
  }

  const options = chunk(props.options, 2);
  return (
    <div className={cx(styles.root, props.className)}>
      {options.map(option => {
        const [id, lang] = option;
        const classNames = cx(styles.option, {
          [styles.optionActive]: id === props.value,
        });
        return (
          <div
            className={classNames}
            key={id}
            onClick={handleChange.bind({}, id)}
          >
            {lang}
          </div>
        );
      })}
    </div>
  );
}

SegmentedControl.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SegmentedControl;
