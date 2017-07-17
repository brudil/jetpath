import React from 'react';
import uuid from 'node-uuid';
import Modal from './InnerModal';

export default () => InnerModalComponent => {
  class ModalComponent extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        uuid: uuid.v4(),
      };
    }

    render() {
      return (
        <Modal
          uuid={this.state.uuid}
          innerModal={InnerModalComponent}
          innerProps={this.props}
        />
      );
    }
  }

  ModalComponent.InnerModalComponent = InnerModalComponent;
  ModalComponent.displayName = `Modal(${InnerModalComponent})`;

  return ModalComponent;
};
