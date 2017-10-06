import React from 'react';
import { modalWrapper } from './Modal';
import MediaGridContainer from './MediaGridContainer';

interface IProps {
  onSelect: (mediaId: number) => void,
  close: () => void,
}

class MediaSelectModal extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    return <MediaGridContainer onSelect={this.props.onSelect} />;
  }
}

export default modalWrapper()(MediaSelectModal) as any;
