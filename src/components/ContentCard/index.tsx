import React from 'react';
import {Link} from "react-router-dom";

import styles from './ContentCard.css';
import FauxRouterLink from '../FauxLink/FauxRouterLink';
import SmartDate from "../SmartDate";

interface IProps {
  headline: string,
  link: string,
  currentRevision: {
    created: string,
    createdBy: {
      username: string
    } | null
  }
}

function ContentCard(props: IProps) {
  return (
    <div className={styles.root}>
      <FauxRouterLink to={props.link} />
      <h1 className={styles.headline}>
        <Link to={props.link}>{props.headline}</Link>
      </h1>
      <div className={styles.meta}>
        last edited <SmartDate value={props.currentRevision.created} /> ago
        by {props.currentRevision.createdBy && props.currentRevision.createdBy.username}
      </div>
    </div>
  );
}

export default ContentCard;
