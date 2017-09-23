import React from 'react';

interface IProps {
  save: (value: string) => void,
  value: string,
  type: string,
}

interface IState {
  value: string,
}

class InputAdd extends React.Component<IProps, IState> {
  handleUpdate: (event: React.FormEvent<HTMLInputElement>) => void;

  constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.props.value,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleSave(event: React.FormEvent<HTMLInputElement | HTMLFormElement>) {
    event.preventDefault();
    this.props.save(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSave}>
        <input
          type={this.props.type}
          onChange={this.handleUpdate}
          value={this.state.value}
        />
      </form>
    );
  }
}

export default InputAdd;
