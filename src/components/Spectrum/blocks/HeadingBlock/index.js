import PropTypes from 'prop-types';
import React from 'react';
import DebouncedAutosizeTextarea from '../../../DebouncedAutosizeTextarea';
import * as SpectrumPropTypes from '../../SpectrumPropTypes';

import styles from './HeadingBlock.css';

class HeadingBlock extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputBound = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.props.update({
      command: 'update',
      path: [...this.props.path, 'text', 'text'],
      value: e.target.value,
    });
  }

  render() {
    const { data } = this.props;

    return (
      <div className={styles.root}>
        <DebouncedAutosizeTextarea
          className={styles.textarea}
          placeholder="Heading"
          value={data.getIn(['text', 'text'])}
          onChange={this.handleInputBound}
        />
      </div>
    );
  }
}

HeadingBlock.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default HeadingBlock;
