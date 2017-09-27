import React from 'react';
import cx from 'classnames';
import Image from '../Image';

import styles from './MediaDisplay.css';

interface IProps {
  className?: string,
  media: any, // todo
}

function MediaDisplay({ className, media }: IProps) {
  return (
    <div className={cx(className, styles.root)}>
      {media.file_type === 'image'
        ? <div className={styles.image}>
            <Image image={media} />
          </div>
        : null}
    </div>
  );
}

export default MediaDisplay;
