import React from 'react';
import cx from 'classnames';

import styles from './Sidebar.css';
import {SidebarControlTreats} from "./SidebarControlTreats";
import styled from "react-emotion";

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

  const charCountStyles = (charLimit && charCount) ? {[styles.warning]: charCount > (charLimit * 0.8), [styles.danger]: charCount > charLimit,  } : {};
  return (
    <Container>
      <ControlTitle>
        {title}

        {charCount !== null ? (
          <span className={cx(styles.controlTitleLimit, charCountStyles)}>
            {charCount}
            {charLimit !== null ? `/${charLimit}` : null}
          </span>
        ) : null}

        {buttonTreats !== null ? <SidebarControlTreats buttonTreats={buttonTreats} /> : null}
      </ControlTitle>
      {children}
    </Container>
  );
}

export { SidebarControl };
