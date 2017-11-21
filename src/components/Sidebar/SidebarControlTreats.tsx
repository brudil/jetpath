import React from 'react';
import styled from 'react-emotion';

const TreatList = styled.ul`
  display: inline;
  margin-left: 1em;

  & li {
    display: inline;
  }
`;

const TreatButton = styled.button`
  border: 0;
  color: var(--color__grey);
  background-color: var(--color__outline);
  padding: 0.2rem;
  font-family: var(--base-font-family);
  font-weight: bold;
  text-transform: uppercase;
`;

export const SidebarControlTreats = (props: {
  buttonTreats: Array<Object>;
}) => (
  <TreatList>
    {props.buttonTreats.map((treat: any) => (
      <li>
        <TreatButton {...treat} />
      </li>
    ))}
  </TreatList>
);
