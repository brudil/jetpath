import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import ImagePop from '../ImagePop';

import styles from './MediaDisplay.css';

function MediaDisplay({ className, media }) {
  return (
    <div className={cx(className, styles.root)}>
      {media.file_type === 'image'
        ? <ImagePop className={styles.image} image={media} />
        : null}
    </div>
  );
}

MediaDisplay.propTypes = {
  className: PropTypes.string,
  media: PropTypes.object,
};

export default MediaDisplay;
