import PropTypes from 'prop-types';
import React from 'react';
import qs from 'query-string';
import Imgix from 'react-imgix';

import styles from './ImagePop.css';

function imgix(resource, options) {
  return `https://drafty.imgix.net/${resource}?${qs.stringify(options)}`;
}
class ImageContainer extends React.Component {
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
          <Imgix
            precision={20}
            src={`https://drafty.imgix.net/${this.props.image.resourceName}`}
          />
        </div>
      </div>
    );
  }
}

ImageContainer.propTypes = {
  image: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ImageContainer;
