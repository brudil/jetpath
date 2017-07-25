import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Image from '../Image';

import styles from './MediaDisplay.css';

function MediaDisplay({ className, media }) {
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

MediaDisplay.propTypes = {
  className: PropTypes.string,
  media: PropTypes.object,
};

export default MediaDisplay;
