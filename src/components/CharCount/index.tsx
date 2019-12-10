import React from 'react';
import {css, cx} from "emotion";
import styled from "@emotion/styled";

const Container = styled.div`
  display: inline;
  font-weight: lighter;
  opacity: 0.5;
`;

const warningStyle = css`
  color: var(--color__warning-accent);
`;

const dangerStyles = css`
  color: var(--color__danger-accent);
`;

export const CharCount: React.FC<{ value: string; max: number }> = ({ value, max }) => {
  const length = value ? value.length : 0;
  return (
    <Container
      className={cx({
        [warningStyle]: length > max * 0.8,
        [dangerStyles]: length > max,
      })}
    >
      <span>{max - length}</span>
      <span>/</span>
      <span>{max}</span>
    </Container>
  );
}

export default CharCount;
