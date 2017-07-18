import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as EditorActions from '../ducks/Editor';
import { formly, createChangeHandler } from '../libs/form';

import EditorSidebar from '../components/Editor/EditorSidebar';

class EditorSectionMetadata extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddAuthor = this.handleAddAuthor.bind(this);
    this.handleRemoveAuthor = this.handleRemoveAuthor.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  handleAddAuthor(id) {
    this.props.dispatch(EditorActions.addAuthor(id));
  }

  handleRemoveAuthor(id) {
    this.props.dispatch(EditorActions.removeAuthor(id));
  }

  handlePublish() {
    this.props.dispatch(EditorActions.publish());
  }

  handleChangeStatus(status) {
    this.props.dispatch(EditorActions.changeRevisionStatus(status));
  }

  render() {
    const {
      vertical,
      workingRevision,
      savedRevision,
      isLocal,
      editorialMetadata,
      hasChangesFromSaved,
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
          hasChangesFromSaved={hasChangesFromSaved}
          isLocal={isLocal}
          revisionChangeHandler={revisionChangeHandler}
          onAddAuthor={this.handleAddAuthor}
          onRemoveAuthor={this.handleRemoveAuthor}
          onSave={this.handleSave}
          onChangeStatus={this.handleChangeStatus}
          onPublish={this.handlePublish}
        />
      </div>
    );
  }
}

EditorSectionMetadata.propTypes = {
  dispatch: PropTypes.func,
  vertical: PropTypes.object.isRequired,
  editorialMetadata: PropTypes.object,
  savedRevision: PropTypes.object,
  workingRevision: PropTypes.object,
  isLocal: PropTypes.bool.isRequired,
  hasChangesFromSaved: PropTypes.bool.isRequired,
};

export default connect(state => ({
  vertical: state.verticals.selectedVertical,
  workingRevision: state.editor.get('workingRevision'),
  savedRevision: state.editor.get('savedRevision'),
  isLocal: state.editor.get('isLocal'),
  isSaving: state.editor.get('isSaving'),
  hasChangesFromSaved: state.editor.get('hasChangesFromSaved'),
  editorialMetadata: state.editor.get('editorialMetadata'),
}))(EditorSectionMetadata);
