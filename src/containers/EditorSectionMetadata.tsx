import React from 'react';
import { connect } from 'react-redux';
import * as EditorActions from '../ducks/Editor';
import { createChangeHandler } from '../libs/form';

import EditorSidebar from '../components/Editor/EditorSidebar';
import { RootState } from '../types';
import { Vertical } from '../ducks/Vertical';
import { Dispatch } from 'redux';

interface IProps {
  vertical: Vertical;
  editorialMetadata: any; // todo
  savedRevision: any; // todo
  workingRevision: any; // todo
  isLocal: boolean;
  isSaving: boolean;
  hasChangesFromSaved: boolean;
  dispatch: Dispatch<RootState>;

  addAuthor: typeof EditorActions.addAuthor;
  removeAuthor: typeof EditorActions.removeAuthor;
  publish: typeof EditorActions.publish;
  changeRevisionStatus: typeof EditorActions.changeRevisionStatus;
}

class EditorSectionMetadata extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleAddAuthor = this.handleAddAuthor.bind(this);
    this.handleRemoveAuthor = this.handleRemoveAuthor.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  handleAddAuthor(id: number) {
    this.props.addAuthor(id);
  }

  handleRemoveAuthor(id: number) {
    this.props.removeAuthor(id);
  }

  handlePublish() {
    this.props.publish();
  }

  handleChangeStatus(status: number) {
    this.props.changeRevisionStatus(status);
  }

  render() {
    const {
      vertical,
      workingRevision,
      savedRevision,
      isLocal,
      editorialMetadata,
    } = this.props;
    const revisionChangeHandler = createChangeHandler(
      this.props.dispatch,
      EditorActions.updateRevision
    );
    return (
      <div style={{ maxWidth: '500px', width: '100%', margin: '2rem auto' }}>
        <EditorSidebar
          vertical={vertical}
          workingRevision={workingRevision}
          savedRevision={savedRevision}
          editorialMetadata={editorialMetadata}
          isLocal={isLocal}
          revisionChangeHandler={revisionChangeHandler}
        />
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({
    vertical: state.verticals.selectedVertical,
    workingRevision: state.editor.get('workingRevision'),
    savedRevision: state.editor.get('savedRevision'),
    isLocal: state.editor.get('isLocal'),
    isSaving: state.editor.get('isSaving'),
    hasChangesFromSaved: state.editor.get('hasChangesFromSaved'),
    editorialMetadata: state.editor.get('editorialMetadata'),
  }),
  {
    addAuthor: EditorActions.addAuthor,
    removeAuthor: EditorActions.removeAuthor,
    changeRevisionStatus: EditorActions.changeRevisionStatus,
    publish: EditorActions.publish,
  }
)(EditorSectionMetadata);
