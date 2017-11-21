import React from 'react';
import { SidebarControlTreats } from './SidebarControlTreats';
import styled from 'react-emotion';

const Container = styled.div`
  margin-bottom: 1em;
`;

const ControlTitle = styled.h2`
  font-size: 1em;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0.25em;
  color: ${(props: any) => props.theme.colors.grey_winter};
`;

const ControlTitleLimit = styled.span`
  margin-left: 1em;
  color: ${(props: any) =>
    props.danger ? props.theme.colors.danger : props.theme.colors.grey_winter};
  font-size: 0.9em;
`;

interface IProps {
  title: string;
  children: any;
  charLimit?: number;
  charCount?: number;
  buttonTreats?: Array<Object>;
}

function SidebarControl({
  title,
  children,
  charLimit = null,
  charCount = null,
  buttonTreats = null,
}: IProps) {
  return (
    <Container>
      <ControlTitle>
        {title}

        {charCount !== null && charLimit !== null ? (
          <ControlTitleLimit
            warning={charCount > charLimit * 0.8}
            danger={charCount > charLimit}
          >
            {charCount}
            {charLimit !== null ? `/${charLimit}` : null}
          </ControlTitleLimit>
        ) : null}

        {buttonTreats !== null ? (
          <SidebarControlTreats buttonTreats={buttonTreats} />
        ) : null}
      </ControlTitle>
      {children}
    </Container>
  );
}

export { SidebarControl };
