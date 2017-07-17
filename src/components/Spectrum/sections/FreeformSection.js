import PropTypes from 'prop-types';
import React from 'react';
import ElementStream from '../ElementStream';
import * as SpectrumPropTypes from '../SpectrumPropTypes';

import styles from './Section.css';

function FreeformSection(props) {
  const { data, path, update } = props;
  return (
    <div className={styles.root}>
      <header className={styles.header}>Freeform Section</header>
      <ElementStream
        className={styles.stream}
        data={data}
        path={path}
        update={update}
      />
    </div>
  );
}

FreeformSection.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default FreeformSection;
