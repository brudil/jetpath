import React from 'react';
import chunk from 'lodash/chunk';
import styled from '@emotion/styled';
import { css } from 'emotion';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid rgba(190, 190, 190, 0.9);
  border-left: 0;
  border-bottom: 0;
`;

const optionActive = css`
  background: rgba(245, 245, 245, 0.8);
  font-weight: bold;
`;

const Option = styled.div`
  flex: 1 1 auto;
  border-left: 1px solid rgba(190, 190, 190, 0.9);
  border-bottom: 1px solid rgba(190, 190, 190, 0.9);
  padding: 0.25em 0.5em;
  text-align: center;
  cursor: pointer;

  ${(props: any) => props.active && optionActive};
`;

type controlId = string | number | null;
type optionTuple = [controlId, string];

export function SegmentedControl(props: {
  className?: string;
  value: controlId;
  options: Array<controlId | string>;
  onChange: (id: any) => void;
}) {
  function handleChange(optionId: controlId) {
    if (optionId !== props.value) {
      props.onChange(optionId);
    }
  }

  const options = chunk(props.options, 2) as Array<optionTuple>;
  return (
    <Container className={props.className}>
      {options.map(option => {
        const [id, lang]: [any, string] = option;
        return (
          <Option
            key={id}
            onClick={handleChange.bind({}, id)}
            active={id === props.value}
          >
            {lang}
          </Option>
        );
      })}
    </Container>
  );
}

export default SegmentedControl;
