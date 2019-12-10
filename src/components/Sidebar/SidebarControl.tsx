import React from 'react';
import { SidebarControlTreats } from './SidebarControlTreats';
import styled from '@emotion/styled';

const Container = styled.div`
  margin-bottom: 1em;
`;

const ControlTitle = styled.h2`
  font-size: 1em;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0.25em;
  color: ${(props: any) => props.theme.colors.grey_worst_winter};
`;

const ControlTitleLimit: React.FC<{ warning: boolean, danger: boolean }> = ({ danger, children}) => {
  return (<span css={`
  margin-left: 1em;
  color: ${(props: any) =>
    danger ? props.theme.colors.danger : props.theme.colors.grey_winter};
  font-size: 0.9em;
`}>{children}</span>)
}

interface IProps {
  title: string;
  children: any;
  charLimit?: number;
  charCount?: number;
  buttonTreats?: Array<Object>;
  className?: string;
}

const SidebarControl: React.FC<IProps> = ({
  title,
  children,
  charLimit,
  charCount,
  buttonTreats,
  className,
}) => {
  return (
    <Container className={className}>
      <ControlTitle>
        {title}
 
        {charCount !== undefined && charLimit !== undefined ? (
          <ControlTitleLimit
            warning={charCount && charLimit && charCount > charLimit * 0.8 || false}
            danger={charCount && charLimit && charCount > charLimit || false}
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
