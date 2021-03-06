import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import styled from '@emotion/styled';
import { IComment } from './index';
import { differenceInMinutes } from 'date-fns';
import ReactMarkdown from 'react-markdown';

const Container = styled.div`
  margin-top: 0.6rem;
`;

const Username = styled.div`
  font-size: 0.9rem;
  text-align: right;
  color: ${(props: any) => props.theme.colors.grey_slate};
  margin-bottom: 0.2rem;
`;

const Body = styled.div`
  padding: 0.4rem;
  background: #fff;
  box-shadow: 1px 1px 2px rgba(30, 30, 30, 0.1);
  border-radius: 1px;

  & ul {
    list-style: inside disc;
  }
`;

const Timestamp = styled.div`
  font-size: 0.6rem;
  text-align: center;
  color: ${(props: any) => props.theme.colors.grey_worst_winter};
  margin-bottom: 0.4rem;
`;

function Comment(props: {
  user: { username: string };
  comment: string;
  created: string;
  previousComment: IComment | null;
  nextComment: IComment | null;
}) {
  const displayUsername =
    props.previousComment === null ||
    props.previousComment.user.username !== props.user.username;

  const displayTimestamp =
    props.previousComment === null ||
    differenceInMinutes(new Date(props.created), new Date(props.previousComment.created)) > 90;
  return (
    <Container>
      {displayTimestamp && (
        <Timestamp>{formatDistance(new Date(props.created), new Date())} ago</Timestamp>
      )}
      {displayUsername && <Username>{props.user.username}</Username>}
      <Body>
        <ReactMarkdown source={props.comment} />
      </Body>
    </Container>
  );
}

export default Comment;
