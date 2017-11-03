import React from 'react';
import { connect } from 'react-redux';
import * as ModalManagerActions from '../../ducks/Modal';
import MediaDisplay from '../MediaDisplay';
import MediaEditModal from '../MediaEditModal';
import MediaSelectModal from '../MediaSelectModal';
import Button from '../Button';
import {compose} from "recompose";

interface IProps {
  filter: object,
  mediaEntities: object[],
  onChange: (imageId: number) => void,
  open: (imageId: number) => void,
  close: (imageId: number) => void,
  value: number,
}

class MediaInput extends React.Component<IProps> {
  private _selectModal: any;

  constructor(props: IProps) {
    super(props);

    this.handleOpenLibrary = this.handleOpenLibrary.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleOpenLibrary() {
    this.props.open(this._selectModal);
  }

  handleSelection(imageId: number) {
    this.props.close(this._selectModal);
    this.props.onChange(imageId);
  }

  render() {
    const { value, mediaEntities, filter } = this.props;
    const mediaObject = mediaEntities[value];

    return (
      <div>
        <Button onClick={this.handleOpenLibrary} text={'Select from Library'} />
        {mediaObject !== undefined
          ? <MediaDisplay media={mediaObject} />
          : null}
        <MediaSelectModal
          ref={(el: any) => {
            this._selectModal = el;
          }}
          filter={filter}
          onSelect={this.handleSelection}
        />
        <MediaEditModal />
      </div>
    );
  }
}

export default compose(
  connect(state => ({
  mediaEntities: state.entities.media,
}), {
  close: ModalManagerActions.close,
  open: ModalManagerActions.open,
}))(MediaInput);
