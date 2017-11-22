import React from 'react';
import { connect } from 'react-redux';
import * as EditorActions from '../../ducks/Editor';

import EditorPreview from './EditorPreview';
import { RootState } from '../../types';
import Modal from '../Modal';

interface IProps extends ReactModal.Props {
  publish(): any;
  changeRevisionStatus(status: number): void;
  workingRevision: any; // todo
  savedRevision: any; // todo
  isLocal: boolean;
  editorialMetadata: any; // todo
  hasChangesFromSaved: boolean;
}

class EditorSectionPreview extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handlePublish = this.handlePublish.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  handlePublish() {
    this.props.publish();
  }

  handleChangeStatus(status: number) {
    this.props.changeRevisionStatus(status);
  }

  render() {
    const {
      workingRevision,
      savedRevision,
      isLocal,
      editorialMetadata,
      hasChangesFromSaved,
    } = this.props;
    return (
      <Modal {...this.props}>
        <EditorPreview
          hasChangesFromSaved={hasChangesFromSaved}
          isLocal={isLocal}
          savedRevision={savedRevision}
          workingRevision={workingRevision}
          onChangeStatus={this.handleChangeStatus}
          onPublish={this.handlePublish}
          editorialMetadata={editorialMetadata}
        />
      </Modal>
    );
  }
}

export default connect<any, any, any, any>(
  (state: RootState) => ({
    workingRevision: state.editor.get('workingRevision'),
    savedRevision: state.editor.get('savedRevision'),
    isLocal: state.editor.get('isLocal'),
    isSaving: state.editor.get('isSaving'),
    hasChangesFromSaved: state.editor.get('hasChangesFromSaved'),
    editorialMetadata: state.editor.get('editorialMetadata'),
  }),
  {
    publish: EditorActions.publish,
  }
)(EditorSectionPreview);
