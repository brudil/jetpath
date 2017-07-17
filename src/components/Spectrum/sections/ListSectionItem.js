import PropTypes from 'prop-types';
import React from 'react';
import Element from '../Element';
import ElementStream from '../ElementStream';
import * as SpectrumPropTypes from '../SpectrumPropTypes';

import styles from './SectionItem.css';

function ListSectionItem(props) {
  const { data, path, update, index } = props;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        List Item #{index + 1}
      </header>
      <Element data={data} update={update} path={path} index="title" />
      <ElementStream data={data} update={update} path={path} />
    </div>
  );
}

ListSectionItem.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  index: PropTypes.number,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default ListSectionItem;
