import React, { useCallback } from 'react';
import SpectrumEditor from '../components/Spectrum/Editor';
import { RootState } from '../types';
import { useMappedState } from 'redux-react-hook';

interface IProps {
  style?: any;
}

const EditorSectionContent: React.FC<IProps> = ({ style }) => {
  const mappedState = useCallback((state: RootState) => ({
    workingDocument: state.editor.get('workingDocument'),
    editorFocus: state.editor.get('focus'),
  }), []);

  const {workingDocument, editorFocus} = useMappedState(mappedState);
    return (
      <div style={style}>
        <SpectrumEditor document={workingDocument} focus={editorFocus} />
      </div>
    );
}

export default EditorSectionContent;
