import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';
import SaveBeforeWorkflowMessage from '../SaveBeforeWorkflowMessage';

import styles from './EditorPreview.css';
import SegmentedControl from '../SegmentedControl/index';
import Button from '../Button/index';
import ViewContainer from '../ViewContainer/index';

class EditorPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'FULL',
      copiedPreviewUrl: false,
    };
  }

  render() {
    const {
      hasChangesFromSaved,
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
              'FULL',
              'Full',
              'DESKTOP',
              'Desktop',
              'TABLET',
              'Tablet',
              'MOBILE',
              'Mobile',
            ]}
            onChange={value => this.setState({ mode: value })}
          />
        </ViewContainer>
        <iframe
          className={cx(styles.frame, {
            [styles.frameDesktop]: this.state.mode === 'DESKTOP',
            [styles.frameTablet]: this.state.mode === 'TABLET',
            [styles.frameMobile]: this.state.mode === 'MOBILE',
          })}
          src={previewUrl}
        />
      </div>
    );
  }
}

EditorPreview.propTypes = {
  savedRevision: PropTypes.object,
  workingRevision: PropTypes.object,
  editorialMetadata: PropTypes.object,
  isLocal: PropTypes.bool.isRequired,
  hasChangesFromSaved: PropTypes.bool.isRequired,
  onPublish: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
};

export default EditorPreview;
