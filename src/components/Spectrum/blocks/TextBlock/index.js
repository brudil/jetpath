import PropTypes from 'prop-types';
import React from 'react';
import DebouncedAutosizeTextarea from '../../../DebouncedAutosizeTextarea';
import * as SpectrumPropTypes from '../../SpectrumPropTypes';

import styles from './TextBlock.css';

class TextBlock extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputBound = this.handleInput.bind(this);
  }

  handleInput(e) {
    const { path } = this.props;
    this.props.update({
      command: 'update',
      path: [...path, 'text', 'text'],
      value: e.target.value,
    });
  }

  render() {
    const { data } = this.props;

    return (
      <div className={styles.root}>
        <DebouncedAutosizeTextarea
          className={styles.textarea}
          placeholder="Markdown supported text"
          value={data.getIn(['text', 'text'])}
          onChange={this.handleInputBound}
        />
      </div>
    );
  }
}

TextBlock.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default TextBlock;
