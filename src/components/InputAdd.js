import PropTypes from 'prop-types';
import React from 'react';

class InputAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleSave(e) {
    e.preventDefault();
    this.props.save(this.state.value);
    this.setState({ value: '' });
  }

  update(e) {
    this.setState({ value: e.target.value });
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

InputAdd.propTypes = {
  save: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default InputAdd;
