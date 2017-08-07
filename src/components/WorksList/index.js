import PropTypes from 'prop-types';
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

function getUsersDisplayName(user) {
  if (user.first_name !== '' || user.last_name !== '') {
    return `${user.first_name} ${user.last_name}`;
  }

  return `@${user.username}`;
}

function WorksList(props) {
  function renderAuthors(revision) {
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
        {revision.authors.map((author, index) =>
          <span key={author.id}>
            <span>
              {author.name}
            </span>
            {index < revision.authors.length - 1
              ? <span>
                  {index >= revision.authors.length - 2 ? ' and ' : ', '}
                </span>
              : null}
          </span>
        )}
      </span>
    );
  }

  return (
    <ul className={styles.rootList}>
      {props.works.map(work => {
        if (!work) return null;
        const currentRevision = work.current_revision;

        const nubClasses = cx(styles.itemNub, {
          [styles[
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
              <Link to={`/@${props.vertical}/editor/${work.content}`}>
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
              to={`/@${props.vertical}/editor/${work.content}`}
            />
          </li>
        );
      })}
    </ul>
  );
}

WorksList.propTypes = {
  works: PropTypes.array.isRequired,
  vertical: PropTypes.string.isRequired,
};

export default WorksList;
