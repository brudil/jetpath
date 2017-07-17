import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './TitleSelection.css';

class SelectionItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.props.onItemClick.bind(this, this.props.id);
  }

  render() {
    const { title } = this.props;
    return (
      <li
        className={cx(styles.title, styles.choice, 'link')}
        onClick={this.handleSelect}
      >
        {title}
      </li>
    );
  }
}

SelectionItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  onItemClick: PropTypes.func,
};

export default SelectionItem;
