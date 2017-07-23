import PropTypes from 'prop-types';
import React from 'react';
import ElementStream from '../ElementStream';
import * as SpectrumPropTypes from '../SpectrumPropTypes';
import FreeformIcon from '../../icons/freeform.svg.react';

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

FreeformSection.Icon = FreeformIcon;

FreeformSection.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default FreeformSection;
