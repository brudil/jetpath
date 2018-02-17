import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import MediaDisplay from '../MediaDisplay';
import MediaSelectModal from '../MediaSelectModal';
import Button from '../Button';
import MediaEditModal from '../MediaEditModal/index';
import styled from 'react-emotion';
import { css } from 'emotion';
import {MediaObject, RootState} from '../../types';

const EditMediaButton = styled.button`
  border: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-size: 1rem;
  padding: 0.2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ButtonSet = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const displayContainerStyles = css`
  min-height: 100px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGElEQVQYV2N4DwX/oYBhgARgDJjEAAkAAEC99wFuu0VFAAAAAElFTkSuQmCC')
    repeat scroll 0% 0% #ffffff;
`;

const containerStyles = css`
  position: relative;
`;

const containerHasMedia = css`
  & .${ButtonSet.name}, & .${EditMediaButton.name} {
    opacity: 0;
    transition: opacity 300ms ease;
  }

  &:hover .${ButtonSet.name}, &:hover .${EditMediaButton.name} {
    opacity: 1;
  }
`;

interface IProps {
  filter?: object;
  mediaEntities: MediaObject[];
  onChange: (imageId: number) => void;
  value: number;
}

interface IState {
  selectModalOpen: boolean;
  editModalOpen: boolean;
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
      <div className={cx(containerStyles, { [containerHasMedia]: hasMedia })}>
        <div className={displayContainerStyles}>
          {hasMedia ? (
            <EditMediaButton onClick={this.handleEditOpen}>
              Edit media
            </EditMediaButton>
          ) : null}
          {hasMedia ? <MediaDisplay media={mediaObject} /> : null}
        </div>

        <ButtonSet>
          <Button
            onClick={this.handleOpenLibrary}
            text={'Select media from library'}
          />
        </ButtonSet>

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

export default connect((state: RootState) => ({
  mediaEntities: state.entities.media,
}))(MediaInput);
