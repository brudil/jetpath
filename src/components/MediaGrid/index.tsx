import React from 'react';
import MediaGridItem, { MediaObject } from './MediaGridItem';

import styles from './MediaGrid.css';

interface IProps {
  media: Array<{ node: MediaObject, id: string }>,
  onSelect: () => void
}

function MediaGrid(props: IProps) {
  return (
    <ul className={styles.root}>
      {props.media.map(media =>
        <MediaGridItem media={media.node} key={media.id} onSelect={props.onSelect} />
      )}
    </ul>
  );
}

export default MediaGrid;
