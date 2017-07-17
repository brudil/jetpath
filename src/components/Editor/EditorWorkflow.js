import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import upperFirst from 'lodash/upperFirst';
import Button from '../Button';
import SmartDate from '../SmartDate';
import SaveBeforeWorkflowMessage from '../SaveBeforeWorkflowMessage';

import styles from './EditorWorkflow.css';

function getIssuesForRevision(revision) {
  const issues = [];

  if (revision.get('authors').size <= 0) {
    issues.push('At least one author is required');
  }

  for (const field of [
    'slug',
    'headline',
    'kicker',
    'standfirst',
    'section',
    'poster_image',
  ]) {
    if (!revision.get(field)) {
      issues.push(`${upperFirst(field.replace('_', ' '))} is required`);
    }
  }

  return issues;
}

function EditorWorkflow(props) {
  const {
    hasChangesFromSaved,
    isLocal,
    savedRevision,
    workingRevision,
    editorialMetadata,
    onPublish,
    onChangeStatus,
  } = props;

  if (isLocal) {
    return <SaveBeforeWorkflowMessage />;
  }

  if (!editorialMetadata || !savedRevision) {
    return <p>Loading</p>;
  }

  const currentStatus = savedRevision.get('status');
  const publishedRevision = editorialMetadata.get('published_revision');
  const isPublished = publishedRevision !== null;
  const savedRevisionNumber = savedRevision.get('revision_number');
  let revisionNumberDifference = -1;

  if (isPublished) {
    revisionNumberDifference =
      savedRevisionNumber - publishedRevision.get('revision_number');
  }

  const handleMoveToDraft = onChangeStatus.bind(null, 5);
  const handleMoveToFinal = onChangeStatus.bind(null, 9);

  const renderNextSection = () => {
    if (currentStatus === 1) {
      // stub
      return <Button text="Move to draft" onClick={handleMoveToDraft} />;
    }

    if (currentStatus === 5) {
      // draft
      const issues = getIssuesForRevision(workingRevision);
      return (
        <div>
          <ul>
            {issues.map(issue =>
              <li>
                {issue}
              </li>
            )}
          </ul>
          <Button
            text="Move to final"
            disabled={issues.length > 0}
            onClick={handleMoveToFinal}
          />
        </div>
      );
    }

    if (currentStatus === 9) {
      // final
      const publishedWasUpdated =
        editorialMetadata.get('published_date') !==
        editorialMetadata.get('published_updated_date');
      const renderPublishedData = () =>
        <div>
          #{publishedRevision.get('revision_number')}
          <em>
            {' '}({revisionNumberDifference > 0
              ? `${revisionNumberDifference} behind`
              : 'latest'})
          </em>
          <div>
            Published:{' '}
            <SmartDate value={editorialMetadata.get('published_date')} />
          </div>
          {publishedWasUpdated
            ? <div>
                Updated:{' '}
                <SmartDate
                  value={editorialMetadata.get('published_updated_date')}
                />
              </div>
            : null}
        </div>;

      return (
        <div>
          {isPublished ? renderPublishedData() : null}
          {revisionNumberDifference > 0 || !isPublished
            ? <Button text="Publish" onClick={onPublish} />
            : null}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h4
          className={cx(
            styles.sectionTitle,
            styles[`sectionTitle_${hasChangesFromSaved ? 'issue' : 'ok'}`]
          )}
        >
          Now
        </h4>
        {hasChangesFromSaved
          ? <p>Unsaved changes!</p>
          : <p>
              Saved as revision #{savedRevision.get('revision_number')}
            </p>}
      </div>
      <div
        className={cx(styles.section, {
          [styles.section_disabled]: hasChangesFromSaved,
        })}
      >
        <h4 className={styles.sectionTitle}>Next</h4>
        {renderNextSection()}
      </div>
    </div>
  );

  /*
  const renderWorkflowPublishSection = () => {
    const publishedDetails = () => {
      return (
        <div />
      );
    };

    return (
      <div>
        <h4>{isPublished ? 'Live' : 'Not live'}</h4>
        {isPublished ? publishedDetails() : null}
      </div>
    );
  };

  return (
    <div>
      <h4>revision #{savedRevision.get('revision_number')}</h4>
      <div>Saved <SmartDate value={savedRevision.get('created')} /></div>
      <div>Created: <SmartDate value={editorialMetadata.get('created')} /></div>

      <SegmentedControl
        options={[
          1, 'Stub',
          5, 'Draft',
          9, 'Final',
        ]}
        value={savedRevision.get('status')}
        onChange={onChangeStatus}
      />

      <Button
        text="Publish"
        disabled={isLocal || hasChangesFromSaved || savedRevision.get('status') !== 9}
        onClick={onPublish}
      />

        {renderWorkflowPublishSection()}
    </div>
  );*/
}

EditorWorkflow.propTypes = {
  savedRevision: PropTypes.object,
  workingRevision: PropTypes.object,
  editorialMetadata: PropTypes.object,
  isLocal: PropTypes.bool.isRequired,
  hasChangesFromSaved: PropTypes.bool.isRequired,
  onPublish: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
};

export default EditorWorkflow;
