import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Combokeys from 'combokeys';
import { Route, Switch } from 'react-router-dom';
import DocumentTitle from '../components/DocumentTitle';
import EditorNav from '../components/Editor/EditorNav';
import EditorCommandPalette from '../components/Editor/EditorCommandPalette';
import EditorComments from '../components/Editor/EditorComments';
import * as EditorActions from '../ducks/Editor';
import { createChangeHandler } from '../libs/form';
import LoadingContent from '../components/LoadingContent';
import EditorSectionContent from './EditorSectionContent';
import EditorSectionMetadata from './EditorSectionMetadata';
import EditorSectionWorkflow from './EditorSectionWorkflow';
import EditorSectionPreview from './EditorSectionPreview';
import globalPlugin from 'combokeys/plugins/global-bind';
import { RootState } from '../types';
import { Dispatch } from 'redux';
import { Vertical } from '../ducks/Vertical';

interface IRouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {
  dispatch: Dispatch<RootState>;
  workingDocument: any;
  workingRevision: any;
  savedDocument: any;
  savedRevision: any;
  editorialMetadata: any;
  contentId: number;
  isSaving: boolean;
  isLocal: boolean;
  hasChangesFromSaved: boolean;
  location: any;
  commandPaletteOpen: boolean;
  vertical: Vertical;
  stats: any; // todo

  toggleCommandPalette: typeof EditorActions.toggleCommandPalette;
  createEmptyDocument: typeof EditorActions.createEmptyDocument;
  save: typeof EditorActions.save;
  loadContent: typeof EditorActions.loadContent;
}

class EditorPage extends React.Component<IProps> {
  private editorTrap: any;

  constructor(props: IProps) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    if (id !== 'new') {
      this.props.loadContent(parseInt(id, 10));
      // this.props.dispatch(EditorActions.fetchLatestRevisionAndUpdateResources(id));
    } else {
      this.props.createEmptyDocument();
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

    this.editorTrap.bindGlobal('mod+/', (event: KeyboardEvent) => {
      event.preventDefault();
      this.props.toggleCommandPalette({ open: true });
    });

    this.editorTrap.bindGlobal('esc', () => {
      this.props.toggleCommandPalette({ open: false });
    });

    this.editorTrap.bindGlobal('mod+s', (event: KeyboardEvent) => {
      event.preventDefault();
      this.handleSave();
    });
  }

  componentWillReceiveProps(nextProps: IProps) {
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

    this.props.save();
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
        {!isLocal && params.id !== 'new' ? (
          <EditorComments
            contentId={parseInt(params.id, 10)}
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
        <div>{editor}</div>
      </DocumentTitle>
    );
  }
}

export default withRouter(
  connect(
    (state: RootState) => ({
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
    }),
    {
      loadContent: EditorActions.loadContent,
      createEmptyDocument: EditorActions.createEmptyDocument,
      toggleCommandPalette: EditorActions.toggleCommandPalette,
      save: EditorActions.save,
    }
  )(EditorPage)
);
