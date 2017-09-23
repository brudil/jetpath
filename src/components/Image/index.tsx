import React from 'react';
import qs from 'query-string';
import Imgix from 'react-imgix';

import styles from './ImagePop.css';
import {MediaObject} from "../MediaGrid/MediaGridItem";

function imgix(resource: string, options: Object) {
  return `https://drafty.imgix.net/${resource}?${qs.stringify(options)}`;
}

interface IProps {
  image: MediaObject,
  className?: string
}

interface IState {
  img: HTMLImageElement | null,
  bound: () => void,
  src?: string,
}

class ImageContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      img: new Image(),
      bound: this.handleLoaded.bind(this),
    };
  }

  componentDidMount() {
    if (this.state.img !== null) {
      this.state.img.addEventListener('load', this.state.bound);
      const src = this.generateDisplayUrl(this.props.image);
      this.setState({ src });
      this.state.img.src = src;
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.image.id === nextProps.image.id) {
      return;
    }

    this.setState(
      {
        img: new Image(),
        src: this.generateDisplayUrl(nextProps.image),
      },
      () => {
        if (this.state.img !== null && this.state.src) {
          this.state.img.addEventListener('load', this.state.bound);
          this.state.img.src = this.state.src;
        }
      }
    );
  }

  componentWillUnmount() {
    if (this.state.img !== null) {
      this.state.img.removeEventListener('load', this.state.bound);
    }
  }

  generateDisplayUrl(image: MediaObject) {
    return image.mime === 'image/gif'
      ? image.directUrl
      : imgix(image.resourceName, { h: 300 });
  }

  handleLoaded() {
    this.setState({ img: null });
  }

  render() {
    return (
      <div
        className={styles.loadingContainer}
        style={{
          paddingBottom: `${this.props.image.object.height /
            this.props.image.object.width *
            100}%`,
        }}
      >
        <div className={styles.imageContainer}>
          <Imgix as any
            precision={20}
            src={`https://drafty.imgix.net/${this.props.image.resourceName}`}
          />
        </div>
      </div>
    );
  }
}

export default ImageContainer;
