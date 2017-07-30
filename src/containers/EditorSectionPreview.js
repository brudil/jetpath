import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as EditorActions from '../ducks/Editor';

import EditorPreview from '../components/Editor/EditorPreview';

class EditorSectionPreview extends React.Component {
  constructor(props) {
    super(props);

    this.handlePublish = this.handlePublish.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  handlePublish() {
    this.props.dispatch(EditorActions.publish());
  }

  handleChangeStatus(status) {
    this.props.dispatch(EditorActions.changeRevisionStatus(status));
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
      <div>
        <EditorPreview
          hasChangesFromSaved={hasChangesFromSaved}
          isLocal={isLocal}
          savedRevision={savedRevision}
          workingRevision={workingRevision}
          onChangeStatus={this.handleChangeStatus}
          onPublish={this.handlePublish}
          editorialMetadata={editorialMetadata}
        />
      </div>
    );
  }
}

EditorSectionPreview.propTypes = {
  dispatch: PropTypes.func,
  editorialMetadata: PropTypes.object,
  savedRevision: PropTypes.object,
  workingRevision: PropTypes.object,
  isLocal: PropTypes.bool.isRequired,
  hasChangesFromSaved: PropTypes.bool.isRequired,
};

export default connect(state => ({
  workingRevision: state.editor.get('workingRevision'),
  savedRevision: state.editor.get('savedRevision'),
  isLocal: state.editor.get('isLocal'),
  isSaving: state.editor.get('isSaving'),
  hasChangesFromSaved: state.editor.get('hasChangesFromSaved'),
  editorialMetadata: state.editor.get('editorialMetadata'),
}))(EditorSectionPreview);
