import React from 'react';
import cx from 'classnames';
import upperFirst from 'lodash/upperFirst';
import Button from '../Button';
import SmartDate from '../SmartDate';
import SaveBeforeWorkflowMessage from '../SaveBeforeWorkflowMessage';

import styles from './EditorWorkflow.css';
import { SidebarControl } from '../Sidebar';

function getIssuesForRevision(revision: any) {
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

interface IProps {
  savedRevision: any; // todo
  workingRevision: any; // todo
  editorialMetadata: any; // todo
  isLocal: boolean;
  hasChangesFromSaved: boolean;
  onPublish: any; // todo
  onChangeStatus: any; // todo
}

function EditorWorkflow(props: IProps) {
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
          <ul>{issues.map(issue => <li>{issue}</li>)}</ul>
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
      console.log({ publishedRevision, editorialMetadata })
      const renderPublishedData = () => (
        <div>
          #{publishedRevision.get('revision_number')}
          <em>
            {' '}
            ({revisionNumberDifference > 0
              ? `${revisionNumberDifference} behind`
              : 'latest'})
          </em>
          <div>
            Published:{' '}
            <SmartDate value={editorialMetadata.get('published_date')} />
          </div>
          {publishedWasUpdated ? (
            <div>
              Updated:{' '}
              <SmartDate
                value={editorialMetadata.get('published_updated_date')}
              />
            </div>
          ) : null}

          <a className="Button" href={`https://thedrab.co/article/${publishedRevision.get('slug')}-${editorialMetadata.get('id')}`}>View on site</a>
        </div>
      );

      return (
        <div>
          {isPublished ? renderPublishedData() : null}
          {revisionNumberDifference > 0 || !isPublished ? (
            <Button text="Publish" onClick={onPublish} />
          ) : null}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.root}>
      <SidebarControl title="Now">
        {hasChangesFromSaved ? (
          <p>Unsaved changes!</p>
        ) : (
          <p>Saved as revision #{savedRevision.get('revision_number')}</p>
        )}
      </SidebarControl>
      <SidebarControl
        className={cx({
          [styles.sectionDisabled]: hasChangesFromSaved,
        })}
        title="Next"
      >
        {renderNextSection()}
      </SidebarControl>
    </div>
  );
}

export default EditorWorkflow;
