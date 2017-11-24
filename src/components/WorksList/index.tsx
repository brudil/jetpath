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

import theme from '../../themes/default';
import { Author } from '../../ducks/Authors';
import { Vertical } from '../../ducks/Vertical';
import styled from 'react-emotion';
import { css } from 'emotion';
import { Status } from '../../libs/constants';

interface IProps {
  works: any[]; // todo
  vertical: Vertical;
}

const FauxLink = styled(Link)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const ListItem = styled.li`
  cursor: pointer;
  padding-left: 1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  position: relative;
  display: block;
  margin-bottom: 0.5em;

  &:hover {
    background: rgba(190, 190, 190, 0.1);
  }
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-family: 'pragmatica-web-condensed', sans-serif;
  font-weight: normal;
`;

const Meta = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
  padding-top: 0.2em;
  color: ${(props: any) => props.theme.colors.grey_worst_winter};
`;

const MetaBit = styled.span`
  margin-right: 0.6rem;
`;

const Nub = styled.div`
  width: 0.3em;
  height: 100%;
  background: ${(props: any) => props.theme.colors.grey_autumn};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  &_second {
    left: 0.5em;
  }
`;

const statusStubStyles = css`
  background-color: ${theme.colors.contentStatus_stub};
`;

const statusWritingStyles = css`
  background-color: ${theme.colors.contentStatus_writing};
`;

const statusFinishedStyles = css`
  background-color: ${theme.colors.contentStatus_finished};
`;

const statusPublishedStyles = css`
  background-color: #54de3c;
`;

// const statusUnpublishedStyles = css`
//   background-color: #f44e44;
// `;

const statusStyleMap: {
  [number: number]: string;
} = {
  [Status.Stub]: statusStubStyles,
  [Status.Writing]: statusWritingStyles,
  [Status.Finished]: statusFinishedStyles,
};

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
    <ul>
      {props.works.map(work => {
        if (!work) return null;
        const currentRevision = work.current_revision;

        const nubClasses = cx({
          [statusStyleMap[currentRevision.status]]: !work.published,
          [statusPublishedStyles]: work.published,
        });

        return (
          <ListItem key={work.content}>
            <Nub className={nubClasses} />
            <Title>
              <Link
                to={`/@${props.vertical.identifier}/editor/${work.content}`}
              >
                {currentRevision.headline}
              </Link>
            </Title>
            <Meta>
              <MetaBit>
                {startCase(contentForm[currentRevision.form])}{' '}
                {renderAuthors(currentRevision)}
              </MetaBit>
              <MetaBit>
                last edited: <SmartDate value={currentRevision.created} /> ago
                by{' '}
                {currentRevision.created_by &&
                  currentRevision.created_by.username}
              </MetaBit>
              <MetaBit>revision: #{work.revision_count}</MetaBit>
              <MetaBit>tone: {contentTone[currentRevision.tone]}</MetaBit>
              <MetaBit>status: {contentStatus[currentRevision.status]}</MetaBit>
              <ul className="inline-tags" />
            </Meta>
            <FauxLink
              to={`/@${props.vertical.identifier}/editor/${work.content}`}
            />
          </ListItem>
        );
      })}
    </ul>
  );
}

export default WorksList;
