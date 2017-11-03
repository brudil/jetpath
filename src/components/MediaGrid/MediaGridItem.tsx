import React from 'react';
import Image from '../Image';

import styles from './MediaGridItem.css';

export interface MediaObject {
  id: string;
  mediaId: number;
  object: { width: number; height: number };
  fileType: string;
  mime: string;
  resourceName: string;
  directUrl: string;
}

interface IProps {
  media: MediaObject;
  onSelect?: (mediaId: number) => void;
  match?: {
    url: string;
  };
  wrap?: (media: MediaObject, children: JSX.Element) => Element;
}

class MediaGridItem extends React.Component<IProps, {}> {
  handleSelect: () => void;

  constructor(props: IProps) {
    super(props);

    this.handleSelect = () => {
      if (this.props.onSelect) {
        this.props.onSelect(this.props.media.mediaId);
      }
    };
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

  renderInner() {
    const { media } = this.props;

    return (
      <div className={styles.inner}>
        {media.fileType === 'image'
          ? this.renderImagePreview()
          : this.renderPseudoPreview()}
      </div>
    );
  }

  render() {
    const { media, wrap } = this.props;
    return (
      <li
        className={styles.root}
        style={{
          height: '110px',
          width: `${Math.round(
            110 * (media.object.width / media.object.height)
          )}px`,
        }}
      >
        {wrap ? (
          wrap(media, this.renderInner())
        ) : (
          <div onClick={this.handleSelect}>{this.renderInner()}</div>
        )}
      </li>
    );
  }
}

export default MediaGridItem;
