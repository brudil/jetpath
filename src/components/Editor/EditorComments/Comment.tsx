import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import styled from 'react-emotion';

const Container = styled.div`
  margin-top: 2rem;
`;

const Username = styled.div`
  font-size: 0.9rem;
  text-align: right;
  color: ${(props: any) => props.theme.colors.grey_slate};
`;

const Body = styled.div`
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const Timestamp = styled.div`
  font-size: 0.8rem;
  text-align: right;
  color: ${(props: any) => props.theme.colors.grey_slate};
`;

function Comment(props: {
  user: { username: string };
  comment: string;
  created: string;
}) {
  return (
    <Container>
      <Username>{props.user.username}</Username>
      <Body>{props.comment}</Body>
      <Timestamp>{formatDistance(props.created, new Date())} ago</Timestamp>
    </Container>
  );
}

export default Comment;
