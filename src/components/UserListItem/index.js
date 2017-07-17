import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import UserAvatar from '../UserAvatar';

import styles from './UserListItem.css';

function UserListItem(props) {
  function handleRemove() {
    if (props.onRemove !== null) {
      props.onRemove(props.user.id);
    }
  }

  const classes = classnames(styles.root, {
    [styles.root_removable]: props.onRemove !== null,
  });

  return (
    <div className={classes} onClick={handleRemove}>
      <UserAvatar className={styles.avatar} size={64} user={props.user} />
      <div className={styles.name}>
        {props.user.first_name} {props.user.last_name}
      </div>
      <div className={styles.handle}>
        {props.user.username}
      </div>
    </div>
  );
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
};

export default UserListItem;
