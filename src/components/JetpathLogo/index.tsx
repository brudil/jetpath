import React from 'react';
import loSample from 'lodash/sample';
import logoQuotes from '../../lang/logo_quotes';

import jetpathLogo from 'logo.svg';
import styled from 'react-emotion';

const Logo: any = styled.img`
  opacity: 1;
  height: 22px;
  transition: transform 200ms ease;
  display: block;
  float: left;

  @media (min-width: 960px) {
    margin: 0 auto;
    float: none;
  }

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

function JetpathLogo() {
  return <Logo src={jetpathLogo} alt="Jetpath" title={loSample(logoQuotes)} />;
}

export default JetpathLogo;
