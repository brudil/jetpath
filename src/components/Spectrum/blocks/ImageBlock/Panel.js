import PropTypes from 'prop-types';
import React from 'react';
import DebouncedInput from '../../../DebouncedInput';
import * as SpectrumPropTypes from '../../SpectrumPropTypes';

import styles from '../../ElementPanel/Panel.css';

class ImageBlockPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleCaptionBound = this.handleInput.bind(this, ['caption', 'text']);
    this.handleTitleBound = this.handleInput.bind(this, ['title', 'text']);
    this.handleAltBound = this.handleInput.bind(this, ['alt', 'text']);
  }

  handleInput(path, e) {
    this.props.update({
      command: 'update',
      path: [...this.props.path, ...path],
      value: e.target.value,
    });
  }

  render() {
    const { data } = this.props;
    const caption = data.get('caption');
    const title = data.get('title');
    const alt = data.get('alt');

    return (
      <div className={styles.root}>
        <h1 className={styles.title}>Image</h1>
        <div className={styles.control}>
          <label className={styles.controlName} htmlFor="caption">
            Caption
          </label>
          <DebouncedInput
            type="text"
            name="caption"
            id="caption"
            placeholder="Everest 2013"
            value={caption.get('text')}
            onChange={this.handleCaptionBound}
          />
        </div>
        <div className={styles.control}>
          <label className={styles.controlName} htmlFor="titletext">
            Tool tip text
          </label>
          <DebouncedInput
            type="text"
            name="titletext"
            id="titletext"
            placeholder="Cor, blimey"
            value={title.get('text')}
            onChange={this.handleTitleBound}
          />
        </div>
        <div className={styles.control}>
          <label className={styles.controlName} htmlFor="alttext">
            Alt text
          </label>
          <DebouncedInput
            type="text"
            name="alttext"
            id="alttext"
            placeholder="Everest at sunset"
            value={alt.get('text')}
            onChange={this.handleAltBound}
          />
        </div>
      </div>
    );
  }
}

ImageBlockPanel.propTypes = {
  data: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default ImageBlockPanel;
