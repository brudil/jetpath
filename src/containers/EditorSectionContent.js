import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import SpectrumEditor from '../components/Spectrum/Editor';

class EditorSectionContent extends React.Component {
  render() {
    const { workingDocument } = this.props;
    return (
      <div>
        <SpectrumEditor document={workingDocument} />
      </div>
    );
  }
}

EditorSectionContent.propTypes = {
  workingDocument: PropTypes.object,
};

export default connect(state => ({
  workingDocument: state.editor.get('workingDocument'),
}))(EditorSectionContent);
