import React from 'react';
import Button from '../Button/index';
import styled from '@emotion/styled';

const TextButton = styled.button`
  color: var(--color__grey);
  font-size: 0.8rem;
  text-decoration: underline;
  padding: 0;
  border: 0;
  background: transparent;
`;

const Popover = styled.div`
  box-shadow: 0 1px 4px rgba(30, 30, 30, 0.1);
  padding: 0.5rem;
`;

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
        <TextButton onClick={this.handleInitialClick}>{text}</TextButton>
        {showingConfirm ? (
          <Popover>
            <div>{confirmText}</div>
            <Button onClick={onDelete} danger>{text}</Button>
          </Popover>
        ) : null}
      </div>
    );
  }
}

export default LowkeyDeleteButton;
