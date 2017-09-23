import React from 'react';
import Image from '../Image';

import styles from './MediaGridItem.css';


export interface MediaObject {
  id: string,
  object: { width: number, height: number },
  fileType: string,
  mime: string,
  resourceName: string,
  directUrl: string,
}

interface IProps {
  media: MediaObject,
  onSelect: () => void
}

class MediaGridItem extends React.Component<IProps, {}> {
  handleSelect: (event: React.MouseEvent<HTMLLIElement>) => void;

  constructor(props: IProps) {
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

export default MediaGridItem;
