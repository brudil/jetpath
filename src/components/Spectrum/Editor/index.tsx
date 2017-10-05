// Documents - a Spectrum Document
// Sections  - top level container of elements, with optionally ridgid structure
// Blocks    - a display format. e.g: image, text, heading
// Resources - data request that uses IO
// Transformers - simple function for converting
import React from 'react';
import { connect } from 'react-redux';
import Element from '../Element';
import DocumentPanel from '../DocumentPanel';
import * as EditorActions from '../../../ducks/Editor';

import styles from './SpectrumEditor.css';

interface IProps {
  updateSpectrumDocument: any,
  changeDocumentSubtype: any,
  document: any,
}

class SpectrumEditor extends React.Component<IProps, any> {
  private boundUpdate: (changeset: any) => void;

  constructor(props: IProps) {
    super(props);

    this.boundUpdate = changeset => {
      this.props.updateSpectrumDocument(changeset);
    };

  }

  render() {
    const { document } = this.props;
    const hasContent = document.getIn(['content']) !== null;

    return (
      <div className={styles.root}>
        <DocumentPanel
          data={document}
          applyChangeset={this.props.updateSpectrumDocument}
        />
        {hasContent
          ? <Element
              data={document}
              index="content"
              path={[]}
              update={this.boundUpdate}
              isInStream={false}
            />
          : null}
      </div>
    );
  }
}


export default connect(null, {
  changeDocumentSubtype: EditorActions.changeDocumentSubtype,
  updateSpectrumDocument: EditorActions.updateSpectrumDocument,
})(SpectrumEditor);
