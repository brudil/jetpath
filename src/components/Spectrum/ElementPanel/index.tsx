import React from 'react';
import cx from 'classnames';

import styles from './ElementPanel.css';
import {ElementPath} from '../spectrumInterfaces';

interface IProps {
  update: (options: { command: string, path: ElementPath, value?: any, position?: number }) => void,
  streamIndex: Array<any>, // todo: fix
  path: ElementPath,
  data: any, // todo: fix
  customElementPanel: any, // todo: search for react component type
  isHovering: boolean,
  isInStream: boolean,
}

interface IState {
  isOpen: boolean,
  shownDeleteConfirm: boolean,
}

class ElementPanel extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpen: false,
      shownDeleteConfirm: false,
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handlePrefsOpen = this.handlePrefsOpen.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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
        onClick={this.handleRemove}
      >
        <img
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
    const showUp = this.props.isInStream && !(this.props.streamIndex[0] < 1);
    const showPrefs = this.props.customElementPanel;
    const showRemove = this.props.isInStream;

    return (
      <ul className={styles.list}>
        {showPrefs
          ? <li
              className={styles.item}
              title="Open Preferences"
              onClick={this.handlePrefsOpen}
            >
              <img
              src={require('icons/vertical-elip.svg')}
                alt="Open preferences"
              />
            </li>
          : null}
        {showUp
          ? <li
              className={styles.item}
              title="Move Up"
              onClick={this.handleUp}
            >
              <img
              src={require('icons/up-caret.svg')}
                alt="Move element up"
              />
            </li>
          : null}
        {showDown
          ? <li
              className={styles.item}
              title="Move up"
              onClick={this.handleDown}
            >
              <img
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

export default ElementPanel;