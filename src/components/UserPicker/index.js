import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import UserListItem from '../UserListItem';
import UserSelector from '../UserSelector';

import styles from './UserPicker.css';

class UsersPicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleUserRemove = this.handleUserRemove.bind(this);
    this.handleUserAdd = this.handleUserAdd.bind(this);
  }

  handleUserAdd(userId) {
    this.props.onAdd(userId);
  }

  handleUserRemove(userId) {
    this.props.onRemove(userId);
  }

  render() {
    const classes = classnames(styles.root);

    return (
      <div className={classes}>
        <div className={styles.currentList}>
          {this.props.users.length <= 0
            ? <div className={styles.noUsers}>
                {this.props.noUsersText}
              </div>
            : null}
          {this.props.users.map(userId =>
            <UserListItem
              user={this.props.userEntities[userId]}
              onRemove={this.handleUserRemove}
              key={userId}
            />
          )}
        </div>
        <div className={styles.selector}>
          <UserSelector
            onAddUser={this.handleUserAdd}
            hiddenIds={this.props.users}
            placeholderText={this.props.placeholderText}
          />
        </div>
      </div>
    );
  }
}

UsersPicker.propTypes = {
  users: PropTypes.array.isRequired,
  userEntities: PropTypes.object.isRequired,
  onRemove: PropTypes.func,
  onAdd: PropTypes.func,
  noUsersText: PropTypes.string,
  placeholderText: PropTypes.string,
};

UsersPicker.defaultProps = {
  noUsersText: 'No users selected',
};

export default connect(state => ({
  userEntities: state.entities.users,
}))(UsersPicker);
