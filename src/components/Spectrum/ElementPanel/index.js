import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import * as SpectrumPropTypes from '../SpectrumPropTypes';

import styles from './ElementPanel.css';

class ElementPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      shownDeleteConfirm: false,
    };

    this.handleClickOutsideBound = this.handleClickOutside.bind(this);
    this.handlePrefsOpenBound = this.handlePrefsOpen.bind(this);
    this.handleUpBound = this.handleUp.bind(this);
    this.handleDownBound = this.handleDown.bind(this);
    this.handleRemoveBound = this.handleRemove.bind(this);
  }

  handleClickOutside() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false, shownDeleteConfirm: false });
    }
  }

  handlePrefsOpen() {
    this.setState({ isOpen: true });
  }

  handleUp() {
    this.props.update({ command: 'move', path: this.props.path, position: -1 });
  }

  handleDown() {
    this.props.update({ command: 'move', path: this.props.path, position: +1 });
  }

  handleRemove() {
    if (this.state.shownDeleteConfirm) {
      this.props.update({ command: 'remove', path: this.props.path });
    } else {
      this.setState({ shownDeleteConfirm: true });
    }
  }

  renderRemove() {
    return (
      <li
        className={styles.item}
        title="Remove"
        onClick={this.handleRemoveBound}
      >
        <img
          // eslint-disable-next-line
          src={require(`icons/cross${this.state.shownDeleteConfirm ? '-danger' : ''}.svg`)}
          alt="Remove element"
        />
      </li>
    );
  }

  renderHoverPanel() {
    const showDown =
      this.props.isInStream &&
      this.props.streamIndex[0] < this.props.streamIndex[1] - 1;
    const showUp = this.props.isInStream && !this.props.streamIndex[0] < 1;
    const showPrefs = this.props.customElementPanel;
    const showRemove = this.props.isInStream;

    return (
      <ul className={styles.list}>
        {showPrefs
          ? <li
              className={styles.item}
              title="Open Preferences"
              onClick={this.handlePrefsOpenBound}
            >
              <img
                // eslint-disable-next-line
              src={require('icons/vertical-elip.svg')}
                alt="Open preferences"
              />
            </li>
          : null}
        {showUp
          ? <li
              className={styles.item}
              title="Move Up"
              onClick={this.handleUpBound}
            >
              <img
              // eslint-disable-next-line
              src={require('icons/up-caret.svg')}
                alt="Move element up"
              />
            </li>
          : null}
        {showDown
          ? <li
              className={styles.item}
              title="Move up"
              onClick={this.handleDownBound}
            >
              <img
                // eslint-disable-next-line
              src={require('icons/down-caret.svg')}
                alt="Move element down"
              />
            </li>
          : null}
        {showRemove ? this.renderRemove() : null}
      </ul>
    );
  }

  renderOpenPanel() {
    const { customElementPanel, data, update, path } = this.props;
    const el = React.createElement(customElementPanel, { data, update, path });
    return (
      <div>
        {el}
      </div>
    );
  }

  render() {
    const classNames = cx(styles.root, {
      [styles.root_open]: this.state.isOpen,
      [styles.root_visible]: this.props.isHovering,
    });
    return (
      <div className={classNames}>
        <div className={styles.inner}>
          {this.state.isOpen ? this.renderOpenPanel() : this.renderHoverPanel()}
        </div>
      </div>
    );
  }
}

ElementPanel.propTypes = {
  update: PropTypes.func,
  streamIndex: PropTypes.array,
  path: SpectrumPropTypes.elementPath.isRequired,
  data: PropTypes.object,
  customElementPanel: PropTypes.element,
  isHovering: PropTypes.bool,
  isInStream: PropTypes.bool,
};

export default ElementPanel;
