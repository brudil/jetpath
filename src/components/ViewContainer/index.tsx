import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 1rem;

  @media (min-width: 960px) {
    padding: 1rem 1.5rem;
  }
`;

interface IProps {
  children: JSX.Element | Array<JSX.Element | null>;
}

function ViewContainer(props: IProps) {
  return <Container>{props.children}</Container>;
}

export default ViewContainer;
