import React from 'react';
import { connect } from 'react-redux';
import * as ModalManagerActions from '../../../../ducks/Modal';
import { update } from '../../../../libs/spectrum2/changes';
import MediaDisplay from '../../../MediaDisplay';
import MediaEditModal from '../../../MediaEditModal';
import MediaSelectModal from '../../../MediaSelectModal';
import Panel from './Panel';
import Button from '../../../Button';
import ImageIcon from '../../../icons/image.svg.react';

import styles from './ImageBlock.css';
import {
  ChangesetApplier,
  ElementPath,
} from '../../../../libs/spectrum2/interfaces';

interface IProps {
  path: ElementPath;
  data: any;
  update: ChangesetApplier;
  mediaEntities: any;
  dispatch: any;
}

class ImageBlock extends React.Component<IProps> {
  private _selectModal: any;
  public static panel: any;
  public static Icon: any;

  constructor(props: IProps) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleOpenLibrary = this.handleOpenLibrary.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    this.props.update(
      update([...this.props.path, 'text', 'data'], e.currentTarget.value)
    );
  }

  handleOpenLibrary() {
    this.props.dispatch(ModalManagerActions.open(this._selectModal));
  }

  handleSelection(imageId: number) {
    this.props.dispatch(ModalManagerActions.close(this._selectModal));
    this.props.update(update([...this.props.path, 'resource', 'id'], imageId));
  }

  render() {
    const { mediaEntities, data } = this.props;
    const id = data.getIn(['resource', 'id']);
    const item = {}.hasOwnProperty.call(mediaEntities, id)
      ? mediaEntities[id]
      : null;

    return (
      <div className={styles.root}>
        <Button onClick={this.handleOpenLibrary} text={'Select from Library'} />
        {item !== null ? (
          <MediaDisplay className={styles.mediaDisplay} media={item} />
        ) : (
          <em>No image selected</em>
        )}

        <MediaSelectModal
          ref={(el: any) => {
            this._selectModal = el;
          }}
          onSelect={this.handleSelection}
        />
        <MediaEditModal />
      </div>
    );
  }
}

ImageBlock.panel = Panel;
ImageBlock.Icon = ImageIcon;

export default connect(state => ({
  mediaEntities: state.entities.media,
}))(ImageBlock);
