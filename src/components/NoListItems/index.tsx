import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  color: ${(props: any) => props.theme.colors.grey_winter};
`;

const Face = styled.span`
  display: block;
  text-align: center;
  font-size: 6em;
  margin-bottom: 0.5em;
`;

const Message = styled.span`
  font-style: italic;
  text-align: center;
  display: block;
  font-size: 1.8em;
`;

interface IProps {
  text: string;
}

export const NoListItems: React.FC<IProps> = (props) => {
  return (
    <Container>
      <Face>:(</Face>
      <Message>{props.text}</Message>
    </Container>
  );
}
export default NoListItems;
