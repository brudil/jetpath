import React from 'react';
import { connect } from 'react-redux';
import * as EditorActions from '../ducks/Editor';
import ContentWatchManager from '../components/ContentWatchManager';

import EditorWorkflow from '../components/Editor/EditorWorkflow';
import { RootState } from '../types';

interface IProps {
  savedRevision: any; // todo
  workingRevision: any; // todo
  isLocal: boolean;
  isSaving: boolean;
  hasChangesFromSaved: boolean;
  editorialMetadata: any; // todo

  publish: typeof EditorActions.publish;
  changeRevisionStatus: typeof EditorActions.changeRevisionStatus;
}

class EditorSectionWorkflow extends React.Component<IProps> {
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
      <div style={{ maxWidth: '500px', width: '100%', margin: '2rem auto' }}>
        <EditorWorkflow
          hasChangesFromSaved={hasChangesFromSaved}
          isLocal={isLocal}
          savedRevision={savedRevision}
          workingRevision={workingRevision}
          onChangeStatus={this.handleChangeStatus}
          onPublish={this.handlePublish}
          editorialMetadata={editorialMetadata}
        />
        <ContentWatchManager contentId={savedRevision.get('content')} />
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({
    workingRevision: state.editor.get('workingRevision'),
    savedRevision: state.editor.get('savedRevision'),
    isLocal: state.editor.get('isLocal'),
    isSaving: state.editor.get('isSaving'),
    hasChangesFromSaved: state.editor.get('hasChangesFromSaved'),
    editorialMetadata: state.editor.get('editorialMetadata'),
  }),
  {
    changeRevisionStatus: EditorActions.changeRevisionStatus,
    publish: EditorActions.publish,
  }
)(EditorSectionWorkflow);
