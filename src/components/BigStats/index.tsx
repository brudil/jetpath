import React from 'react';
import Stat from './Stat';
import styled from 'react-emotion';

const Container = styled.div`
  display: flex;
  align-content: space-between;
`;

interface IProps {
  data: null | any[];
  children: any;
}

function BigStats(props: IProps) {
  return (
    <Container>
      {props.children.map((child: any, index: number) =>
        React.cloneElement(child, {
          loading: props.data === null,
          value: props.data === null ? null : props.data[index],
        })
      )}
    </Container>
  );
}

export { Stat };

export default BigStats;
