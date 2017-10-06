import React from 'react';
import { connect } from 'react-redux';
import SpectrumEditor from '../components/Spectrum/Editor';

interface IProps {
  workingDocument: any // todo
  editorFocus: any // todo
}

class EditorSectionContent extends React.Component<IProps> {
  render() {
    const { workingDocument, editorFocus } = this.props;
    return (
      <div>
        <SpectrumEditor document={workingDocument} focus={editorFocus} />
      </div>
    );
  }
}

export default connect(state => ({
  workingDocument: state.editor.get('workingDocument'),
  editorFocus: state.editor.get('focus'),
}))(EditorSectionContent);
