import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import startCase from 'lodash/startCase';
import SmartDate from '../SmartDate';
import {
  contentForm,
  contentTone,
  contentStatus,
} from '../../lang/content_attrs';

import styles from './WorksList.css';
import { Author } from '../../ducks/Authors';
import { Vertical } from '../../ducks/Vertical';

interface IProps {
  works: any[]; // todo
  vertical: Vertical;
}

function WorksList(props: IProps) {
  function renderAuthors(revision: any) {
    // todo
    if (revision.authors.length <= 0) {
      return (
        <span>
          by <em>nobody</em>
        </span>
      );
    }

    return (
      <span>
        <span>by </span>
        {revision.authors.map((author: Author, index: number) => (
          <span key={author.id}>
            <span>{author.name}</span>
            {index < revision.authors.length - 1 ? (
              <span>
                {index >= revision.authors.length - 2 ? ' and ' : ', '}
              </span>
            ) : null}
          </span>
        ))}
      </span>
    );
  }

  return (
    <ul className={styles.rootList}>
      {props.works.map(work => {
        if (!work) return null;
        const currentRevision = work.current_revision;

        const nubClasses = cx(styles.itemNub, {
          [(styles as any)[
            `itemNub--status-${contentStatus[
              currentRevision.status
            ].toLowerCase()}`
          ]]: !work.published,
          [styles.itemNub_statusPublished]: work.published,
        });

        return (
          <li className={styles.item} key={work.content}>
            <div className={nubClasses} />
            <h2 className={styles.itemTitle}>
              <Link
                to={`/@${props.vertical.identifier}/editor/${work.content}`}
              >
                {currentRevision.headline}
              </Link>
            </h2>
            <div className={styles.itemMeta}>
              <span className={styles.itemMetaBit}>
                {startCase(contentForm[currentRevision.form])}{' '}
                {renderAuthors(currentRevision)}
              </span>
              <span className={styles.itemMetaBit}>
                last edited: <SmartDate value={currentRevision.created} /> ago
                by{' '}
                {currentRevision.created_by &&
                  currentRevision.created_by.username}
              </span>
              <span className={styles.itemMetaBit}>
                revision: #{work.revision_count}
              </span>
              <span className={styles.itemMetaBit}>
                tone: {contentTone[currentRevision.tone]}
              </span>
              <span className={styles.itemMetaBit}>
                status: {contentStatus[currentRevision.status]}
              </span>
              <ul className="inline-tags" />
            </div>
            <Link
              className={styles.fauxLink}
              to={`/@${props.vertical.identifier}/editor/${work.content}`}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default WorksList;
