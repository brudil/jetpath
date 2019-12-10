import React from 'react';
import cx from 'classnames';
import DumbGravatar from '../DumbGravatar';

interface IProps {
  user: any; // todo
  className?: string;
  size: number;
}

const UserAvatar: React.FC<IProps> = (props) => {
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

export default UserAvatar;
