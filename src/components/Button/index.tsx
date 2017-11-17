import React from 'react';
import omit from 'lodash/omit';
import styled from "react-emotion";

const getColor = (props: any) => props.danger ? props.theme.colors.danger : props.theme.colors.accent;

const ButtonStyled = styled.button`
  display: block;
  width: 100%;
  padding: 6px;
  background-color: ${getColor};
  box-shadow: 0 1px 2px ${(props: any) => props.theme.colors.shadow_soft};
  border: 0;
  text-align: left;
  color: ${(props: any) => props.theme.colors.accentOnTop};
  font-size: 1em;
  border-radius: 2px;
  box-sizing: border-box;

  &[disabled] {
    background-color: ${(props: any) => props.theme.colors.grey_winter};
  }
`;


export function Button(props: {
  text: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: string;
  danger?: boolean;
}) {
  return (
    <ButtonStyled
      {...omit(props, ['text', 'className'])}
    >
      {props.text}
    </ButtonStyled>
  );
}

export default Button;
