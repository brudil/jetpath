import PropTypes from 'prop-types';
import React from 'react';
import ElementStream from '../ElementStream';
import * as SpectrumPropTypes from '../SpectrumPropTypes';
import ListSectionPanel from './ListSectionPanel';

import styles from './Section.css';

function ListSection(props) {
  const { data, path, update } = props;

  return (
    <div className={styles.root}>
      <header className={styles.header}>List Section</header>
      <ElementStream
        className={styles.stream}
        data={data}
        path={path}
        update={update}
      />
    </div>
  );
}

ListSectionPanel.panel = ListSectionPanel;

ListSection.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default ListSection;
