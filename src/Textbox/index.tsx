import styled from 'react-emotion';
import {css} from "emotion";
import theme from '../themes/default';

const { colors } = theme;

export const Textbox = styled.textarea`
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: inherit;
  padding: 5px;
  -webkit-appearance: none;
  width: 100%;
  box-sizing: border-box;
  border-radius: 2px;

  &:focus {
    outline: 0;
    border: 1px solid rgba(0, 0, 0, 0.26);
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.08) inset;
  }
`;

export const Input = Textbox.withComponent('input');

export const linkStyles = css`
  color: ${colors.accent};
  cursor: pointer;
`;
