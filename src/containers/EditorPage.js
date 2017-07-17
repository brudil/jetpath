import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Mousetrap from 'mousetrap';
import DebouncedAutosizeTextarea from '../components/DebouncedAutosizeTextarea';
import DocumentTitle from '../components/DocumentTitle';
import EditorSidebar from '../components/Editor/EditorSidebar';
import EditorNav from '../components/Editor/EditorNav';
import * as EditorActions from '../actions/EditorActions';
import { formly, createChangeHandler } from '../libs/form';
import LoadingContent from '../components/LoadingContent';
import stylesEditPane from '../styles/components/EditPane.css';
import stylesEditor from '../styles/components/Editor.css';
import stylesWriteSheet from '../styles/components/WriteSheet.css';
import { Route, Switch } from 'react-router-dom';
import EditorSectionContent from './EditorSectionContent';
import EditorSectionMetadata from './EditorSectionMetadata';
import EditorSectionWorkflow from './EditorSectionWorkflow';

class EditorPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    if (this.props.params.id !== 'new') {
      this.props.dispatch(EditorActions.loadContent(this.props.params.id));
      // this.props.dispatch(EditorActions.fetchLatestRevisionAndUpdateResources(this.props.params.id));
    } else {
      this.props.dispatch(EditorActions.createEmptyDocument());
    }
  }

  componentDidMount() {
    /*
    Router hook to trigger if we attempt to leave
    */
    this.props.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave.bind(this)
    );

    /*
    Keyboard shortcut bindings for editor-wide actions
    */
    Mousetrap.bind('mod+s', e => {
      e.preventDefault();
      this.handleSaveBound();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isLocal === false &&
      this.props.isLocal === true &&
      this.props.params.id === 'new'
    ) {
      const vertical = this.props.params.vertical;
      this.props.dispatch(
        replace(`/@${vertical}/editor/${nextProps.contentId}`)
      );
    }

    if (nextProps.location.pathname !== this.props.location.pathname) {
      console.log('[editor] re-adding router leave hook');
      console.log(nextProps.location, this.props.location);
      this.props.router.setRouteLeaveHook(
        this.props.route,
        this.routerWillLeave.bind(this)
      );
    }
  }

  componentWillUnmount() {
    Mousetrap.unbind('mod+s');
  }

  handleSave() {
    if (!this.props.hasChangesFromSaved || this.props.isSaving) {
      return;
    }

    this.props.dispatch(EditorActions.save());
  }

  routerWillLeave() {
    if (this.props.hasChangesFromSaved && !this.props.isSaving) {
      return 'There are unsaved changes! Are you sure you want to leave?';
    }

    return true;
  }

  renderEditor() {
    const {
      vertical,
      workingRevision,
      savedRevision,
      editorialMetadata,
      hasChangesFromSaved,
      isLocal,
      params,
    } = this.props;
    const revisionChangeHandler = createChangeHandler(
      this.props.dispatch,
      EditorActions.updateRevision
    );

    return (
      <div>
        <EditorNav
          headline={workingRevision.get('headline')}
          isLocal={isLocal}
          vertical={params.vertical}
          hasChangesFromSaved={hasChangesFromSaved}
          onSave={this.handleSave}
          onHeadlineUpdate={revisionChangeHandler('headline')}
          pathId={this.props.params.id}
        />
        <div>
          <Switch>
            <Route path="/" component={EditorSectionContent} exact />
            <Route path="metadata" component={EditorSectionMetadata} />
            <Route path="workflow" component={EditorSectionWorkflow} />
          </Switch>
        </div>
      </div>
    );

    return (
      <DocumentTitle
        title={`${workingRevision.get('headline') || 'Untitled'} - Editor`}
      >
        <div>
          <EditorNav
            headline={workingRevision.get('headline')}
            onHeadlineUpdate={revisionChangeHandler('headline')}
          />
          <div className={stylesWriteSheet.root}>
            <div className={stylesEditPane.root}>
              <div className={stylesEditor.root}>
                <DebouncedAutosizeTextarea
                  className={stylesEditor.title}
                  value={workingRevision.get('headline')}
                />
              </div>
            </div>
            <div
              className={cx(stylesEditPane.root, stylesEditPane.root_sidebar)}
            >
              <EditorSidebar
                workingRevision={workingRevision}
                vertical={vertical}
                savedRevision={savedRevision}
                editorialMetadata={editorialMetadata}
                hasChangesFromSaved={hasChangesFromSaved}
                isLocal={isLocal}
                revisionChangeHandler={revisionChangeHandler}
                onAddAuthor={this.handleAddAuthorBound}
                onRemoveAuthor={this.handleRemoveAuthorBound}
                onSave={this.handleSave}
                onChangeStatus={this.handleChangeStatusBound}
                onPublish={this.handlePublishBound}
              />
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }

  render() {
    let editor;

    if (this.props.workingDocument === null) {
      editor = <LoadingContent />;
    } else {
      editor = this.renderEditor();
    }

    return (
      <DocumentTitle title="Editor">
        <div>
          {editor}
        </div>
      </DocumentTitle>
    );
  }
}

EditorPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object,
  workingDocument: PropTypes.object,
  workingRevision: PropTypes.object,
  savedRevision: PropTypes.object,
  editorialMetadata: PropTypes.object,
  contentId: PropTypes.number,
  isSaving: PropTypes.bool.isRequired,
  isLocal: PropTypes.bool.isRequired,
  hasChangesFromSaved: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default withRouter(
  connect(state => ({
    workingDocument: state.editor.get('workingDocument'),
    workingRevision: state.editor.get('workingRevision'),
    savedDocument: state.editor.get('savedDocument'),
    savedRevision: state.editor.get('savedRevision'),
    isLocal: state.editor.get('isLocal'),
    vertical: state.verticals.selectedVertical,
    isSaving: state.editor.get('isSaving'),
    hasChangesFromSaved: state.editor.get('hasChangesFromSaved'),
    editorialMetadata: state.editor.get('editorialMetadata'),
    contentId: state.editor.get('remoteId'),
  }))(EditorPage)
);
