import React from 'react';
import chunk from 'lodash/chunk';
import cx from 'classnames';

import styles from './SegmentedControl.css';

type controlId = string | number;
type optionTuple = [controlId, string];

function SegmentedControl(props: {
  className?: string,
  value: controlId,
  options: Array<controlId | string>,
  onChange: (id: controlId) => void
}) {
  function handleChange(optionId: controlId) {
    if (optionId !== props.value) {
      props.onChange(optionId);
    }
  }

  const options = chunk(props.options, 2) as Array<optionTuple>;
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

export default SegmentedControl;
