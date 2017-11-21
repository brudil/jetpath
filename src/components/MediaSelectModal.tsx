import React from 'react';
import Modal from './Modal';
import MediaGridContainer from './MediaGridContainer';

interface IProps extends ReactModal.Props {
  onSelect: (mediaId: number) => void;
  isOpen: boolean;
  contentLabel: string;
}

class MediaSelectModal extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <Modal {...this.props}>
        <h1>Select image or drop to upload</h1>
        <MediaGridContainer onSelect={this.props.onSelect} />
      </Modal>
    );
  }
}

export default MediaSelectModal;
