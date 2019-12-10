import React from 'react';
import styles from './EditorNav/EditorNav.css';
import EditorComments from './EditorComments';
import EditorSectionMetadata from './EditorSectionMetadata';
import EditorSectionWorkflow from '../../containers/EditorSectionWorkflow';
import styled from '@emotion/styled';
import WorkflowIcon from './workflow.svg';
import NotesIcon from './notes.svg';
import PreviewIcon from './preview.svg';
import MetadataIcon from './metadata.svg';
import EditorPreviewModal from './EditorPreviewModal';
import css from '@emotion/css';

const Container = styled.div`
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
    
  @media (min-width: 960px) {
    padding-top: 40px;
  }
`;

const badgeStyle = css`
  &:after {
    content: '';
    display: block;
    height: 8px;
    width: 8px;
    background: #ff3b31;
    border-radius: 50%;
    position: relative;
    left: 23px;
    margin-top: -23px;
  }
`;

const IconButton: React.FC<{badge?: boolean | undefined } & React.HTMLProps<HTMLButtonElement>> = ({ badge, children, ...props}) => {
  return (
    <button {...props as any} css={`
    border: 0;
    display: block;
    width: 100%;
    text-align: center;
    background-color: transparent;
    padding-top: 0.3rem;
    cursor: pointer;
    ${badge && badgeStyle}
  `}>{children}</button>
  );
};

const SidebarMenu = styled.ul`
  list-style: none;
  display: flex;
  flex: 1 1 auto;

  & li {
    flex: 1 1 auto;
  }
`;

const MenuItem: React.FC<{active: boolean}> = ({active, children, ...props}) => {
  return <li {...props} css={`& button {
    color: ${(props: any) =>
      active ? props.theme.colors.accent : props.theme.colors.grey_slate};
  }`}>{children}</li>
}

const Header = styled.header`
  background: #fbfbfb;
  box-sizing: border-box;
  padding: 0 0.4rem;
  display: flex;
  z-index: 10;
  box-shadow: 0 1px 4px rgba(100, 100, 100, 0.08);
  
  @media (min-width: 960px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 279px;
  }
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
  editorialMetadata: any;
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
      isLocal,
      isSaving,
      hasChangesFromSaved,
      contentId,
      editorialMetadata,
    } = this.props;

    const { view, isPreviewModalOpen } = this.state;

    const saveButtonText = () => {
      if (isLocal) {
        return isSaving ? 'Creating' : 'Create';
      }

      return isSaving ? 'Saving' : 'Save';
    };

    const hasUnpublishedRevisions = editorialMetadata &&
      editorialMetadata.get('published_revision') !== null &&
      editorialMetadata.getIn(['published_revision', 'revision_number']) <
        savedRevision.get('revision_number');

    return (
      <Container>
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
              <IconButton
                onClick={() => this.handleView(Views.Workflow)}
                badge={hasUnpublishedRevisions}
              >
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
      </Container>
    );
  }
}

export default EditorSidebar;
