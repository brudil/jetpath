import React from 'react';
import styled from '@emotion/styled';
import { ConditionalWrap } from '../ConditionalWrap';
import { Link } from 'react-router-dom';

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
  padding: 1rem;
  box-sizing: border-box;

  & a {
    color: inherit;
  }
`;

interface IProps {
  subtitle: string;
  loading?: boolean;
  value?: boolean;
  render?: (loading: undefined | boolean, value: any) => any;
  to?: string;
}

const render = (loading: undefined | boolean, value: any) =>
  loading ? '0' : value;

const Stat: React.FC<IProps> = (props) => {
  return (
    <Container>
      <ConditionalWrap
        condition={!!props.to}
        wrap={children => <Link to={props.to || ''}>{children}</Link>}
      >
        <Value loading={props.loading}>
          {props.render
            ? props.render(props.loading, props.value)
            : render(props.loading, props.value)}
        </Value>
        <Subtitle>{props.subtitle}</Subtitle>
      </ConditionalWrap>
    </Container>
  );
}

export default Stat;
