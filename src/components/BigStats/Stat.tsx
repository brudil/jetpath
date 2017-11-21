import React from 'react';
import styled from 'react-emotion';

const Subtitle = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const Value: any = styled.div`
  font-size: 2rem;
  ${(props: any) => props.loading && 'visibility: hidden;'};
`;

const Container = styled.div`
  flex: 1 1 auto;
  text-align: center;
`;

interface IProps {
  subtitle: string;
  loading?: boolean;
  value?: boolean;
  render?: (loading: undefined | boolean, value: any) => any;
}

const render = (loading: undefined | boolean, value: any) =>
  loading ? '0' : value;

function Stat(props: IProps) {
  return (
    <Container>
      <Value loading={props.loading}>
        {props.render
          ? props.render(props.loading, props.value)
          : render(props.loading, props.value)}
      </Value>
      <Subtitle>{props.subtitle}</Subtitle>
    </Container>
  );
}

export default Stat;
