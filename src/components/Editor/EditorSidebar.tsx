import React from 'react';
import styles from './EditorNav/EditorNav.css';
import EditorComments from './EditorComments';
import EditorSectionMetadata from './EditorSectionMetadata';
import EditorSectionWorkflow from '../../containers/EditorSectionWorkflow';
import styled from 'react-emotion';
import WorkflowIcon from './workflow.svgc';
import NotesIcon from './notes.svgc';
import PreviewIcon from './preview.svgc';
import MetadataIcon from './metadata.svgc';
import EditorPreviewModal from './EditorPreviewModal';

const IconButton = styled.button`
  border: 0;
  display: block;
  width: 100%;
  text-align: center;
  background-color: transparent;
  padding-top: 0.3rem;
  cursor: pointer;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  display: flex;
  flex: 1 1 auto;

  & li {
    flex: 1 1 auto;
  }
`;

const MenuItem = styled.li`
  & button {
    color: ${(props: any) =>
      props.active ? props.theme.colors.accent : props.theme.colors.grey_slate};
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  width: 279px;
  background: #fbfbfb;
  box-sizing: border-box;
  padding: 0 0.4rem;
  display: flex;
  z-index: 10;
  box-shadow: 0 1px 4px rgba(100, 100, 100, 0.08);
`;

enum Views {
  Notes,
  Metadata,
  Workflow,
}

interface IState {
  view: Views;
  isPreviewModalOpen: boolean;
}

interface IProps {
  onSave(): void;
  hasChangesFromSaved: boolean;
  isLocal: boolean;
  isSaving: boolean;
  contentId: number;
  stats: any; // todo
  savedRevision: any; // todo
}

class EditorSidebar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      view: props.isLocal ? Views.Metadata : Views.Notes,
      isPreviewModalOpen: false,
    };

    this.handleView = this.handleView.bind(this);
    this.handlePreviewModal = this.handlePreviewModal.bind(this);
  }

  handleView(view: Views) {
    this.setState({ view });
  }

  handlePreviewModal(open: boolean) {
    this.setState({ isPreviewModalOpen: open });
  }

  render() {
    const {
      savedRevision,
      stats,
      isLocal,
      isSaving,
      hasChangesFromSaved,
      contentId,
    } = this.props;

    const { view, isPreviewModalOpen } = this.state;

    const saveButtonText = () => {
      if (isLocal) {
        return isSaving ? 'Creating' : 'Create';
      }

      return isSaving ? 'Saving' : 'Save';
    };

    return (
      <div>
        <Header>
          <SidebarMenu>
            <MenuItem active={view === Views.Notes}>
              <IconButton onClick={() => this.handleView(Views.Notes)}>
                <NotesIcon width={20} height={20} />
              </IconButton>
            </MenuItem>
            <MenuItem active={view === Views.Metadata}>
              <IconButton onClick={() => this.handleView(Views.Metadata)}>
                <MetadataIcon width={20} height={20} />
              </IconButton>
            </MenuItem>
            <MenuItem active={view === Views.Workflow}>
              <IconButton onClick={() => this.handleView(Views.Workflow)}>
                <WorkflowIcon width={20} height={20} />
              </IconButton>
            </MenuItem>
            <MenuItem active={isPreviewModalOpen}>
              <IconButton onClick={() => this.handlePreviewModal(true)}>
                <PreviewIcon width={20} height={20} />
              </IconButton>
            </MenuItem>
          </SidebarMenu>
          <button
            className={styles.saveButton}
            disabled={!hasChangesFromSaved}
            onClick={this.props.onSave}
          >
            {saveButtonText()}
          </button>
        </Header>

        <div>
          {stats.get('wordCount')} words.{' '}
          {Math.round(stats.get('wordCount') / 270)} minute read.
        </div>
        {view === Views.Notes && (
          <EditorComments
            contentId={contentId}
            revisionId={savedRevision.get('id')}
          />
        )}
        {view === Views.Metadata && <EditorSectionMetadata />}
        {view === Views.Workflow && <EditorSectionWorkflow />}

        <EditorPreviewModal
          isOpen={isPreviewModalOpen}
          contentLabel="Content preview"
          onRequestClose={() => this.handlePreviewModal(false)}
        />
      </div>
    );
  }
}

export default EditorSidebar;