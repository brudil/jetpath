import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Combokeys from 'combokeys';
import { Route, Switch } from 'react-router-dom';
import DocumentTitle from '../components/DocumentTitle';
import EditorNav from '../components/Editor/EditorNav';
import EditorCommandPalette from '../components/Editor/EditorCommandPalette';
import EditorComments from '../components/Editor/EditorComments';
import * as EditorActions from '../ducks/Editor';
import { formly, createChangeHandler } from '../libs/form';
import LoadingContent from '../components/LoadingContent';
import EditorSectionContent from './EditorSectionContent';
import EditorSectionMetadata from './EditorSectionMetadata';
import EditorSectionWorkflow from './EditorSectionWorkflow';
import EditorSectionPreview from './EditorSectionPreview';
import globalPlugin from 'combokeys/plugins/global-bind';

class EditorPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    if (id !== 'new') {
      this.props.dispatch(EditorActions.loadContent(id));
      // this.props.dispatch(EditorActions.fetchLatestRevisionAndUpdateResources(id));
    } else {
      this.props.dispatch(EditorActions.createEmptyDocument());
    }
  }

  componentDidMount() {
    /*
    Router hook to trigger if we attempt to leave
    */
    // TODO: port this to RR v4
    // this.props.router.setRouteLeaveHook(
    //   this.props.route,
    //   this.routerWillLeave.bind(this)
    // );

    /*
    Keyboard shortcut bindings for editor-wide actions
    */

    this.editorTrap = globalPlugin(new Combokeys(document));

    this.editorTrap.bindGlobal('mod+/', e => {
      e.preventDefault();
      this.props.dispatch(EditorActions.toggleCommandPalette({ open: true }));
    });

    this.editorTrap.bindGlobal('esc', e => {
      this.props.dispatch(EditorActions.toggleCommandPalette({ open: false }));
    });

    this.editorTrap.bindGlobal('mod+s', e => {
      e.preventDefault();
      this.handleSave();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isLocal === false &&
      this.props.isLocal === true &&
      this.props.match.params.id === 'new'
    ) {
      const vertical = this.props.vertical.identifier;
      this.props.history.replace(`/@${vertical}/editor/${nextProps.contentId}`);
    }

    if (nextProps.location.pathname !== this.props.location.pathname) {
      console.log('[editor] re-adding router leave hook');
      console.log(nextProps.location, this.props.location);
      // TODO: port this to RR v4
      // this.props.router.setRouteLeaveHook(
      //   this.props.route,
      //   this.routerWillLeave.bind(this)
      // );
    }
  }

  componentWillUnmount() {
    if (this.editorTrap) {
      this.editorTrap.detach();
    }
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
      stats,
      isLocal,
      isSaving,
      commandPaletteOpen,
    } = this.props;
    const revisionChangeHandler = createChangeHandler(
      this.props.dispatch,
      EditorActions.updateRevision
    );

    const { url, params } = this.props.match;

    return (
      <div style={{ paddingTop: '40px' }}>
        <EditorNav
          headline={workingRevision.get('headline')}
          isLocal={isLocal}
          vertical={vertical}
          hasChangesFromSaved={hasChangesFromSaved}
          onSave={this.handleSave}
          onHeadlineUpdate={revisionChangeHandler('headline')}
          pathId={params.id}
          stats={stats}
          isSaving={isSaving}
        />
        <div>
          <Switch>
            <Route path={`${url}`} component={EditorSectionContent} exact />
            <Route path={`${url}/metadata`} component={EditorSectionMetadata} />
            <Route path={`${url}/workflow`} component={EditorSectionWorkflow} />
            <Route path={`${url}/preview`} component={EditorSectionPreview} />
          </Switch>
        </div>
        {commandPaletteOpen ? <EditorCommandPalette /> : null}
        {!isLocal ? (
          <EditorComments
            contentId={params.id}
            revisionId={savedRevision.get('id')}
          />
        ) : null}
      </div>
    );
  }

  render() {
    let editor;

    if (
      this.props.workingDocument === null ||
      (!this.props.isLocal &&
        this.props.contentId !== parseInt(this.props.match.params.id, 10))
    ) {
      editor = <LoadingContent />;
    } else {
      editor = this.renderEditor();
    }

    return (
      <DocumentTitle title="Editor">
        <div
          ref={el => {
            this.editorEl = el;
          }}
        >
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
  location: PropTypes.object.isRequired,
  commandPaletteOpen: PropTypes.bool.isRequired,
};

export default withRouter(
  connect(state => ({
    workingDocument: state.editor.get('workingDocument'),
    workingRevision: state.editor.get('workingRevision'),
    savedDocument: state.editor.get('savedDocument'),
    savedRevision: state.editor.get('savedRevision'),
    isLocal: state.editor.get('isLocal'),
    stats: state.editor.get('stats'),
    vertical: state.verticals.selectedVertical,
    isSaving: state.editor.get('isSaving'),
    hasChangesFromSaved: state.editor.get('hasChangesFromSaved'),
    editorialMetadata: state.editor.get('editorialMetadata'),
    contentId: state.editor.get('remoteId'),
    commandPaletteOpen: state.editor.getIn(['focus', 'commandPaletteOpen']),
  }))(EditorPage)
);
