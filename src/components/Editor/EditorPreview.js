import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import SaveBeforeWorkflowMessage from '../SaveBeforeWorkflowMessage';

import styles from './EditorPreview.css';
import SegmentedControl from '../SegmentedControl/index';

class EditorPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'FULL',
    };
  }

  render() {
    const {
      hasChangesFromSaved,
      isLocal,
      savedRevision,
      editorialMetadata,
    } = this.props;

    if (isLocal) {
      return <SaveBeforeWorkflowMessage />;
    }

    if (!editorialMetadata || !savedRevision) {
      return <p>Loading</p>;
    }

    // TODO: work out the best way to get vertical url
    return (
      <div className={styles.root}>
        {hasChangesFromSaved
          ? <div>Preview works off last saved revision.</div>
          : null}
        <SegmentedControl
          value={this.state.mode}
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
        <iframe
          className={cx(styles.frame, {
            [styles.frameDesktop]: this.state.mode === 'DESKTOP',
            [styles.frameTablet]: this.state.mode === 'TABLET',
            [styles.frameMobile]: this.state.mode === 'MOBILE',
          })}
          src={`https://thedrab.co/preview/${savedRevision.get(
            'id'
          )}/${savedRevision.get('preview_key')}`}
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
