import React from 'react';

import styles from './ContentCard.css';
import FauxRouterLink from '../FauxLink/FauxRouterLink';

function ContentCard(props: { headline: string, link: string }) {

  return (
    <div className={styles.root}>
      <FauxRouterLink to={props.link} />
      <h1>{props.headline}</h1>
    </div>
  );
}

export default ContentCard;
