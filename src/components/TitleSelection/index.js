import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import TitleSelectionItem from './SelectionItem';

import styles from './TitleSelection.css';

class TitleSelection extends React.Component {
  constructor(props) {
    super();

    const items = {};
    const itemsIds = [];
    let currentId = null;
    props.children.forEach(child => {
      items[child.props.name] = {
        title: child.props.children,
        id: child.props.name,
      };
      itemsIds.push(child.props.name);
      if ({}.hasOwnProperty.call(child.props, 'default')) {
        currentId = child.props.name;
      }
    });

    if (!currentId) {
      currentId = items[0].id;
    }

    this.state = {
      currentId,
      items,
      itemsIds,
      isOpen: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleOpen = this.handleDisplayVisibility.bind(this, true);
    this.handleClose = this.handleDisplayVisibility.bind(this, false);
  }

  handleSelect(selectedId) {
    if (this.state.currentId !== selectedId) {
      this.setState({ currentId: selectedId, isOpen: false });
      this.props.onSelection(selectedId);
    } else {
      this.setState({ isOpen: false });
    }
  }

  handleDisplayVisibility(open) {
    this.setState({ isOpen: open });
  }

  render() {
    const rootClasses = cx({
      [this.props.className]: true,
      [styles.root]: true,
      [styles.root_active]: this.state.isOpen,
    });

    return (
      <div className={rootClasses}>
        <h2
          className={cx(styles.title, styles.currentTitle, 'link')}
          onClick={this.handleOpen}
        >
          {this.state.items[this.state.currentId].title}
        </h2>

        <div className={styles.dropdown}>
          <h2 className={cx(styles.title, 'link')} onClick={this.handleClose}>
            {this.state.items[this.state.currentId].title}
          </h2>
          <ul className={styles.choices}>
            {this.state.itemsIds.map(id =>
              <TitleSelectionItem
                key={id}
                id={id}
                title={this.state.items[id].title}
                onItemClick={this.handleSelect}
              />
            )}
          </ul>
        </div>
      </div>
    );
  }
}

TitleSelection.propTypes = {
  className: PropTypes.string.isRequired,
  onSelection: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export { TitleSelection };

export class SelectionItem {
  constructor() {
    this.state = {
      value: this.props.value,
    };
  }
}
