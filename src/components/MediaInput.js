import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as ModalManagerActions from '../actions/ModalManagerActions';
import MediaDisplay from './MediaDisplay';
import MediaEditModal from './MediaEditModal';
import MediaSelectModal from './MediaSelectModal';
import Button from './Button';

class MediaInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpenLibrary = this.handleOpenLibrary.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleOpenLibrary() {
    this.props.dispatch(ModalManagerActions.open(this._selectModal));
  }

  handleSelection(imageId) {
    this.props.dispatch(ModalManagerActions.close(this._selectModal));
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
          ref={el => {
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

MediaInput.propTypes = {
  filter: PropTypes.object,
  mediaEntities: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  mediaEntities: state.entities.media,
}))(MediaInput);
