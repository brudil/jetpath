import React from 'react';
import JetpathLogo from 'logo.svg';
import styled from '@emotion/styled';
import { keyframes } from 'emotion';

const tardis = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.4;
  }
`;

const Container = styled.div`
  width: 360px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15vh;
`;
const JetpathLogoContainer = styled(JetpathLogo)`
  margin: 0 auto 0.5em;
  display: block;
  height: 68px;
`;
const Subtitle = styled.h2`
  font-weight: normal;
  text-transform: lowercase;
  text-align: center;
  animation: ${tardis} 700ms ease-out infinite alternate;
`;

interface IProps {
  subtitle?: string;
  children?: any;
}

export const Stonewall: React.FC<IProps> = (props) => {
  return (
    <Container>
      <h1>
        <JetpathLogoContainer role="presentation" />
      </h1>
      {props.subtitle ? <Subtitle>{props.subtitle}</Subtitle> : null}
      {props.children ? props.children : null}
    </Container>
  );
}

export default Stonewall;
