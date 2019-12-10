import React from 'react';
import styled from '@emotion/styled';
import LoadingSpinner from './spinner.svg';
import {keyframes} from "emotion";
import {DelayedRender} from "../DelayedRender";

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(365deg);
  }
`;

const Container = styled.div`
  color: var(--color__grey);
  padding: 2rem;
  text-align: center;
`;
const Message = styled.span`
  display: block;
  
  & svg {
    animation: ${spinner} 1200ms linear infinite;
    display: inline-block;
    color: ${(props: any) => props.theme.colors.grey_winter};
  }
`;

function LoadingContent() {
  return (
    <Container>
      <Message>
        <LoadingSpinner width={24} height={24} />
      </Message>
    </Container>
  );
}

export default LoadingContent;

export function DelayedLoadingContent() {
  return (
    <DelayedRender delay={200} render={() => <LoadingContent />} />
  );
}
