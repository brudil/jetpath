import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import SaveBeforeWorkflowMessage from '../SaveBeforeWorkflowMessage';
import SegmentedControl from '../SegmentedControl/index';
import Button from '../Button/index';
import ViewContainer from '../ViewContainer/index';
import styled from 'react-emotion';
import { css } from 'emotion';

const PreviewFrame = styled.iframe`
  transition: width 300ms ease, max-width 300ms ease;
  width: 100%;
  border: 1px solid #dedede;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(50, 50, 50, 0.1);
  margin: 0 auto;
  height: calc(100vh - 160px);
  display: block;
  margin-top: 1rem;
  max-width: ${(props: any) => props.maxWidth};
`;

const headerStyles = css`
  display: flex;
  margin-bottom: 1rem;
`;

const previewTextStyles = css`
  flex: 1 1 auto;
`;

enum Sizing {
  FULL,
  DESKTOP,
  TABLET,
  MOBILE,
}

const sizeMap = {
  [Sizing.FULL]: '100%',
  [Sizing.DESKTOP]: '1280px',
  [Sizing.TABLET]: '768px',
  [Sizing.MOBILE]: '320px',
};

interface IProps {
  hasChangesFromSaved: boolean;
  isLocal: boolean;
  savedRevision: any; // todo
  editorialMetadata: any; // todo
  workingRevision: any; // todo
  onChangeStatus: any; // todo
  onPublish: any; // todo
}

interface IState {
  mode: Sizing;
  copiedPreviewUrl: boolean;
}

class EditorPreview extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      mode: Sizing.FULL,
      copiedPreviewUrl: false,
    };
  }

  render() {
    const { isLocal, savedRevision, editorialMetadata } = this.props;

    const { mode, copiedPreviewUrl } = this.state;

    if (isLocal) {
      return <SaveBeforeWorkflowMessage />;
    }

    if (!editorialMetadata || !savedRevision) {
      return <p>Loading</p>;
    }

    const previewUrl = `https://thedrab.co/preview/${savedRevision.get(
      'id'
    )}/${savedRevision.get('preview_key')}`;

    // TODO: work out the best way to get vertical url
    return (
      <div>
        <ViewContainer>
          <div className={headerStyles}>
            <div className={previewTextStyles}>
              Previewing revision #{savedRevision.get('revision_number')}
            </div>
            <div>
              <CopyToClipboard
                text={previewUrl}
                onCopy={() => this.setState({ copiedPreviewUrl: true })}
              >
                <Button
                  text={copiedPreviewUrl ? 'Copied!' : 'Copy preview link'}
                />
              </CopyToClipboard>
            </div>
          </div>
          <SegmentedControl
            value={mode}
            options={[
              Sizing.FULL,
              'Full',
              Sizing.FULL,
              'Desktop',
              Sizing.TABLET,
              'Tablet',
              Sizing.MOBILE,
              'Mobile',
            ]}
            onChange={(value: Sizing) => this.setState({ mode: value })}
          />
        </ViewContainer>
        <PreviewFrame maxWidth={sizeMap[mode]} src={previewUrl} />
      </div>
    );
  }
}

export default EditorPreview;
