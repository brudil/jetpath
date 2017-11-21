import React from 'react';
import styled from 'react-emotion';

const Container = styled.div`
  color: var(--color__grey);
`;
const Message = styled.span`
  font-style: italic;
  text-align: center;
  padding-top: 20vh;
  display: block;
  font-size: 1.8em;
`;

function LoadingContent() {
  return (
    <Container>
      <Message>Loading</Message>
    </Container>
  );
}

export default LoadingContent;
