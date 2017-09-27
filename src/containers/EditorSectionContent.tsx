import React from 'react';
import { connect } from 'react-redux';
import SpectrumEditor from '../components/Spectrum/Editor';

interface IProps {
  workingDocument: any // todo
}

class EditorSectionContent extends React.Component<IProps> {
  render() {
    const { workingDocument } = this.props;
    return (
      <div>
        <SpectrumEditor document={workingDocument} />
      </div>
    );
  }
}

export default connect(state => ({
  workingDocument: state.editor.get('workingDocument'),
}))(EditorSectionContent);
