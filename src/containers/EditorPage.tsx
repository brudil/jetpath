import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import theme from '../themes/default';
import Combokeys from 'combokeys';
import EditorNav from '../components/Editor/EditorNav';
import EditorCommandPalette from '../components/Editor/EditorCommandPalette';
import * as EditorActions from '../ducks/Editor';
import { createChangeHandlerBound } from '../libs/form';
import LoadingContent from '../components/LoadingContent';
import EditorSectionContent from './EditorSectionContent';
import globalPlugin from 'combokeys/plugins/global-bind';
import { RootState } from '../types';
import { Dispatch } from 'redux';
import { Vertical } from '../ducks/Vertical';
import styled from '@emotion/styled';
import EditorSidebar from '../components/Editor/EditorSidebar';
import Helmet from 'react-helmet';
import {hasPermission} from "../libs/authHelpers";

const Container = styled.div`
  display: flex;
`;

const ComposeContainer = styled.div`
  flex: 1 1 auto;
  padding-left: 0.4rem;
  
  @media (min-width: 960px) {
    padding-right: calc(280px + 0.4rem);
  }
`;

const MobileToggle = styled.button`
  position: absolute;
  display: block;
  border: 0;
  color: ${theme.colors.accent};
  background-color: white;
  right: 280px;
  padding: 0.4rem;
  font-size: 1.2rem;
  
  & > span {
    display: block;
    transition: transform ease 300ms;
    transform: rotate(${(props: any) => props.isOpen ? '180deg' : '0deg' });
  }
  
  @media (min-width: 960px) {
    display: none;
  }
`;

const SideContainer = styled.aside`
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgb(247, 247, 247);
  z-index: 100;
  border-left: 1px solid rgb(213, 213, 213);
  box-sizing: border-box;
  width: 280px;
  transition: margin-right ease 300ms;
  margin-right: ${(props: any) => props.isOpen ? '0' : '-280px'};

  
  @media (min-width: 960px) {
    width: 280px;
    margin-right: 0;
  }
`;

interface IRouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {
  dispatch: Dispatch<any>;
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

  canPublish: boolean;
  canSave: boolean;

  updateRevision: typeof EditorActions.updateRevision;
  toggleCommandPalette: typeof EditorActions.toggleCommandPalette;
  createEmptyDocument: typeof EditorActions.createEmptyDocument;
  save: typeof EditorActions.save;
  loadContent: typeof EditorActions.loadContent;
}

interface IState {
  isSidebarOpen: boolean;
}

class EditorPage extends React.Component<IProps, IState> {
  private editorTrap: any;

  constructor(props: IProps) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);

    this.state = {
      isSidebarOpen: false,
    };
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

  handleToggleSidebar() {
    this.setState(state => ({
      isSidebarOpen: !state.isSidebarOpen
    }))
  }

  renderEditor() {
    const {
      workingRevision,
      savedRevision,
      hasChangesFromSaved,
      stats,
      isLocal,
      isSaving,
      commandPaletteOpen,
      editorialMetadata,
      updateRevision,
    } = this.props;

    const { isSidebarOpen } = this.state;

    const revisionChangeHandler = createChangeHandlerBound(updateRevision);

    const { params } = this.props.match;

    return (
      <div>
        <Helmet>
          <title>{workingRevision.get('headline') || 'Untitled'}</title>
        </Helmet>

        <Container>
          <ComposeContainer>
            <EditorNav
              headline={workingRevision.get('headline')}
              onHeadlineUpdate={revisionChangeHandler('headline')}
              stats={stats}
            />
            <EditorSectionContent style={{ paddingTop: '40px', pointerEvents: this.props.canSave ? 'auto' : 'none' }} />
          </ComposeContainer>

          <SideContainer isOpen={isSidebarOpen}>
            <MobileToggle isOpen={isSidebarOpen} onClick={this.handleToggleSidebar}><span>◀</span></MobileToggle>
            <EditorSidebar
              contentId={params.id === 'new' ? -1 : parseInt(params.id, 10)}
              hasChangesFromSaved={hasChangesFromSaved}
              savedRevision={savedRevision}
              isLocal={isLocal}
              isSaving={isSaving}
              stats={stats}
              editorialMetadata={editorialMetadata}
              onSave={this.handleSave}
            />
          </SideContainer>
        </Container>
        {commandPaletteOpen ? <EditorCommandPalette /> : null}
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
      <div>
        <Helmet>
          <title>Editor</title>
        </Helmet>

        {editor}
      </div>
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
      canPublish: hasPermission(state, 'content.publish'),
      canSave: hasPermission(state, 'content.save_any') || (hasPermission(state, 'content.save_watching') && true) // user id in watchers
    }),
    {
      loadContent: EditorActions.loadContent,
      updateRevision: EditorActions.updateRevision,
      createEmptyDocument: EditorActions.createEmptyDocument,
      toggleCommandPalette: EditorActions.toggleCommandPalette,
      save: EditorActions.save,
    }
  )(EditorPage)
);
