import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import MediaDisplay from '../MediaDisplay';
import MediaSelectModal from '../MediaSelectModal';
import Button from '../Button';
import { compose } from 'recompose';

import style from './MediaInput.css';
import MediaEditModal from "../MediaEditModal/index";

interface IProps {
  filter: object;
  mediaEntities: object[];
  onChange: (imageId: number) => void;
  value: number;
}

interface IState {
  selectModalOpen: boolean,
  editModalOpen: boolean,
}

class MediaInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.handleOpenLibrary = this.handleOpenLibrary.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSelectClose = this.handleSelectClose.bind(this);
    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);

    this.state = {
      selectModalOpen: false,
      editModalOpen: false,
    };
  }

  handleOpenLibrary() {
    this.setState({ selectModalOpen: true });
  }

  handleSelection(imageId: number) {
    this.setState({ selectModalOpen: false });
    this.props.onChange(imageId);
  }

  handleEditOpen() {
    this.setState({ editModalOpen: true });
  }

  handleEditClose() {
    this.setState({ editModalOpen: false });
  }

  handleSelectClose() {
    this.setState({ selectModalOpen: false });
  }

  render() {
    const { selectModalOpen, editModalOpen } = this.state;
    const { value, mediaEntities } = this.props;
    const mediaObject = mediaEntities[value];
    const hasMedia = mediaObject !== undefined;
    return (
      <div className={cx(style.root, {[style.rootHasMedia]: hasMedia })}>
        <div className={style.display}>
          {hasMedia ? (
            <button className={style.editMediaButton} onClick={this.handleEditOpen}>Edit media</button>
          ) : null}
          {hasMedia ? (
            <MediaDisplay media={mediaObject} />
          ) : null}
        </div>

        <div className={style.buttonSet}>
          <Button onClick={this.handleOpenLibrary} text={'Select media from library'} />
        </div>

        <MediaSelectModal
          onSelect={this.handleSelection}
          isOpen={selectModalOpen}
          contentLabel="Media select"
          onRequestClose={this.handleSelectClose}
        />

        <MediaEditModal
          value={this.props.value}
          isOpen={editModalOpen}
          contentLabel="Media edit"
          onRequestClose={this.handleEditClose}
        />
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      mediaEntities: state.entities.media,
    })
  )
)(MediaInput) as any;
