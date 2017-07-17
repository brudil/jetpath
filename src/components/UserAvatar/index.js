import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import DumbGravatar from '../DumbGravatar';

function UserAvatar(props) {
  return (
    <div className={cx('user-avatar', props.className)}>
      <DumbGravatar
        hash={props.user.gravatar_hash}
        alt={`Profile picture of ${props.user.username}`}
        size={props.size}
      />
    </div>
  );
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
};

UserAvatar.defaultProps = {
  className: '',
};

export default UserAvatar;
