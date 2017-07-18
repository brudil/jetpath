import PropTypes from 'prop-types';
// Documents - a Spectrum Document
// Sections  - top level container of elements, with optionally ridgid structure
// Blocks    - a display format. e.g: image, text, heading
// Resources - data request that uses IO
// Transformers - simple function for converting
import React from 'react';
import { connect } from 'react-redux';
import Element from '../Element';
import * as EditorActions from '../../../ducks/Editor';

import styles from './SpectrumEditor.css';

class SpectrumEditor extends React.Component {
  constructor(props) {
    super(props);

    this.boundUpdate = changeset => {
      this.props.dispatch(EditorActions.updateSpectrumDocument(changeset));
    };
  }

  render() {
    const { document } = this.props;
    return (
      <div className={styles.root}>
        <Element
          data={document}
          index="content"
          path={[]}
          update={this.boundUpdate}
        />
      </div>
    );
  }
}

SpectrumEditor.propTypes = {
  dispatch: PropTypes.func,
  document: PropTypes.object,
};

export default connect()(SpectrumEditor);
