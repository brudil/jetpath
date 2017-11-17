import styled from 'react-emotion';

export const Textbox = styled.textarea`
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  padding: 5px;
  -webkit-appearance: none;
  width: 100%;
  box-sizing: border-box;
  border-radius: 2px;

  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.08) inset;
  }
`;

export const Input = Textbox.withComponent('input');
