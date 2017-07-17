import PropTypes from 'prop-types';
import React from 'react';
import ImgixClient from 'imgix-core-js';

import styles from './ImagePop.css';

const imgix = new ImgixClient({
  host: 'drafty.imgix.net',
  secureURLToken: 'NeyWxnlkYl3yWvZ1',
});

class ImagePop extends React.Component {
  constructor(x, y) {
    super(x, y);

    this.state = {
      img: new Image(),
      bound: this.handleLoaded.bind(this),
    };
  }

  componentDidMount() {
    this.state.img.addEventListener('load', this.state.bound);
    this.state.src = this.generateDisplayUrl(this.props.image);
    this.state.img.src = this.state.src;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.image.id === nextProps.image.id) {
      return;
    }

    this.setState(
      {
        img: new Image(),
        src: this.generateDisplayUrl(nextProps.image),
      },
      () => {
        this.state.img.addEventListener('load', this.state.bound);
        this.state.img.src = this.state.src;
      }
    );
  }

  componentWillUnmount() {
    if (this.state.img !== null) {
      this.state.img.removeEventListener('load', this.state.bound);
    }
  }

  generateDisplayUrl(image) {
    return image.mime === 'image/gif'
      ? image.direct_url
      : imgix.buildURL(image.resource_name, { h: 300 });
  }

  handleLoaded() {
    this.setState({ img: null });
  }

  render() {
    if (this.state.img === null) {
      return (
        <img
          className={this.props.className}
          src={this.state.src}
          role="presentation"
        />
      );
    }

    return (
      <div className={styles.loadingContainer}>
        <img
          className={styles.loadingImage}
          src={imgix.buildURL(this.props.image.resource_name, { h: 6 })}
          alt={this.props.image.fileName}
        />
      </div>
    );
  }
}

ImagePop.propTypes = {
  image: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ImagePop;
