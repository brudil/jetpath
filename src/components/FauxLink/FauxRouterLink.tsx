import React from 'react';
import { Link } from 'react-router-dom';
import {css} from "emotion";

const linkStyles = css`
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  z-index: 100 !important;
`;

// eslint-disable-next-line jsx-a11y/anchor-has-content
export default ({ to }: { to: string }) => (
  <Link className={linkStyles} to={to} />
);

export const InnerLink = ({ className = '', ...props }: any) => (
  <Link {...props} className={`u-faux-link-inner ${className}`}>
    {props.children}
  </Link>
);
