import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FauxLink.css';

// eslint-disable-next-line jsx-a11y/anchor-has-content
export default ({ to }: { to: string }) => (
  <Link className={styles.root} to={to} />
);

export const InnerLink = ({ className = '', ...props }: any) => (
  <Link {...props} className={`u-faux-link-inner ${className}`}>
    {props.children}
  </Link>
);
