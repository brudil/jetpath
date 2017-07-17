import PropTypes from 'prop-types';
import React from 'react';
import MediaGridItem from './MediaGridItem';

import styles from './MediaGrid.css';

function MediaGrid(props) {
  return (
    <ul className={styles.root}>
      {props.media.map(media =>
        <MediaGridItem media={media} key={media.id} onSelect={props.onSelect} />
      )}
    </ul>
  );
}

MediaGrid.propTypes = {
  media: PropTypes.array,
  onSelect: PropTypes.func,
};

export default MediaGrid;
