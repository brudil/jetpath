import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as ModalManagerActions from '../../../../ducks/Modal';
import * as SpectrumPropTypes from '../../SpectrumPropTypes';
import MediaDisplay from '../../../MediaDisplay';
import MediaEditModal from '../../../MediaEditModal';
import MediaSelectModal from '../../../MediaSelectModal';
import Panel from './Panel';
import Button from '../../../Button';
import ImageIcon from '../../../icons/image.svg.react';

import styles from './ImageBlock.css';

class ImageBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputBound = this.handleInput.bind(this);
    this.handleOpenLibraryBound = this.handleOpenLibrary.bind(this);
    this.handleSelectionBound = this.handleSelection.bind(this);
  }

  handleInput(e) {
    this.props.update({
      command: 'update',
      path: [...this.props.path, 'text', 'data'],
      value: e.target.value,
    });
  }

  handleOpenLibrary() {
    this.props.dispatch(ModalManagerActions.open(this._selectModal));
  }

  handleSelection(imageId) {
    this.props.dispatch(ModalManagerActions.close(this._selectModal));
    this.props.update({
      command: 'update',
      path: [...this.props.path, 'resource', 'id'],
      value: imageId,
    });
  }

  render() {
    const { mediaEntities, data } = this.props;
    const id = data.getIn(['resource', 'id']);
    const item = {}.hasOwnProperty.call(mediaEntities, id)
      ? mediaEntities[id]
      : null;

    return (
      <div className={styles.root}>
        <Button
          onClick={this.handleOpenLibraryBound}
          text={'Select from Library'}
        />
        {item !== null
          ? <MediaDisplay className={styles.mediaDisplay} media={item} />
          : null}

        <MediaSelectModal
          ref={el => {
            this._selectModal = el;
          }}
          filter={{ type: 'video' }}
          onSelect={this.handleSelectionBound}
        />
        <MediaEditModal />
      </div>
    );
  }
}

ImageBlock.panel = Panel;
ImageBlock.Icon = ImageIcon;

ImageBlock.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  mediaEntities: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default connect(state => ({
  mediaEntities: state.entities.media,
}))(ImageBlock);
