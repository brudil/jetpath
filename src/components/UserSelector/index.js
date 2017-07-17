import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Mousetrap from 'mousetrap';
import loSome from 'lodash/some';
import * as UserActions from '../../actions/UserActions';

import styles from './UserSelector.css';

class UserSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      selectedIndex: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleInputFocus.bind(this, true);
    this.handleBlur = this.handleInputFocus.bind(this, false);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value !== '' && this.props.usersList.length > 0) {
      this.handleAddUser(this.props.usersList[this.state.selectedIndex].id);
    }
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ value, selectedIndex: 0 });
    this.props.dispatch(UserActions.requestSuggestions(value));
  }

  handleInputFocus(focus) {
    this.setState({ hasFocus: focus });

    if (focus) {
      Mousetrap.bind('down', () => {
        if (this.state.selectedIndex < this.props.usersList.length - 1) {
          this.setState({ selectedIndex: this.state.selectedIndex + 1 });
        }
      });

      Mousetrap.bind('up', () => {
        if (this.state.selectedIndex > 0) {
          this.setState({ selectedIndex: this.state.selectedIndex - 1 });
        }
      });

      Mousetrap.bind('esc', () => {
        this._inputField.blur();
        this.setState({ value: '' });
      });
    } else {
      Mousetrap.unbind('esc');
      Mousetrap.unbind('down');
      Mousetrap.unbind('up');
    }
  }

  handleAddUser(userId) {
    this.props.onAddUser(userId);
    this.setState({ value: '', selectedIndex: 0 });
  }

  renderSuggestionItem(user, index) {
    const itemHasFocus = index === this.state.selectedIndex;

    if (this.props.hiddenIds.indexOf(user.id) !== -1) {
      return null;
    }

    return (
      <li
        className={cx(styles.suggestion, {
          [styles.suggestion_focus]: itemHasFocus,
        })}
        key={user.id}
        onClick={this.handleAddUser.bind(this, user.id)}
      >
        <span className={styles.suggestionName}>
          {user.first_name} {user.last_name}
        </span>
        <span className={styles.suggestionUsername}>
          {user.username}
        </span>
        {user.id === this.props.currentUser.id
          ? <span className={styles.suggestionCurrentUser}>(you!)</span>
          : null}
      </li>
    );
  }

  renderSuggestions() {
    const { usersList, currentUser } = this.props;
    if (usersList.length <= 0) {
      return <div>No users found.</div>;
    }

    let currentUserItem = null;

    if (
      ['m', 'me'].indexOf(this.state.value) !== -1 &&
      !loSome(usersList, { id: currentUser.id })
    ) {
      currentUserItem = this.renderSuggestionItem(currentUser, 0);
    }

    return (
      <ol className={styles.list}>
        {currentUserItem}
        {usersList.map((user, index) =>
          this.renderSuggestionItem(
            user,
            currentUserItem === null ? index : index + 1
          )
        )}
      </ol>
    );
  }

  render() {
    const { value, hasFocus } = this.state;
    return (
      <div className={styles.root}>
        <form onSubmit={this.handleSubmit}>
          <input
            className="mousetrap"
            type="text"
            placeholder={this.props.placeholderText}
            value={this.state.value}
            ref={el => {
              this._inputField = el;
            }}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
        </form>
        {value !== '' && hasFocus ? this.renderSuggestions() : null}
      </div>
    );
  }
}

UserSelector.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onAddUser: PropTypes.func.isRequired,
  usersList: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  userEntities: PropTypes.object.isRequired,
  hiddenIds: PropTypes.array.isRequired,
  placeholderText: PropTypes.string,
};

UserSelector.defaultProps = {
  hiddenIds: [],
  placeholderText: 'Search for user or me',
};

export default connect(state => ({
  usersList: state.users.suggestions.map(id => state.entities.users[id]),
  userEntities: state.entities.users,
  currentUser: state.auth.auth,
}))(UserSelector);
