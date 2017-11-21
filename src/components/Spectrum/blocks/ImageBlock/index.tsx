import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../../../libs/spectrum2/changes';
import MediaInput from '../../../MediaInput';
import Panel from './Panel';
import ImageIcon from '../../../icons/image.svg.react';
import {
  ChangesetApplier,
  ElementPath,
} from '../../../../libs/spectrum2/interfaces';
import { RootState } from '../../../../types';

interface IProps {
  path: ElementPath;
  data: any;
  update: ChangesetApplier;
  mediaEntities: any;
  dispatch: any;
}

interface IState {
  selectModalOpen: boolean;
}

class ImageBlock extends React.Component<IProps, IState> {
  public static panel: any;
  public static Icon: any;

  constructor(props: IProps) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      selectModalOpen: false,
    };
  }

  handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    this.props.update(
      update([...this.props.path, 'text', 'data'], e.currentTarget.value)
    );
  }

  handleChange(imageId: number) {
    this.props.update(update([...this.props.path, 'resource', 'id'], imageId));
  }

  render() {
    const { data } = this.props;
    const id = data.getIn(['resource', 'id']);

    return (
      <div>
        <MediaInput value={id} onChange={this.handleChange} />
      </div>
    );
  }
}

ImageBlock.panel = Panel;
ImageBlock.Icon = ImageIcon;

export default connect((state: RootState) => ({
  mediaEntities: state.entities.media,
}))(ImageBlock);
