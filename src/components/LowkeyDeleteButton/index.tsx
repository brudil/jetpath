import React from 'react';

import styles from './LowkeyDeleteButton.css';
import Button from '../Button/index';

interface IProps {
  text: string;
  confirmText: string;
  onDelete: () => void;
}

interface IState {
  showingConfirm: boolean;
}

class LowkeyDeleteButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      showingConfirm: false,
    };

    this.handleInitialClick = this.handleInitialClick.bind(this);
  }

  handleInitialClick() {
    this.setState({ showingConfirm: true });
  }

  render() {
    const { text, confirmText, onDelete } = this.props;
    const { showingConfirm } = this.state;

    return (
      <div>
        <button className={styles.textButton} onClick={this.handleInitialClick}>
          {text}
        </button>
        {showingConfirm ? (
          <div className={styles.popover}>
            <div>{confirmText}</div>
            <Button text={text} onClick={onDelete} danger />
          </div>
        ) : null}
      </div>
    );
  }
}

export default LowkeyDeleteButton;
