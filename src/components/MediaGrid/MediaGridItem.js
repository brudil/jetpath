import PropTypes from 'prop-types';
import React from 'react';
import Image from '../Image';

import styles from './MediaGridItem.css';

class MediaGridItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.props.onSelect.bind(this, this.props.media.id);
  }

  renderImagePreview() {
    const { media } = this.props;

    return <Image className={styles.thumbnail} image={media} />;
  }

  renderPseudoPreview() {
    const { media } = this.props;
    return (
      <div className={styles.pseudo}>
        <span>{media.mime}</span>
      </div>
    );
  }

  render() {
    const { media } = this.props;
    return (
      <li
        className={styles.root}
        onClick={this.handleSelect}
        style={{
          height: '110px',
          width: `${Math.round(
            110 * (media.object.width / media.object.height)
          )}px`,
        }}
      >
        <div className={styles.inner}>
          {media.fileType === 'image'
            ? this.renderImagePreview()
            : this.renderPseudoPreview()}
        </div>
      </li>
    );
  }
}

MediaGridItem.propTypes = {
  media: PropTypes.object,
  onSelect: PropTypes.func,
};

export default MediaGridItem;
