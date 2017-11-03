import React from 'react';
import formatDistance from 'date-fns/formatDistance';

import styles from './Comment.css';

function Comment(props: {
  user: { username: string };
  comment: string;
  created: string;
}) {
  return (
    <div className={styles.root}>
      <div className={styles.username}>{props.user.username}</div>
      <div className={styles.body}>{props.comment}</div>
      <div className={styles.date}>
        {formatDistance(props.created, new Date())} ago
      </div>
    </div>
  );
}

export default Comment;
