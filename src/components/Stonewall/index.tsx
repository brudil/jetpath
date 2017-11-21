import React from 'react';
import jetpathLogo from 'logo.svg';
import styled from 'react-emotion';
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
const Logo = styled.img`
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

export function Stonewall(props: IProps) {
  return (
    <Container>
      <h1>
        <Logo src={jetpathLogo} role="presentation" />
      </h1>
      {props.subtitle ? <Subtitle>{props.subtitle}</Subtitle> : null}
      {props.children ? props.children : null}
    </Container>
  );
}

export default Stonewall;
