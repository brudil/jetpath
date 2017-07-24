import PropTypes from 'prop-types';
import React from 'react';
import DebouncedAutosizeTextarea from '../../../DebouncedAutosizeTextarea';
import * as SpectrumPropTypes from '../../SpectrumPropTypes';
import HeadingIcon from '../../../icons/pull-quote.svg.react';

import styles from './PullQuoteBlock.css';

class PullQuoteBlock extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputBound = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.props.update({
      command: 'update',
      path: [...this.props.path, 'quote', 'text'],
      value: e.target.value,
    });
  }

  render() {
    const { data } = this.props;

    return (
      <div className={styles.root}>
        <DebouncedAutosizeTextarea
          className={styles.textarea}
          placeholder="Pull Quote"
          value={data.getIn(['quote', 'text'])}
          onChange={this.handleInputBound}
        />
      </div>
    );
  }
}

PullQuoteBlock.Icon = HeadingIcon;

PullQuoteBlock.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default PullQuoteBlock;
