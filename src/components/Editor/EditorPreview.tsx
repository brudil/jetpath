import React from 'react';
import cx from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';
import SaveBeforeWorkflowMessage from '../SaveBeforeWorkflowMessage';

import styles from './EditorPreview.css';
import SegmentedControl from '../SegmentedControl/index';
import Button from '../Button/index';
import ViewContainer from '../ViewContainer/index';

enum Sizing {
  FULL,
  DESKTOP,
  TABLET,
  MOBILE
}

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
  copiedPreviewUrl: boolean
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
    const {
      isLocal,
      savedRevision,
      editorialMetadata,
    } = this.props;

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
      <div className={styles.root}>
        <ViewContainer>
          <div className={styles.header}>
            <div className={styles.previewText}>
              Previewing revision #{savedRevision.get('revision_number')}
            </div>
            <div className={styles.copyButton}>
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
        <iframe
          className={cx(styles.frame, {
            [styles.frameDesktop]: this.state.mode === Sizing.DESKTOP,
            [styles.frameTablet]: this.state.mode === Sizing.TABLET,
            [styles.frameMobile]: this.state.mode === Sizing.MOBILE,
          })}
          src={previewUrl}
        />
      </div>
    );
  }
}

export default EditorPreview;
