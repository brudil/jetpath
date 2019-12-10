import React from 'react';
import Stat from './Stat';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
`;

interface IProps {
  data: null | any[];
  children: any;
}

const BigStats: React.FC<IProps> = (props) => {
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
